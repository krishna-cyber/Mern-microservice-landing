import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";

import QuantityChanger from "./QuantityChanger";
import { changeQty, CartItem as Item } from "@/lib/store/feature/cartSlice";
import { Topping } from "@/lib/types";
import { useAppDispatch } from "@/lib/store/hooks";
import { X } from "lucide-react";
import { useCalculateTotal } from "@/lib/hooks/useCalculateTotal";

const ToppingsBadges = ({
  selectedConfiguration,
  selectedToppings,
}: {
  selectedConfiguration: {
    [key: string]: string;
  };
  selectedToppings: Topping[] | undefined;
}) => {
  return (
    <>
      {Object.values(selectedConfiguration).map((value) => {
        return (
          <Badge
            className=" font-extralight text-black"
            variant={"secondary"}
            key={value}
          >
            {value}
          </Badge>
        );
      })}
      {selectedToppings?.map((topping: Topping) => (
        <Badge
          variant={"secondary"}
          className=" font-extralight text-black"
          key={topping._id}
        >
          {topping.name}
        </Badge>
      ))}
    </>
  );
};

const CartItem = ({ item }: { item: Item }) => {
  const dispatch = useAppDispatch();
  const total = useCalculateTotal(item);
  const handleQuantityChanger = (data: number) => {
    dispatch(changeQty({ hash: item.itemHash as string, qty: data }));
  };
  return (
    <>
      <div className=" flex justify-between items-center py-2 ">
        <div className="flex items-center gap-2">
          <Image
            alt={item.product.name}
            width={100}
            height={100}
            src={item.product.image[0]}
          />
          <div className=" flex flex-col">
            <h3 className="font-semibold">{item.product.name}</h3>
            <span className=" flex gap-2 flex-wrap mt-2 w-[80%]">
              <ToppingsBadges
                selectedConfiguration={item.chosenConfiguration}
                selectedToppings={item.selectedToppings}
              />
            </span>
          </div>
        </div>
        <div>
          <QuantityChanger handleQuantityChanger={handleQuantityChanger}>
            {item.qty}
          </QuantityChanger>
        </div>
        <div className=" flex items-center gap-2">
          <span>{total * item.qty!}</span>
          <button
            onClick={() => {
              dispatch(changeQty({ hash: item.itemHash as string, qty: 0 }));
            }}
          >
            <X />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
