import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HiAtSymbol } from "react-icons/hi2";
import { Label } from "../ui/label";
import { SlCalender } from "react-icons/sl";
import { FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function ProfileCard() {
  return (
      <div>
          <div>
              <FiLogOut/>
          </div>
      <Card className="drop-shadow-2xl flex flex-col  items-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-4xl text-center text-gray-600">
            My Profile
          </CardTitle>
          <Avatar className="w-[12rem] h-[12rem]">
            <AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
            <AvatarFallback>Your Profile Image Here</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Sahil Thakur</h1>
            <h1 className="flex items-center text-lg ">
              <HiAtSymbol />
              AizenFreecs
            </h1>
          </div>

          <div className="text-center">
            <Label className="text-md">Bio</Label>
            <p className="text-md text-gray-500">
              This is whereyou bio will appear finally.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <SlCalender />
            <h1>Joined on Date this.</h1>
          </div>
          <div className="flex flex-col items-center">
            <FaUserFriends />
            <h1>My total no of friends.</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileCard;
