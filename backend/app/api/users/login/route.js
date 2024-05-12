import { createJwtToken, verifyPassword } from "../../../utils/auth";
import { checkUserEmail, loginUser } from "../../../utils/users";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const res = await request.json();
  const { email, password } = res;

  const existingUser = checkUserEmail(email);

  if (existingUser.length === 0) {
    return NextResponse.json(
      {
        message: "User with this email not exist.",
      },
      {
        status: 400,
      }
    );
  }

  const isVerifyPassword = verifyPassword(password, existingUser[0].password);

  if (!isVerifyPassword) {
    return NextResponse.json(
      {
        message: "Wrong password",
      },
      {
        status: 400,
      }
    );
  }

  const accessToken = createJwtToken(email, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = createJwtToken(email, process.env.REFRESH_TOKEN_SECRET);

  loginUser(accessToken, refreshToken, existingUser[0].id);

  return NextResponse.json(
    {
      user: {
        firstname: existingUser[0].firstname,
        lastname: existingUser[0].lastname,
        email: existingUser[0].email,
      },
      accessToken,
      refreshToken,
    },
    {
      status: 200,
    }
  );
};
