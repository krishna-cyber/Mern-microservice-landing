import { getSession } from "@/lib/session";

import { redirect } from "next/navigation";
import React from "react";
import UserForm from "./components/userForm";
type Params = Promise<{ tenantId: string }>;

const CheckoutPage = async ({ searchParams }: { searchParams: Params }) => {
  const session = await getSession();

  const sParams = new URLSearchParams(await searchParams);

  const existingQueryString = sParams.toString();

  sParams.append("redirectTo", `/ordersSummary?${existingQueryString}`);

  if (!session) {
    redirect(`/login?${sParams}`);
  }

  return <UserForm />;
};

export default CheckoutPage;
