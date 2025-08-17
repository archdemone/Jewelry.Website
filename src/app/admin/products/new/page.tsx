import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Add Product</div>
      <ProductForm mode="create" />
    </div>
  );
}
