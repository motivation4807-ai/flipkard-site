CREATE TABLE IF NOT EXISTS products (
  id                  text PRIMARY KEY,
  title               text NOT NULL,
  category            text NOT NULL,
  gender              text NOT NULL CHECK (gender IN ('male', 'female', 'unisex')),
  original_price      integer NOT NULL CHECK (original_price > 0),
  discounted_price    integer NOT NULL CHECK (discounted_price > 0 AND discounted_price <= original_price),
  discount_percentage smallint NOT NULL CHECK (discount_percentage BETWEEN 0 AND 100),
  rating              numeric(2,1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
  rating_count        integer NOT NULL DEFAULT 0 CHECK (rating_count >= 0),
  images              jsonb NOT NULL DEFAULT '[]'::jsonb,
  sizes               jsonb NOT NULL DEFAULT '[]'::jsonb,
  in_stock            boolean NOT NULL DEFAULT true,
  brand               text NOT NULL,
  color               text NOT NULL,
  description         text NOT NULL DEFAULT '',
  badge               text NOT NULL DEFAULT '',
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  search_document     tsvector GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(brand, '') || ' ' || coalesce(category, '') || ' ' || coalesce(color, ''))
  ) STORED
);

CREATE INDEX IF NOT EXISTS products_category_gender_idx ON products (category, gender);
CREATE INDEX IF NOT EXISTS products_brand_idx ON products (brand);
CREATE INDEX IF NOT EXISTS products_price_idx ON products (discounted_price, original_price);
CREATE INDEX IF NOT EXISTS products_rating_idx ON products (rating DESC, rating_count DESC);
CREATE INDEX IF NOT EXISTS products_discount_idx ON products (discount_percentage DESC);
CREATE INDEX IF NOT EXISTS products_stock_idx ON products (in_stock) WHERE in_stock = true;
CREATE INDEX IF NOT EXISTS products_search_gin_idx ON products USING GIN (search_document);
