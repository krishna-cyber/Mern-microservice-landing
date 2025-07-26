import { ProductType, Topping } from "@/lib/types";
import { hashProductCartItem } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: ProductType;
  chosenConfiguration: {
    [key: string]: string;
  };
  selectedToppings?: Topping[];
  qty?: number;
  itemHash?: string;
}
export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hashedCartItem = hashProductCartItem(action.payload);
      const newItem: CartItem = {
        product: action.payload.product,
        chosenConfiguration: action.payload.chosenConfiguration,
        qty: action.payload.qty,
        ...(action.payload.selectedToppings && {
          selectedToppings: action.payload.selectedToppings,
        }),
        itemHash: hashedCartItem,
      };
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );
      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },

    changeQty: (
      state,
      action: PayloadAction<{ hash: string; qty: number }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.itemHash == action.payload.hash
      );

      if (action.payload.qty == 0) {
        state.cartItems.splice(index, 1);
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.cartItems])
        );
        return;
      }

      //change quantity +1 or -1
      state.cartItems[index].qty =
        state.cartItems[index].qty! + action.payload.qty;

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems])
      );
    },
  },
});

export const { addToCart, setInitialCartItems, changeQty } = cartSlice.actions;

export default cartSlice.reducer;
