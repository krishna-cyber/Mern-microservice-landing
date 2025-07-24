import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import React, { memo } from "react";
import { useSearchParams } from "next/navigation";

const CartLink = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const appendQuery = queryString ? `${queryString}` : "";
  const cartItems = useAppSelector((state) => state.cart?.cartItems);
  return (
    <Link
      href={`/cart?${appendQuery}`}
      className=" relative cursor-pointer hover:text-primary"
    >
      <ShoppingCart />
      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
        {cartItems?.length}
      </div>
    </Link>
  );
};

export default memo(CartLink, () => true);
