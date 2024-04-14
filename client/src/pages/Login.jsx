import React, { useState } from "react";

import LoginForm from "@/components/shared/LoginForm";
import SignupForm from "@/components/shared/SignupForm";
const blueBg = "bg-gradient-to-t from-blue-500 to-blue-100"
const greenBg = "bg-gradient-to-t from-green-500 to-green-100"
function Login({}) {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin((prev) => !isLogin)
   
  }
  return (
    <section className={`flex items-center h-[100vh] justify-center drop-shadow-2xl ${isLogin ? blueBg : greenBg} `}>
    {isLogin ? <LoginForm toggleLogin={toggleLogin} /> : <SignupForm toggleLogin={toggleLogin} />}
    </section>
  );
}

export default Login;


