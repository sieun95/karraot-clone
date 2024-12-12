"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddImage from "@/components/common/AddImage";
import PriceInput from "@/components/common/PriceInput";
import { addProduct } from "@/lib/actions/addProduct";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState("");

  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      const name = formData.get("name") as string;
      const priceString = (formData.get("price") as string).replace(/,/g, "");
      const price = parseInt(priceString, 10);
      const url = formData.get("imageUrl") as string;

      const result = await addProduct({ name, price, url });

      if (result.success) {
        redirect("/products");
      }

      return result;
    },
    {
      success: false,
      error: undefined,
    }
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form action={formAction} className="space-y-6">
        <div className="max-w-md mx-auto">
          <AddImage onImageUpload={setImageUrl} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <Label htmlFor="name" className="text-gray-200">
            상품명
          </Label>
          <Input id="name" name="name" required className="bg-gray-700 border-gray-600 text-gray-200" placeholder="상품명을 입력하세요" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <Label htmlFor="price" className="text-gray-200">
            가격
          </Label>
          <PriceInput />
        </div>

        <div className="max-w-md mx-auto">
          <Button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white">
            상품 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
