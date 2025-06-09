import React from "react";
import CartItems from "./components/CartItems";

const Cart = () => {
  return (
    <section className="container mx-auto">
      <h2 className=" font-semibold text-xl">Shopping Cart</h2>
      <div className=" bg-white py-2 max-w-screen-lg mx-auto rounded-md">
        <CartItems />
      </div>
    </section>
  );
};

export default Cart;
