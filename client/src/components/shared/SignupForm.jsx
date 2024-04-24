import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosCamera } from "react-icons/io";
import { server } from "../../constants/config";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "@/redux/reducers/auth";

const usernameRegex =
  /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

function SignupForm({ toggleLogin }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      bio: "",
    },
  });
  const dispatch = useDispatch()

  const handleSubmitForm = async (formData) => {
    const formDataToSend = new FormData();
    
  
    // Append the form fields to the FormData object
    for (const [key, value] of Object.entries(formData)) {
      if (key === "avatar") {
        // Handle the avatar file separately
        if (value instanceof File) {
          formDataToSend.append(key, value);
        }
      } else {
        formDataToSend.append(key, value);
      }
    }
  
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(formDataToSend)
  
    try {
      const {data} = await axios.post(`${server}/api/user/register`, formDataToSend, config);
      console.log(data.user)
      dispatch(userExists(data.user))
      toast.success(data.message);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
      console.log(error);
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("avatar", file);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setValue("avatar", null);
    }
  };

  return (
    <Card className="min-w-[23rem]">
      <CardHeader>
        <CardTitle className=" text-2xl text-center">SignUp</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className=" w-full flex flex-col justify-center gap-4 "
        >
          <div className="flex flex-col relative items-center">
            <Avatar className="w-[10rem] h-[10rem]">
              {previewImage ? (
                <AvatarImage src={previewImage} />
              ) : (
                <>
                  <AvatarFallback>Select your Avatar.</AvatarFallback>
                </>
              )}
            </Avatar>
            <label
              htmlFor="avatar-input"
              className=" absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 cursor-pointer"
            >
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar")}
                onChange={handleImageChange}
              />
              <IoIosCamera className="w-5 h-5 text-gray-600" />
            </label>
          </div>

          <Input
            type="name"
            id="name"
            placeholder="Name"
            {...register("name", {
              required: true,
              maxLength: {
                value: 20,
                message: "Name cannot be larger than 20 characters.",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <Input
            type="text"
            id="username"
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

          <Textarea
            type="text"
            id="bio"
            placeholder="Bio"
            {...register("bio", {
              required: true,
              maxLength: {
                value: 100,
                message: "Bio cannot be larger than 100 characters.",
              },
            })}
          />
          {errors.bio && (
            <span className="text-red-500">{errors.bio.message}</span>
          )}

          <Input
            type="password"
            id="SignupPassword"
            placeholder="Password"
            {...register("password", {
              required: true,
              pattern: {
                value: passwordRegex,
                message: "Password is invalid",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            SignUp
          </Button>
          <h2 className="text-center text-md">OR</h2>
          <Button
            variant="link"
            className="text-green-600 -mt-4"
            onClick={toggleLogin}
          >
            Login Instead
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
