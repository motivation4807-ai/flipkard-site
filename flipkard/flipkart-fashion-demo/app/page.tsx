import { Storefront } from '@/components/Storefront';
import { allProducts, brands, getCatalogPage } from '@/lib/catalog';

export const revalidate = 60;

export default function HomePage() {
  const initial = getCatalogPage({ page: 1, limit: 24 });
  const dealProducts = allProducts.slice().sort((a, b) => b.discount_percentage - a.discount_percentage).slice(0, 8);
  const trendingProducts = allProducts.filter(product => product.category.includes('T-Shirts') || product.category.includes('Shirts')).slice(0, 8);
  const footwearProducts = allProducts.filter(product => product.category.includes('Footwear')).slice(0, 8);

  return (
    <Storefront
      initialProducts={initial.items}
      initialTotal={initial.total}
      dealProducts={dealProducts}
      trendingProducts={trendingProducts}
      footwearProducts={footwearProducts}
      brands={brands}
    />
  );
}
