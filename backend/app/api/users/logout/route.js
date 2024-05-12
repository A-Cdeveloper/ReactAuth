import { NextRequest, NextResponse } from "next/server";
import { logoutUser } from "../../../utils/users";

export const POST = async (NextRequest) => {
  const authHeader = NextRequest.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  logoutUser(token);

  return NextResponse.json(
    {
      message: "Susscess logout.",
    },
    {
      status: 200,
    }
  );
};
