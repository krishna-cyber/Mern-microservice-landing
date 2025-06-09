import { cookies } from "next/headers";
import * as cookie from "cookie";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/auth/auth/logout`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")?.value
          }`,
          cookie: `refreshToken=${
            (await cookies()).get("refreshToken")?.value
          }`,
        },
      }
    );

    if (!response.ok) {
      console.log(`Refresh failed`);
      return Response.json({ success: false });
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

    return Response.json({ success: true });
  } catch (error: unknown) {
    return {
      type: "error",
      error: (error as Error)?.message || "An unknown error occurred",
    };
  }
}
