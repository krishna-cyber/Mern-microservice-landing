"use client";
import { Button, Modal, ModalBody, ModalHeader, Radio } from "flowbite-react";
import { ShoppingCart } from "lucide-react";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ProductType, Topping } from "@/lib/types";
import ToppingCard from "@/components/common/toppingCard";
// import { DialogTitle } from "../../../components/ui/dialog";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, CartItem } from "@/lib/store/feature/cartSlice";
import { toast } from "sonner";
import { hashProductCartItem } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useCalculateTotal } from "@/lib/hooks/useCalculateTotal";

interface Props {
  product: ProductType;
}

const ProductModal = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const keys = _.keys(product.priceConfiguration);

  const defaultPriceConfiguration = keys
    .map((key) => {
      const defaultKey = _.keys(
        product.priceConfiguration[key].avilableOptions
      )[0];

      return {
        [key]: defaultKey,
      };
    })
    .reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

  const [selectedConfiguration, setSelectedConfiguration] = useState<{
    [key: string]: string;
  }>(defaultPriceConfiguration);

  const avilableOptions = keys.map((key) => {
    return product.priceConfiguration[key]?.avilableOptions;
  });

  const handleSelectedToppings = (topping: Topping) => {
    setSelectedToppings(
      (prev) =>
        prev.some((i) => i._id === topping._id)
          ? prev.filter((i) => i._id !== topping._id) // Remove if already exists
          : [...prev, topping] // Add if not in array
    );
  };

  const handleAddToCart = () => {
    const itemToAdd: CartItem = {
      product,
      chosenConfiguration: selectedConfiguration,
      ...(selectedToppings && { selectedToppings }),
      qty: 1,
    };
    dispatch(addToCart(itemToAdd));
    setSelectedToppings([]);
    setOpenModal(!openModal);
    toast.success("Item added to cart", {
      description() {
        return product.name;
      },
    });
  };

  useEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/category/topping?tenantId=${searchParams.get("tenantId")}`
    )
      .then((res) => res.json())
      .then((data) => {
        setToppings(data.result);
      });
  }, []);

  const handlePriceConfiguration = (key: string, value: string) => {
    setSelectedConfiguration((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const totalPrice = useCalculateTotal({
    product,
    chosenConfiguration: selectedConfiguration,
    selectedToppings,
    qty: 1,
  });

  const isProductInCart = useMemo(() => {
    const productDetails: CartItem = {
      product,
      chosenConfiguration: selectedConfiguration,
      ...(selectedToppings && { selectedToppings }),
      qty: 1,
    };

    const productHash = hashProductCartItem(productDetails);

    //condition
    return cartItems.some((item) => item.itemHash === productHash);
  }, [product, selectedConfiguration, cartItems, selectedToppings]);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className=" h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      >
        Choose
      </Button>
      <Modal size={"4xl"} show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>{product.name}</ModalHeader>
        <ModalBody>
          <div className=" flex justify-between">
            <div className=" w-1/3 bg-white p-6 rounded-md flex justify-center items-center ">
              <Image
                src={product?.image[0]}
                width={400}
                height={400}
                alt={product.name}
              />
            </div>
            <div className=" w-2/3">
              <h2 className=" text-2xl font-bold">{product.name}</h2>
              <h4>{product.description}</h4>

              {keys.map((key, index) => (
                <div key={key}>
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Choose the {_.capitalize(key)}
                  </h3>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {Object.entries(avilableOptions[index]).map(
                      ([key], optionIndex) => (
                        <>
                          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                              <Radio
                                id={key}
                                name={`configuration-${index}`}
                                aria-label={_.capitalize(key)}
                                value={key}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                defaultChecked={optionIndex === 0}
                                onChange={() =>
                                  handlePriceConfiguration(keys[index], key)
                                }
                              />
                              <label
                                htmlFor={key}
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {_.capitalize(key)}
                              </label>
                            </div>
                          </li>
                          <span key={key}>
                            {/* <RadioGroupItem
                            value={key}
                            id={key}
                            className="peer sr-only "
                            aria-label={_.capitalize(key)}
                          />
                          <Label
                            htmlFor={key}
                            className="flex flex-col items-center text-md justify-between rounded-md border-2 bg-white py-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            {_.capitalize(key)}
                          </Label> */}
                          </span>
                        </>
                      )
                    )}
                  </ul>

                  {/* <RadioGroup
                    defaultValue={
                      _.keys(product.priceConfiguration[key].avilableOptions)[0]
                    }
                    onValueChange={(data) => {
                      handlePriceConfiguration(key, data);
                    }}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    {Object.entries(avilableOptions[index]).map(([key]) => (
                      <span key={key}>
                        <RadioGroupItem
                          value={key}
                          id={key}
                          className="peer sr-only "
                          aria-label={_.capitalize(key)}
                        />
                        <Label
                          htmlFor={key}
                          className="flex flex-col items-center text-md justify-between rounded-md border-2 bg-white py-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          {_.capitalize(key)}
                        </Label>
                      </span>
                    ))}
                  </RadioGroup> */}
                </div>
              ))}

              <Suspense fallback={"Loading..."}>
                {product.categoryId.hasToppings && (
                  <div>
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                      Choose the Toppings
                    </h3>

                    <div className=" grid grid-cols-3 gap-4 mt-2">
                      {toppings.map((topping: Topping) => {
                        return (
                          <ToppingCard
                            key={topping._id}
                            topping={topping}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleSelectedToppings}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </Suspense>

              <div className=" flex justify-between mt-6">
                <span className=" font-bold">&#8377; {totalPrice}</span>
                <Button
                  // className=" text-md"
                  className={
                    isProductInCart
                      ? "bg-green-300 text-green-800 text-md"
                      : "text-md"
                  }
                  color={isProductInCart ? "outline" : "default"}
                  disabled={isProductInCart}
                  onClick={() => handleAddToCart()}
                >
                  <ShoppingCart size={20} />
                  {isProductInCart ? "Product is in cart" : "Add to cart"}
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProductModal;
