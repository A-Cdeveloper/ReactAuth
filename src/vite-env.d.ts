/// <reference types="vite/client" />

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  state: string;
  phone: string;
  email: string;
  password: string;
  notes: string;
  createdAt: Date;
};
