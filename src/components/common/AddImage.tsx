"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddImageProps {
  onImageUpload: (url: string) => void;
}

export default function AddImage({ onImageUpload }: AddImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 이미지 업로드
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const data = await response.json();
        onImageUpload(data.url);
      } catch (error) {
        console.error("이미지 업로드 중 오류:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image" className="text-gray-200">
        상품 이미지
      </Label>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-48 relative border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
          {imagePreview ? (
            <Image src={imagePreview} alt="Product preview" fill className="object-cover" />
          ) : (
            <label htmlFor="image" className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-orange-400 transition-colors">
              <ImagePlus className="w-8 h-8 mb-2" />
              <span>이미지를 선택하세요</span>
            </label>
          )}
        </div>
        <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>
    </div>
  );
}
