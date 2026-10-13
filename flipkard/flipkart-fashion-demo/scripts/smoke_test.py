#!/usr/bin/env python3
"""Dependency-free smoke checks for the running storefront. Set BASE_URL if needed."""
from __future__ import annotations

import json
import os
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:3000").rstrip("/")
TIMEOUT = 15
CATEGORIES = {
    "Men's T-Shirts": 40,
    "Women's T-Shirts": 35,
    "Men's Casual & Formal Shirts": 35,
    "Women's Dresses & Ethnic Wear": 35,
    "Men's Footwear (Sneakers, Sports, Casual Shoes)": 30,
    "Women's Footwear (Heels, Flats, Running Shoes)": 25,
}


def get(path: str) -> tuple[bytes, str, float]:
    start = time.perf_counter()
    request = Request(BASE_URL + path)
    with urlopen(request, timeout=TIMEOUT) as response:
        body = response.read()
        elapsed_ms = (time.perf_counter() - start) * 1000
        return body, response.headers.get_content_type(), elapsed_ms


def main() -> None:
    page, content_type, page_ms = get("/")
    html = page.decode("utf-8", errors="replace")
    assert content_type == "text/html", f"Unexpected home content type: {content_type}"
    assert "Flipkart Fashion Demo" in html, "Home page title/brand was not rendered"
    assert "r8atcdh7?key=1e44eda275c7601d524bc645e68550e8" in html, "Sponsored link is missing"
    assert "container-695a24d7e5dad48745d2a6ec9c026508" in html, "In-page ad container is missing"
    assert html.count("Advertisement") >= 7, "Expected responsive ad placements are missing"

    page_one, content_type, api_ms = get("/api/products?" + urlencode({"page": 1, "limit": 48, "sort": "featured"}))
    assert content_type == "application/json"
    result_one = json.loads(page_one)
    assert result_one["total"] == 200, f"Expected 200 listings, got {result_one['total']}"
    assert len(result_one["items"]) == 48
    assert len({item["category"] for item in result_one["items"]}) == 6, "Featured page should mix all six categories"

    page_two, _, _ = get("/api/products?" + urlencode({"page": 2, "limit": 48, "sort": "featured"}))
    result_two = json.loads(page_two)
    ids_one = {item["id"] for item in result_one["items"]}
    ids_two = {item["id"] for item in result_two["items"]}
    assert ids_one.isdisjoint(ids_two), "Pagination returned duplicate products"

    for category, expected_count in CATEGORIES.items():
        payload, _, _ = get("/api/products?" + urlencode({"category": category, "limit": 1}))
        result = json.loads(payload)
        assert result["total"] == expected_count, f"Unexpected count for {category}: {result['total']}"

    capped, _, _ = get("/api/products?limit=500")
    assert len(json.loads(capped)["items"]) == 48, "API page-size cap should be 48"
    search_payload, _, _ = get("/api/products?" + urlencode({"q": "black", "limit": 5}))
    search_result = json.loads(search_payload)
    assert search_result["total"] > 0
    assert all("black" in f"{item['title']} {item['brand']} {item['color']}".lower() for item in search_result["items"])
    brand = result_one["items"][0]["brand"]
    brand_payload, _, _ = get("/api/products?" + urlencode({"brand": brand, "limit": 5}))
    assert all(item["brand"] == brand for item in json.loads(brand_payload)["items"])
    discount_payload, _, _ = get("/api/products?" + urlencode({"minDiscount": 60, "limit": 5}))
    assert all(item["discount_percentage"] >= 60 for item in json.loads(discount_payload)["items"])

    filtered, _, filtered_ms = get("/api/products?" + urlencode({
        "gender": "female", "minPrice": 1000, "maxPrice": 3500,
        "minRating": 4, "sort": "price-asc", "limit": 24,
    }))
    filtered_result = json.loads(filtered)
    assert all(item["gender"] == "female" for item in filtered_result["items"])
    assert all(1000 <= item["discounted_price"] <= 3500 for item in filtered_result["items"])
    assert all(item["rating"] >= 4 for item in filtered_result["items"])
    prices = [item["discounted_price"] for item in filtered_result["items"]]
    assert prices == sorted(prices), "Price ascending sort is incorrect"

    image, image_type, image_ms = get("/products/mens-tee.webp")
    assert image_type == "image/webp" and len(image) > 5000
    optimized, optimized_type, optimized_ms = get("/_next/image?url=%2Fproducts%2Fmens-tee.webp&w=640&q=75")
    assert optimized_type.startswith("image/") and len(optimized) > 1000

    print("Smoke checks passed: home page, 200-item API, six category totals, filters, sorting, pagination, local image, optimized image, and ad markup.")
    print(f"Warm local response times: home {page_ms:.1f} ms; catalogue {api_ms:.1f} ms; filtered catalogue {filtered_ms:.1f} ms; WebP {image_ms:.1f} ms; optimized image {optimized_ms:.1f} ms.")
    print("These local timings are not a substitute for browser Core Web Vitals or a production load test.")


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, HTTPError, URLError, TimeoutError) as error:
        raise SystemExit(f"Smoke check failed: {error}") from error
