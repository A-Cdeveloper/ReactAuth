import { API } from "../../constants/constants";

type LoginPropType = {
  email: string;
  password: string;
};

type RegisterType = {
  firstname: string;
  lastname: string;
} & LoginPropType;

export const login = async ({ email, password }: LoginPropType) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const data = await response.json();

  return data;
};

////////////////////////////////////////////////////////
export const register = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterType) => {
  const response = await fetch(`${API}//register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const data = await response.json();

  return data;
};

////////////////////////////////////////////////////////
export const logout = async (accessToken: string | null) => {
  const response = await fetch(`${API}/logout`, {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const data = await response.json();

  return data;
};
