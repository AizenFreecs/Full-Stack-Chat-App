import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const usernameRegex =
  /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

function LoginForm({ toggleLogin }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmitForm = (data) => {
    console.log(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-2xl text-center">Login</CardTitle>
        <CardDescription>
          Please login through your username and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className=" w-full flex flex-col justify-center gap-4 "
        >
          <Input
            type="name"
            id="name"
            placeholder="Username"
            {...register("username", {
              required: true,
              pattern: {
                value: usernameRegex,
                message: "Invalid username format",
              },
            })}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
          <Input
            type="password"
            id="LoginPassword"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          
          <Button type="submit" className="bg-green-600 hover:bg-green-500">
            Login
          </Button>
          <h2 className="text-center text-md">OR</h2>
          <Button
            variant="link"
            className="text-blue-600 -mt-4"
            onClick={toggleLogin}
          >
            Sign Up Instead
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
