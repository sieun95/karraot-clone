import Image from "next/image";
import { formatPrice } from "@/utils";
import { getProducts } from "@/lib/actions/getProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingCart, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-200">상품 목록</h1>
        <Link href="/products/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            상품 등록
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors">
            <CardContent className="p-0 flex">
              <div className="relative h-64 w-64 flex-shrink-0">
                <Image src={product.url} alt={product.name} fill className="object-cover rounded-l-lg" sizes="(max-width: 768px) 100vw, 256px" />
                <Badge className="absolute top-4 right-4 bg-orange-500">NEW</Badge>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-3 line-clamp-1">{product.name}</h3>
                  <div className="flex flex-col gap-2 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>판매자:</span>
                      <span className="text-orange-400">{product.seller.username}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-2xl font-bold text-orange-400">{formatPrice(product.price)}원</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-gray-200">
                      <Eye className="h-4 w-4 mr-1" />
                      상세보기
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      구매하기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
