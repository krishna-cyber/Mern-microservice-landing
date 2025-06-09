import { Button } from "@/components/ui/button";
import React from "react";

const CartSummary = () => {
  return (
    <div className=" flex justify-between">
      <span>2500</span>
      <Button>Checkout</Button>
    </div>
  );
};

export default CartSummary;
