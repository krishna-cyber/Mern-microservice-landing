"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const CartLink = () => {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const appendQuery = queryString ? `${queryString}` : "";
  const cartItems = useAppSelector((state) => state.cart?.cartItems);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering cart count until client-side
  if (!isClient) {
    return (
      <Link
        href={`/cart?${appendQuery}`}
        className=" relative cursor-pointer hover:text-primary"
      >
        <ShoppingCart />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          0
        </div>
      </Link>
    );
  }

  // After hydration, show actual cart count
  return (
    <Link
      href={`/cart?${appendQuery}`}
      className=" relative cursor-pointer hover:text-primary"
    >
      <ShoppingCart />
      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
        {cartItems?.length || 0}
      </div>
    </Link>
  );
};

export default memo(CartLink);
