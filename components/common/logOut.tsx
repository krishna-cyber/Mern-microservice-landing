"use client";
import React from "react";
import { Button } from "../ui/button";
import { logOut } from "@/lib/actions/logout";

const Logout = () => {
  return (
    <Button
      size={"sm"}
      onClick={async () => {
        await logOut();
      }}
      className=" h-7  py-1"
    >
      Logout
    </Button>
  );
};

export default Logout;
