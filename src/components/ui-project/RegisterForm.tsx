import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import Headline from "./Headline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { register } from "@/lib/auth/user";
import Error from "./form/Error";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [, setModeSearchParams] = useSearchParams();

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = firstNameRef?.current!.value;
    const lastname = lastNameRef?.current!.value;
    const email = emailRef?.current!.value;
    const password = passRef?.current!.value;

    try {
      await register({
        firstname,
        lastname,
        email,
        password,
      });

      //setSessionStorageData(results);
      // sessionStorage.setItem("userSession", JSON.stringify(results));
      navigate("/login/?mode=login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error.message as string;
      setError(msg);

      //console.log(error.message);
    }
  };

  const isPasswordValid = passwordAgain === passRef?.current?.value;

  return (
    <Card className="w-[80%] sm:w-[35%]">
      <CardHeader>
        <CardHeader className="p-0">
          <Headline level={1}>Register</Headline>
        </CardHeader>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={registerHandler}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <Input
              type="text"
              name="first_name"
              ref={firstNameRef}
              className="my-1 focus:border-sky-500 focus:ring-1"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <Input
              type="text"
              name="last_name"
              ref={lastNameRef}
              className="my-1 focus:border-sky-500 focus:ring-1"
              required
            />
          </div>
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
          <div>
            <label htmlFor="password_check">Re-Type Password</label>
            <Input
              type="password"
              name="password_check"
              className="my-1 focus:border-sky-500 focus:ring-1"
              required
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            {!isPasswordValid && passwordAgain !== "" ? (
              <p className=" text-red-600">Password don't match.</p>
            ) : (
              ""
            )}
          </div>
          <Button
            variant="destructive"
            className="mt-2 w-full"
            disabled={!isPasswordValid}
          >
            Register
          </Button>
          {error && <Error error={error} />}
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm">
        <Button
          variant="link"
          onClick={() => {
            setModeSearchParams({ mode: "login" });
          }}
        >
          Login in your account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
