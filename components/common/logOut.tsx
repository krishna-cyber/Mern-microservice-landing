"use client";
import { Button } from "flowbite-react";

import React from "react";
// import { logOut } from "@/lib/actions/logout";

const Logout = () => {
  return (
    <Button
      // onClick={async () => {
      //   await logOut();
      // }}
      className=" h-7  py-1"
    >
      Logout
    </Button>
  );
};

export default Logout;
