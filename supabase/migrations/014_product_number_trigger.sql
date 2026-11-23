-- Ensure product_number is always set on insert even if the client sends NULL.
-- bigserial's DEFAULT only fires when the column is omitted; an explicit NULL
-- bypasses the default and hits the NOT NULL constraint. This trigger intercepts
-- that and calls nextval() so the sequence is always used as the fallback.

CREATE OR REPLACE FUNCTION public.set_product_number()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.product_number IS NULL THEN
    NEW.product_number := nextval('products_product_number_seq');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_product_number ON public.products;
CREATE TRIGGER trg_set_product_number
  BEFORE INSERT ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_product_number();
