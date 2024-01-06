import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    let response = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (!response.ok) {
      throw new Error("Not Authorized");
    }

    const data = await response.json();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("users", JSON.stringify({ email: data.email }));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/special-blog/:path*",
};
