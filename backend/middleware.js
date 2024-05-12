import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(NextRequest) {
  const authHeader = NextRequest.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  const res = NextResponse.next();
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (
    NextRequest.nextUrl.pathname.endsWith("/login") ||
    NextRequest.nextUrl.pathname.endsWith("/register")
  ) {
    return res;
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
