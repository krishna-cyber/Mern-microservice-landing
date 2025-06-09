"use server";

import { cookies } from "next/headers";

export const logOut = async () => {
  const response = await fetch(`${process.env.API_URL}/api/auth/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
    },
  });

  if (!response.ok) {
    console.log(`Logout failed`, response.status);
    return false;
  }

  (await cookies()).delete(`accessToken`);
  (await cookies()).delete("refreshToken");

  return true;
};
