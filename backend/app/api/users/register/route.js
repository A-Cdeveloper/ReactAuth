import { NextResponse } from "next/server";
import { createHashedPassword } from "../../../utils/auth";
import { checkUserEmail, registerUser } from "../../../utils/users";

export const POST = async (request) => {
  const res = await request.json();
  const { firstname, lastname, email, password } = res;

  const existingUser = checkUserEmail(email);

  if (existingUser.length !== 0) {
    return NextResponse.json(
      {
        message: "User with this email already exist.",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = createHashedPassword(password);

  registerUser(firstname, lastname, email, hashedPassword);

  const newUser = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };
  return NextResponse.json(newUser);
};
