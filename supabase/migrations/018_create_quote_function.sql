-- SECURITY DEFINER function so anon users can insert quotes without RLS restrictions.
-- Runs with the permissions of the function owner (postgres), bypassing RLS entirely.

create or replace function public.create_quote(
  p_customer_name  text,
  p_email          text,
  p_phone          text    default null,
  p_business_name  text    default null,
  p_product_interest text  default null,
  p_quantity       text    default null,
  p_requirements   text    default null,
  p_delivery_location text default null,
  p_source         text    default 'website'
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
begin
  insert into quotes (
    customer_name, email, phone, business_name,
    product_interest, quantity, requirements,
    delivery_location, source
  ) values (
    p_customer_name, p_email, p_phone, p_business_name,
    p_product_interest, p_quantity, p_requirements,
    p_delivery_location, p_source
  )
  returning reference into v_reference;

  return v_reference;
end;
$$;

-- Allow anon and authenticated users to call the function
grant execute on function public.create_quote to anon, authenticated;
