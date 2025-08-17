# DB Indexing Checklist

- Ensure `Product.slug` is indexed and unique (already unique in Prisma)
- Add indexes on frequently filtered columns:
  - `Product.categoryId`
  - `Product.price`
  - `Order.userId`, `Order.createdAt`
- Add composite indexes for common queries:
  - `(categoryId, price)` for price-range filtering within category
- Regularly run EXPLAIN on slow queries and add indexes accordingly
