import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Messenger from "./pages/messenger/Messenger";
import ThemeProvider from "./component/theme-provider/ThemeProvider";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Likes from "./pages/likes/Likes";
import Notification from "./pages/notification/Notification";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.userReducer);

  const ProtectedRoute = ({ element, ...rest }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

 

  return (
    <ThemeProvider>
       <ToastContainer/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/messenger" element={<ProtectedRoute element={<Messenger />} />} />
        <Route path="/likes" element={<ProtectedRoute element={<Likes />} />} />
        <Route path="/notifications" element={<ProtectedRoute element={<Notification />} />} />
        <Route path="user/:userId" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Setting />} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
