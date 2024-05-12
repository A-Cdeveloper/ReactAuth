import { NextResponse } from "next/server";
import { getUsers } from "../../utils/users";

export const GET = async () => {
  const users = getUsers();
  if (users.length === 0) {
    return NextResponse.json(
      { message: "No users found." },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(users);
};
