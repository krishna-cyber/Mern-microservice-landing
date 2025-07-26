import React from "react";
import { ProductType } from "@/lib/types";
import ProductModal from "@/app/(home)/components/productModal";
import { getMinimumProductPrice } from "@/lib/utils";
import { Card } from "flowbite-react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface PropType {
  product: ProductType;
}

const ProductCard = ({ product }: PropType) => {
  return (
    <Card className="max-w-sm" imgSrc={product?.image[0]} horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product?.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {product?.description}
      </p>

      <p>
        <span>From </span>
        <span className=" font-bold">${getMinimumProductPrice(product)} </span>
      </p>
      <ProductModal product={product} />
    </Card>
  );
};

export default ProductCard;
