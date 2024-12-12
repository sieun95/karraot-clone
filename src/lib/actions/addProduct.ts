"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

interface CreateProductData {
  url: string;
  name: string;
  price: number;
}

interface AddProductResult {
  success: boolean;
  product?: any;
  error?: string;
}

export async function addProduct(data: CreateProductData): Promise<AddProductResult> {
  try {
    const product = await prisma.product.create({
      data: {
        url: data.url,
        name: data.name,
        price: data.price,
      },
    });
    console.log("product", product);
    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "상품 등록에 실패했습니다." };
  }
}
