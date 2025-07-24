"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Resturants } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
const TenantSelect = ({ tenants }: { tenants: Resturants[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleValueChange = (tenantId: string) => {
    router.push(`/?tenantId=${tenantId}`);
  };
  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("tenantId") || ""}
    >
      <SelectTrigger className="w-[180px] ring-0">
        <SelectValue placeholder="Select Resturant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>

          {tenants.map((tenant) => (
            <SelectItem key={tenant._id} value={tenant._id}>
              {tenant.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
