"use client";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Card } from "flowbite-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCustomer } from "@/lib/http/api";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

import { Banknote, CreditCard } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { Textarea } from "@/components/ui/textarea";

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
        {/* <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Banknote />
              Cash
            </Label>
          </div>
        </RadioGroup> */}

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
        {/* <CardHeader>
          <CardTitle>Orders Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
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
          <div className="grid grid-cols-6  gap-2">
            <Input
              id="name"
              className=" col-span-5"
              placeholder="Coupon code"
            />{" "}
            <Button variant={"outline"}>Apply</Button>
          </div>
          <hr></hr>
          <span className=" flex justify-between">
            <span>Order Total</span> <span>1000</span>
          </span>
        </CardContent>

        <CardFooter className=" py-0 w-full">
          <Button size={"sm"} className=" self-end ml-auto">
            Continue
          </Button>
        </CardFooter> */}
      </Card>
    </section>
  );
};

export default UserForm;
