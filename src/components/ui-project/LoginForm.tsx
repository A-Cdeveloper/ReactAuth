import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import Headline from "./Headline";
import { useSearchParams, useNavigate } from "react-router-dom";
import { login } from "@/lib/auth/user";
import Error from "./form/Error";
import useAuth from "@/context/useAuth";

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [, setModeSearchParams] = useSearchParams();
  const { setSessionStorageData } = useAuth();
  // console.log(modeSearchParams.get("mode"));

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef?.current!.value;
    const password = passRef?.current!.value;

    try {
      const results = await login({ email, password });
      setSessionStorageData(results);
      // sessionStorage.setItem("userSession", JSON.stringify(results));
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error.message as string;
      setError(msg);

      //console.log(error.message);
    }
  };

  return (
    <Card className="w-[80%] sm:w-[35%]">
      <CardHeader>
        <CardHeader className="p-0">
          <Headline level={1}>Login</Headline>
        </CardHeader>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">E-Mail</label>
            <Input
              type="email"
              name="email"
              ref={emailRef}
              className="my-1 focus:border-sky-500 focus:ring-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              ref={passRef}
              className="my-1 focus:border-sky-500 focus:ring-1"
              required
            />
          </div>

          <Button variant="destructive" className="mt-2 w-full">
            Login
          </Button>
          {error && <Error error={error} />}
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm">
        <Button
          variant="link"
          onClick={() => {
            setModeSearchParams({ mode: "create" });
          }}
        >
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
