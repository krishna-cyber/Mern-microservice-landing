import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import React, { memo, useMemo } from "react";

const CartLink = () => {
  // Only subscribe to cart state
  const cartItems = useAppSelector((state) => state.cart?.cartItems);

  // Compute query string only once on mount
  const queryString = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.search ? window.location.search : "";
    }
    return "";
  }, []);

  return (
    <Link
      href={`/cart${queryString}`}
      className="relative cursor-pointer hover:text-primary"
    >
      <ShoppingCart />
      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
        {cartItems?.length}
      </div>
    </Link>
  );
};

export default memo(CartLink);
