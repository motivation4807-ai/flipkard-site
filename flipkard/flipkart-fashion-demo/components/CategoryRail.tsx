'use client';

import { Footprints, Shirt, Sparkles, Tags } from 'lucide-react';

const rails = [
  { value: '', label: 'Top Offers', Icon: Sparkles },
  { value: "Men's T-Shirts", label: "Men's T-Shirts", Icon: Shirt },
  { value: "Women's T-Shirts", label: "Women's T-Shirts", Icon: Shirt },
  { value: "Men's Casual & Formal Shirts", label: 'Men’s Shirts', Icon: Shirt },
  { value: "Women's Dresses & Ethnic Wear", label: 'Dresses & Ethnic', Icon: Tags },
  { value: "Men's Footwear (Sneakers, Sports, Casual Shoes)", label: 'Men’s Footwear', Icon: Footprints },
  { value: "Women's Footwear (Heels, Flats, Running Shoes)", label: 'Women’s Footwear', Icon: Footprints }
];

export function CategoryRail({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  return (
    <nav aria-label="Browse categories" className="category-rail bg-white shadow-sm">
      <div className="category-rail-inner">
        {rails.map(({ value, label, Icon }) => {
          const active = value === selected;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(value === 'Deals' ? '' : value)}
              className={`category-rail-item ${active ? 'active' : ''}`}
            >
              <span className="category-rail-icon"><Icon size={19} strokeWidth={1.8} /></span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
