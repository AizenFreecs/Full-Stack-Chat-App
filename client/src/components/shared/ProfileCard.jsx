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

function ProfileCard({ openCloseHandler }) {
  const dispatch = useDispatch();

  const [friends, setFriends] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getFriendsCount = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/profile`, {
          withCredentials: true,
        });
        setFriends(data.friendsCount);
        setUser(data.user);
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
        <GoArrowLeft
          className="mx-4 h-[1.5rem] w-[1.5rem] cursor-pointer hover:scale-110"
          onClick={() => openCloseHandler(false)}
        />
        <div
          onClick={logoutHandler}
          className="flex gap-2 px-4 py-2 cursor-pointer rounded-md hover:scale-110 hover:text-red-500 items-center justify-between"
        >
          <h1 className="text-xl font-bold text-red-500">Logout</h1>
          <FiLogOut className="h-[1.5rem] w-[1.5rem] text-red-500" />
        </div>
      </div>

      <Card className="drop-shadow-2xl flex flex-col  items-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent">
            My Profile
          </CardTitle>
          <Avatar className="w-[14rem] h-[14rem]">
            <AvatarImage src={user?.avatar?.url} />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">{user.name}</h1>
            <span className="flex items-center gap-1">
              <HiAtSymbol />
              <h1 className=" text-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent">
                {user.username}
              </h1>
            </span>
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
