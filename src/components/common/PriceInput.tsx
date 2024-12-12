'use client';

import { Input } from "@/components/ui/input";

export default function PriceInput() {
  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    e.target.value = formatted;
  };

  return (
    <div className="relative">
      <Input
        id="price"
        name="price"
        type="text"
        required
        className="bg-gray-700 border-gray-600 text-gray-200 pr-8"
        placeholder="가격을 입력하세요"
        onChange={handlePriceChange}
        inputMode="numeric"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">원</span>
    </div>
  );
}