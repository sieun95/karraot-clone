import Image from "next/image";
import { formatPrice } from "@/utils";
import { getProducts } from "@/lib/actions/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">상품 목록</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-48 w-full">
              <Image src={product.url} alt={product.name} fill className="object-cover" />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">{product.name}</h3>
              <p className="text-orange-400 font-bold">{formatPrice(product.price)}원</p>
              <p className="text-gray-400 text-sm mt-2">등록일: {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
