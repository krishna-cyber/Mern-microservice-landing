"use server";

import { cookies } from "next/headers";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "manager" | "customer";
  tenant: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  user: User;
}

export const getSession = async () => {
  return await getSelf();
};

const getSelf = async (): Promise<Session | null> => {
  const response = await fetch(`${process.env.API_URL}/api/auth/auth/self`, {
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as User,
  };
};
