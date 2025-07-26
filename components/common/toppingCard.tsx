import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "flowbite-react";
import { CircleCheck } from "lucide-react";
import { Topping } from "@/lib/types";

interface ToppingCardProps {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}

const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: ToppingCardProps) => {
  const isCurrentSelected = selectedToppings.some((element) => {
    return element._id == topping._id;
  });

  return (
    <Button
      color={"alternative"}
      onClick={() => handleCheckBoxCheck(topping)}
      className={cn(
        "flex flex-col h-42 relative",
        isCurrentSelected ? "border-primary" : ""
      )}
    >
      <Image src={topping.image} width={80} height={80} alt={topping.name} />
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
