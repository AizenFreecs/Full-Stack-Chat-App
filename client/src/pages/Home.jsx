import AppLayout from "@/components/layout/AppLayout";
import React, { useState, useEffect } from "react";
import letsChat from "../assets/HomeWelcome.gif";
import axios from "axios";
import { useSelector } from "react-redux";
import { server } from "../constants/config";

function Home() {
  const [friends, setFriends] = useState();
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

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center align-middle h-full">
      {friends > 0 ? (
        <h1 className="text-2xl font-bold font-mono p-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent text-center">
          Your favorite people, just a tap away. Time to keep those
          conversations rolling!
        </h1>
      ) : (
        <h1 className="text-2xl text-center font-bold font-mono p-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent">
          Welcome! Let's get this community thriving by sending friend requests
          through the search. Making new connections opens up worlds - why not
          give it a try?
        </h1>
      )}

      <img src={letsChat} className="h-[20rem] w-[18rem]" />
    </div>
  );
}

export default AppLayout()(Home);
