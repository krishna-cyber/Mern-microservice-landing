"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/feature/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let preloadedCartItems = [];
  if (typeof window !== "undefined") {
    const cartItems = window.localStorage.getItem("cartItems");
    try {
      preloadedCartItems = cartItems ? JSON.parse(cartItems) : [];
    } catch {
      preloadedCartItems = [];
    }
  }

  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (preloadedCartItems.length > 0) {
      storeRef.current.dispatch(setInitialCartItems(preloadedCartItems));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
