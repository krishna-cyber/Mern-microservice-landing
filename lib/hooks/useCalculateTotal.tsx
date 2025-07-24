import { useMemo } from "react";
import { CartItem } from "../store/feature/cartSlice";
import { calculateTotal } from "../utils";

export function useCalculateTotal(product: CartItem) {
  const totalPrice = useMemo(() => {
    return calculateTotal(product);
  }, [product]);

  return totalPrice;
}
