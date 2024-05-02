import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { server } from "@/constants/config";
import { userExists } from "@/redux/reducers/auth";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmitForm = async (formdata) => {
    setIsLoading(true)
    const toastId = toast.loading("Logging in...")
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        {
          username: formdata.username,
          password: formdata.password,
        },
        {
          config,
        }
      );

      // Saving the login cookie : TODO having error in login backend so did it here . Later move it back to backend
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Set cookie expiration for 7 days
      const cookieOptions = `path=/; expires=${expirationDate.toUTCString()}; SameSite=none; Secure`;
      document.cookie = `login-token=${data.token}; ${cookieOptions}`;

      dispatch(userExists(data.user));
      toast.success(data.message,{id:toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.",{id:toastId});
      console.log(error);
    } finally {
      setIsLoading(false)
    }
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

          <Button type="submit" className="bg-green-600 hover:bg-green-500" disabled={isLoading}>
            Login
          </Button>
          <h2 className="text-center text-md">OR</h2>
          <Button
            variant="link"
            className="text-blue-600 -mt-4"
            onClick={toggleLogin}
            disabled={isLoading}
          >
            Sign Up Instead
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
