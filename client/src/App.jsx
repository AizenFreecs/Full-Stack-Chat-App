import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteProtector from "./auth/RouteProtector";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast"
import { SocketProvider } from "../Socket";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  const {user,isLoading} = useSelector(state =>state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/user/profile`,{withCredentials:true})
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return isLoading ? <LayoutLoader/> : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider>
            <RouteProtector user={user} />
          </SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>

          <Route
            path="/login"
            element={
              <RouteProtector user={!user} redirect="/">
                <Login />
              </RouteProtector>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
