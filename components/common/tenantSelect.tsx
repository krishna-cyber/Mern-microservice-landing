"use client";
import React from "react";
import { Select } from "flowbite-react";

import { Resturants } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
const TenantSelect = ({ tenants }: { tenants: Resturants[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tenantId = event.target.value;
    console.log(tenantId);
    router.push(`/?tenantId=${tenantId}`);
  };
  return (
    <Select
      color=""
      id="countries"
      className="w-lg"
      required
      onChange={handleValueChange}
      value={searchParams.get("tenantId") || ""}
    >
      <option value="" disabled>
        Select Restaurant
      </option>
      {tenants.map((tenant) => (
        <option key={tenant._id} value={tenant._id}>
          {tenant.name}
        </option>
      ))}
    </Select>
  );
};

export default TenantSelect;
