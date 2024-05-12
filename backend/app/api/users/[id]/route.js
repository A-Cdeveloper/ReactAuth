import { NextResponse } from "next/server";
import { getSingleUser } from "../../../utils/users";

export const GET = async (request, { params }) => {
  const { id } = params;
  const user = getSingleUser(id)[0];

  if (!user) {
    return NextResponse.json(
      { message: "No such user" },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(user);
};
