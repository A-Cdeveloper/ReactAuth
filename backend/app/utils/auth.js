import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db";

export const createHashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
};

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const createJwtToken = (field, secret) => {
  return jwt.sign({ field }, secret, {
    expiresIn: "1h",
  });
};

// export const verifyJwtToken = async (token, secret) => {
//   jwt.verify(token, secret, (err, user) => {
//     if (err) return;
//     return true;
//   });
// };
