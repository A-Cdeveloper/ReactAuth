import { db } from "./db";

export const getUsers = () => {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all();
};

export const getSingleUser = (id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id=?");
  return stmt.all(id);
};

export const checkUserEmail = (userEmail) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.all(userEmail);
};
export const registerUser = (firstname, lastname, email, password) => {
  const stmt = db.prepare(
    "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?,?)"
  );
  stmt.run(firstname, lastname, email, password);
};

export const loginUser = (accessToken, refreshToken, id) => {
  const stmt = db.prepare(
    "UPDATE users SET accesToken=?, refreshToken=? WHERE id = ?"
  );
  return stmt.run(accessToken, refreshToken, id);
};

export const logoutUser = (accessToken) => {
  // console.log(accessToken);
  const stmt = db.prepare(
    "UPDATE users SET accesToken=NULL, refreshToken=NULL WHERE accesToken = ?"
  );
  return stmt.run(accessToken);
};
