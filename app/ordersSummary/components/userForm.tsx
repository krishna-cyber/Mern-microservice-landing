"use client";
import { Button, Label, Radio, TextInput, Textarea } from "flowbite-react";
import { Card } from "flowbite-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCustomer } from "@/lib/http/api";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

import { Banknote, CreditCard, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Customer } from "@/lib/types";

const UserForm = () => {
  const [selectedPayment, setSelectedPayment] = useState<"card" | "cash">(
    "card"
  );

  const { data: customer } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });
  console.log(customer);
  return (
    <section className=" container  mt-8 flex gap-4 justify-around mx-auto">
      <Card className=" w-[40%]">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Customer Details
        </h5>
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name:</Label>

          <TextInput id="first-name" value={customer?.firstName} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last name:</Label>

          <TextInput id="last-name" value={customer?.lastName} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail:</Label>

          <TextInput id="email" value={customer?.email} disabled />
        </div>
        <Card>
          {/* <CardHeader>
            <CardTitle>Addresses:</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">+ Add address</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add address</DialogTitle>
                  <DialogDescription>
                    Delivery address or reference
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" placeholder="Delivery address " readOnly />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <RadioGroup
            defaultValue="card"
            className="grid grid-cols-3 gap-4"
          ></RadioGroup> */}
        </Card>
        {/* <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4"> */}
        <div className="mb-4">
          <h6 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Payment Method
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="card-payment"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedPayment === "card"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Radio
                  id="card-payment"
                  name="payment-method"
                  value="card"
                  className="sr-only"
                  checked={selectedPayment === "card"}
                  onChange={() => setSelectedPayment("card")}
                />
                <CreditCard
                  className={`mb-2 ${
                    selectedPayment === "card"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                <span className="font-medium">Card Payment</span>
              </Label>
            </div>
            <div>
              <Label
                htmlFor="cash-payment"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedPayment === "cash"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Radio
                  id="cash-payment"
                  name="payment-method"
                  value="cash"
                  className="sr-only"
                  checked={selectedPayment === "cash"}
                  onChange={() => setSelectedPayment("cash")}
                />
                <Banknote
                  className={`mb-2 ${
                    selectedPayment === "cash"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                />
                <span className="font-medium">Cash on Delivery</span>
              </Label>
            </div>
          </div>

          {/* Display selected payment method */}
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              Selected:{" "}
              <span className="font-medium text-gray-900">
                {selectedPayment === "card"
                  ? "Card Payment"
                  : "Cash on Delivery"}
              </span>
            </p>
          </div>
        </div>

        {/* </RadioGroup>  */}

        <div className="grid w-full gap-3">
          <Label htmlFor="message">Your message or instruction:</Label>
          <Textarea
            placeholder="You can leave a note or instruction for order."
            id="message"
            rows={4}
          />
        </div>
      </Card>
      <Card className=" w-[40%] h-fit">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Orders Summary
        </h5>

        <div className="grid gap-2">
          <span className=" flex justify-between">
            <span>SubTotal</span> <span>1200</span>
          </span>
          <span className=" flex justify-between">
            <span>Taxes</span> <span>500</span>
          </span>
          <span className=" flex justify-between">
            <span>Delivery Charges </span> <span>200</span>
          </span>
          <span className=" flex justify-between">
            <span>Discount</span> <span>0</span>
          </span>
        </div>
        <div className="grid grid-cols-6 items-center  gap-2">
          <TextInput
            id="discount-code"
            className=" col-span-5"
            placeholder="Coupon code"
          />

          <Button size={"sm"} color={"blue"}>
            Apply
          </Button>
        </div>
        <hr></hr>
        <span className=" flex justify-between">
          <span>Order Total</span> <span>1000</span>
        </span>

        {/* <CardFooter className=" py-0 w-full"> */}
        <Button size={"sm"} className=" flex items-center gap-4 ml-auto">
          Proceed to payment <SendHorizontal className=" h-4 w-4" />
        </Button>
        {/* </CardFooter> */}
      </Card>
    </section>
  );
};

export default UserForm;
