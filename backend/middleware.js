import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(NextRequest) {
  const authHeader = NextRequest.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (
    NextRequest.nextUrl.pathname.endsWith("/login") ||
    NextRequest.nextUrl.pathname.endsWith("/register")
  ) {
    return NextResponse.next();
  }

  if (token === null) {
    return NextResponse.json(
      { message: "Not authorized access" },
      {
        status: 401,
      }
    );
  }

  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    if (error.code === "ERR_JWS_INVALID") {
      return NextResponse.json(
        { message: "Bad token" },
        {
          status: 401,
        }
      );
    }
  }
}

export const config = {
  matcher: ["/api/users/:path*"],
};
