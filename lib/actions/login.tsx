"use server";
import * as cookie from "cookie";
import { cookies } from "next/headers";
interface PreviousState {
  // Define the structure of previousState here
  [key: string]: unknown;
}

export async function login(previousState: PreviousState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(`Email:${email} and password:${password}`);

  try {
    const response = await fetch(`${process.env.API_URL}/api/auth/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(`Error`, error);
      return {
        type: "error",
        message: error.errors[0].message,
      };
    }
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies are found",
      };
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken as string,
      expires: new Date(parsedAccessToken.Expires as string),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      sameSite: parsedAccessToken.Samesite as "strict",
      domain: parsedAccessToken.Domain,
    });
    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken as string,
      expires: new Date(parsedAccessToken.Expires as string),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      sameSite: parsedAccessToken.Samesite as "strict",
      domain: parsedAccessToken.Domain,
    });

    return {
      type: "success",
      message: "login successful",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      type: "error",
      error: (error as Error)?.message || "An unknown error occurred",
    };
  }
}
