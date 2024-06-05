import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./context/AuthContext";

const Home = lazy(() => import("./pages/home/Home"));
const Messenger = lazy(() => import("./pages/messenger/Messenger"));
const Signup = lazy(() => import("./pages/auth/signup/Signup"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Likes = lazy(() => import("./pages/likes/Likes"));
const Notification = lazy(() => import("./pages/notification/Notification"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Post=lazy(() => import("./pages/post/Post"));
const Setting = lazy(() => import("./pages/setting/Setting"));

import SuspenseFallback from "./component/loaders/suspense-fallback/SuspenseFallback";



const App = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route
            path="/signup"
            element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/messenger"
            element={isLoggedIn ? <Messenger /> : <Navigate to="/login" />}
          />
          <Route
            path="/likes"
            element={isLoggedIn ? <Likes /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={isLoggedIn ? <Notification /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/:userId"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/:postId"
            element={isLoggedIn ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Setting /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
