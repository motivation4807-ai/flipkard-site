#!/usr/bin/env python3
"""Generate the deterministic 200-item fashion demo catalogue."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "products.json"

DEFINITIONS = [
    {
        "category": "Men's T-Shirts", "gender": "male", "prefix": "mt",
        "styles": [
            "Essential Cotton Crew-Neck T-Shirt", "Heavyweight Oversized T-Shirt", "Active Dry-Fit Training Tee",
            "Graphic Print Regular-Fit T-Shirt", "Polo-Collar Cotton T-Shirt", "Textured Henley T-Shirt",
            "Relaxed-Fit Pocket T-Shirt", "Striped Slim-Fit T-Shirt"
        ],
        "colors": ["Jet Black", "Optic White", "Classic Navy", "Olive Green", "Deep Maroon"],
        "brands": ["Roadster", "UrbanRidge", "Cotton Harbor", "Campus Sutra", "Threadline", "Northbay"],
        "images": ["mens-tee.webp", "black-tee.webp"],
        "price_range": (499, 1499), "mrp_range": (1499, 2999),
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "description": "An easy everyday men's tee in a comfortable fabric and an easy-to-style fit. Mock listing for the demo catalogue."
    },
    {
        "category": "Women's T-Shirts", "gender": "female", "prefix": "wt",
        "styles": [
            "Ribbed Cotton Crop T-Shirt", "Relaxed Graphic Print Tee", "Classic Crew-Neck T-Shirt",
            "Oversized Boyfriend-Fit Tee", "Fitted Everyday Cotton Tee", "Drop-Shoulder Printed T-Shirt",
            "Soft V-Neck Everyday T-Shirt"
        ],
        "colors": ["Rose Pink", "Ivory White", "Sage Green", "Lavender", "Charcoal Grey"],
        "brands": ["Sassafras", "Tokyo Talkies", "Style Quotient", "Cotton Theory", "Miss Muse", "Thread Ritual"],
        "images": ["fashion-wear-1.webp", "fashion-wear-2.webp"],
        "price_range": (449, 1399), "mrp_range": (1299, 2799),
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "description": "A versatile women's tee with a soft feel and an easy fit for everyday outfits. Mock listing for the demo catalogue."
    },
    {
        "category": "Men's Casual & Formal Shirts", "gender": "male", "prefix": "ms",
        "styles": [
            "Oxford Cotton Casual Shirt", "Linen-Blend Resort Shirt", "Checked Slim-Fit Casual Shirt",
            "Easy-Iron Formal Shirt", "Textured Smart-Casual Shirt", "Denim Button-Down Shirt",
            "Classic Spread-Collar Formal Shirt"
        ],
        "colors": ["Sky Blue", "Crisp White", "Midnight Navy", "Sage Green", "Blue Check"],
        "brands": ["Arrow", "Allen Solly", "Van Heusen", "House of Classics", "Vero North", "UrbanRidge"],
        "images": ["casual-shirt.webp"],
        "price_range": (799, 2799), "mrp_range": (1999, 4999),
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "description": "A polished men's shirt with thoughtful details for office days, dinners and everything in between. Mock listing for the demo catalogue."
    },
    {
        "category": "Women's Dresses & Ethnic Wear", "gender": "female", "prefix": "wd",
        "styles": [
            "Floral A-Line Midi Dress", "Cotton Straight-Kurta Set", "Printed Anarkali Kurta",
            "Everyday Wrap Midi Dress", "Embroidered Festive Kurta Set", "Tiered Cotton Maxi Dress",
            "Kurta with Palazzo Set"
        ],
        "colors": ["Indigo Bloom", "Sage Green", "Rose Pink", "Ivory Gold", "Teal Blue"],
        "brands": ["Anouk", "Biba", "Aurelia", "Sangria", "House of Ethnic", "Indya"],
        "images": ["fashion-wear-2.webp", "fashion-wear-3.webp", "fashion-wear-1.webp"],
        "price_range": (999, 3999), "mrp_range": (2499, 7999),
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "description": "A feel-good women's dress or ethnic set with a flattering silhouette and details made for repeat wear. Mock listing for the demo catalogue."
    },
    {
        "category": "Men's Footwear (Sneakers, Sports, Casual Shoes)", "gender": "male", "prefix": "mf",
        "styles": [
            "Street Runner Knit Sneakers", "FlexRun Sports Shoes", "Classic Court Casual Sneakers",
            "Everyday Canvas Low-Top Shoes", "Trail Trek Lightweight Shoes", "DailyWalk Comfort Slip-Ons"
        ],
        "colors": ["Black / White", "Cloud White", "Navy / Red", "Slate Grey", "Olive / Sand"],
        "brands": ["Campus", "Red Tape", "Puma", "Skechers", "North Star", "Roadster", "Asian"],
        "images": ["shoe-detail.webp", "sneaker-blue.webp", "sneaker-white.webp", "leather-shoe.webp"],
        "price_range": (1299, 5999), "mrp_range": (2999, 10999),
        "sizes": ["6", "7", "8", "9", "10", "11"],
        "description": "Comfort-first men's footwear designed for daily miles, casual plans and a reliable all-day fit. Mock listing for the demo catalogue."
    },
    {
        "category": "Women's Footwear (Heels, Flats, Running Shoes)", "gender": "female", "prefix": "wf",
        "styles": [
            "Block-Heel Dress Sandals", "Everyday Ballet Flats", "FlexRun Women's Running Shoes",
            "Embellished Ethnic Flats", "Strappy Comfort Sandals"
        ],
        "colors": ["Classic Black", "Nude Beige", "Ivory White", "Blush Pink", "Sage Green"],
        "brands": ["Metro", "Lavie", "Inc.5", "Bata", "Mochi", "Skechers", "Catwalk"],
        "images": ["women-heels.webp", "women-flats.webp", "shoe-detail.webp"],
        "price_range": (899, 4499), "mrp_range": (1999, 8999),
        "sizes": ["3", "4", "5", "6", "7", "8", "9"],
        "description": "A stylish, comfortable women's shoe for workdays, weekends and occasions worth dressing up for. Mock listing for the demo catalogue."
    }
]


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def generate() -> list[dict]:
    products: list[dict] = []
    for definition in DEFINITIONS:
        category_index = len(products)
        styles = definition["styles"]
        colors = definition["colors"]
        # 8*5, 7*5, 7*5, 7*5, 6*5 and 5*5 => exactly 200 listings.
        for style_index, style in enumerate(styles):
            for color_index, color in enumerate(colors):
                serial = len(products) + 1
                local_index = style_index * len(colors) + color_index
                title = f"{style} · {color}"
                seed = serial * 37 + local_index * 19
                original_min, original_max = definition["mrp_range"]
                sale_min, sale_max = definition["price_range"]
                original = original_min + (seed % (original_max - original_min + 1))
                discount = 25 + (seed * 7 % 41)  # 25–65%
                discounted = round((original * (100 - discount) / 100) / 10) * 10
                discounted = max(sale_min, min(sale_max, discounted))
                original = max(original, discounted + 100)
                discount = round((original - discounted) * 100 / original)
                image_pool = definition["images"]
                gallery = [
                    f"/products/{image_pool[(local_index + offset) % len(image_pool)]}"
                    for offset in range(min(3, len(image_pool)))
                ]
                brand = definition["brands"][(style_index * 2 + color_index) % len(definition["brands"])]
                rating = round(3.8 + ((seed * 3) % 12) / 10, 1)
                rating_count = 34 + ((seed * 73) % 14800)
                in_stock = serial % 43 != 0
                products.append({
                    "id": f"{definition['prefix']}-{serial:03d}-{slug(style)[:18]}-{slug(color)[:12]}",
                    "title": title,
                    "category": definition["category"],
                    "gender": definition["gender"],
                    "original_price": int(original),
                    "discounted_price": int(discounted),
                    "discount_percentage": int(discount),
                    "rating": rating,
                    "rating_count": int(rating_count),
                    "images": gallery,
                    "sizes": definition["sizes"],
                    "in_stock": in_stock,
                    "brand": brand,
                    "color": color,
                    "description": definition["description"],
                    "badge": "Limited-time deal" if serial % 9 == 0 else "Top rated" if rating >= 4.6 else "Bestseller"
                })
    return products


if __name__ == "__main__":
    products = generate()
    assert len(products) == 200, f"Expected 200 products, got {len(products)}"
    assert len({product["id"] for product in products}) == 200, "Product IDs must be unique"
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(products)} products to {OUT}")
