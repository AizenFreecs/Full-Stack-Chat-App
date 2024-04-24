import React, { useEffect, useState } from "react";
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
import { FaUserFriends, FaArrowLeft } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import moment from "moment";
import { transformImage } from "@/lib/features";
import { server } from "@/constants/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "@/redux/reducers/auth";
import axios from "axios";

function ProfileCard() {
  const dispatch = useDispatch();

  const [friends, setFriends] = useState();
  const [user,setUser] = useState({})

  useEffect(() => {
    const getFriendsCount = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/profile`, {
          withCredentials: true,
        });
        setFriends(data.friendsCount);
        setUser(data.user)
      } catch (error) {
        console.log(error);
      }
    };
    getFriendsCount();
  }, []);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <div>
      <div className="bg-white flex items-center justify-between h-[3rem] px-4 py-2 w-full rounded-md mb-4">
        <GoArrowLeft className="mx-4 h-[1.5rem] w-[1.5rem] cursor-pointer hover:scale-110" />
        <div
          onClick={logoutHandler}
          className="flex gap-2 px-4 py-2 cursor-pointer rounded-md hover:scale-110 hover:text-red-500 items-center justify-between"
        >
          <h1>Logout</h1>
          <FiLogOut className="h-[1.5rem] w-[1.5rem]" />
        </div>
      </div>

      <Card className="drop-shadow-2xl flex flex-col  items-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-4xl text-center text-gray-600">
            My Profile
          </CardTitle>
          <Avatar className="w-[12rem] h-[12rem]">
            <AvatarImage src={transformImage(user?.avatar?.url)} />
            <AvatarFallback>Your Profile Image Here</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">{user.name}</h1>
            <h1 className="flex items-center text-lg ">
              <HiAtSymbol />
              {user.username}
            </h1>
          </div>

          <div className="text-center">
            <Label className="text-md">Bio</Label>
            <p className="text-md text-gray-500">{user.bio}</p>
          </div>
          <div className="flex flex-col items-center">
            <SlCalender />
            <h1>Joined {moment(user.createdAt).fromNow()}</h1>
          </div>
          <div className="flex flex-col items-center">
            <FaUserFriends />
            <h1>{friends} Friends.</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileCard;
