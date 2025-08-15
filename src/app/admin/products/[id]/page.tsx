import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
	return (
		<div className="space-y-4">
			<div className="text-2xl font-bold">Edit Product</div>
			<ProductForm mode="edit" initialData={{ id: params.id }} />
		</div>
	);
}