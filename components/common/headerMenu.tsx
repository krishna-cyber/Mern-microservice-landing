"use client";
import Link from "next/link";
import React from "react";
import CartMenu from "./cartMenu";
import { Phone } from "lucide-react";
import Logout from "./logOut";
import { Button } from "flowbite-react";
import { Session } from "@/lib/session";
import { useSearchParams } from "next/navigation";

const HeaderMenu = ({ session }: { session: Session | null }) => {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const appendQuery = queryString ? `?${queryString}` : "";
  return (
    <div className=" flex space-x-3 items-center gap-">
      <ul className=" list-none flex gap-3">
        <li>
          <Link className="hover:text-primary" href={`/menu${appendQuery}`}>
            Menu
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-primary"
            href={`/ordersSummary${appendQuery}`}
          >
            Orders
          </Link>
        </li>
      </ul>
      <CartMenu />
      <div className=" flex space-x-2 items-center">
        <Phone className=" inline-block" />
        <p>+977-9868880218</p>

        {session ? (
          <Logout />
        ) : (
          <Button className=" px-4 bg-orange-400 hover:bg-orange-200 hover:text-black">
            <Link href={`/login${appendQuery}`}>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;
