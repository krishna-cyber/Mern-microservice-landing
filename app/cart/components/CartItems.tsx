"use client";
import React, { useMemo } from "react";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { calculateTotal } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const CartItems = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const appendQuery = queryString ? `?${queryString}` : "";
  const cartTotal = useMemo(() => {
    return cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.qty! * calculateTotal(cartItem);
    }, 0);
  }, [cartItems]);

  if (cartItems.length == 0) {
    return (
      <div className=" flex flex-col justify-center items-center gap-3">
        <h2 className=" flex gap-3 font-semibold text-lg">
          <ShoppingCart />
          Your Cart is Empty
        </h2>
        <Link href={`/${appendQuery}`}>
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.itemHash} item={cartItem} />;
      })}
      <div className=" flex justify-between space-y-6">
        <span className=" self-center">NRS. {cartTotal}</span>
        <Link href={`/ordersSummary${appendQuery}`}>
          <Button size={"sm"}>Checkout</Button>
        </Link>
      </div>
    </>
  );
};

export default CartItems;
