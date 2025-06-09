"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Apple, CreditCard } from "lucide-react";
import React from "react";

const UserForm = () => {
  return (
    <section className=" container  mt-8 flex gap-4 justify-around mx-auto">
      <Card className=" w-[40%]">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
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
                <CreditCard />
                Paypal
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="apple"
                id="apple"
                className="peer sr-only"
              />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Apple />
                Apple
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Card number</Label>
            <Input id="number" placeholder="" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={`${new Date().getFullYear() + i}`}
                    >
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className=" w-[40%] h-fit">
        <CardHeader>
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
        </CardFooter>
      </Card>
    </section>
  );
};

export default UserForm;
