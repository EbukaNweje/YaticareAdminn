import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/swiftlogo.png";
import { GoMail } from "react-icons/go";
import { LuKey } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAdminById } from "../redux/adminSlice";

const Login = () => {
  const dispatch = useDispatch();

  const getAllUserData = () => {
    const url = "https://yaticare-backend.onrender.com/api/admin/allusers";
    axios
      .get(url)
      .then((response) => {
        localStorage.setItem("allUserData", JSON.stringify(response?.data));
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const nav = useNavigate();
  const year = new Date().getFullYear();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (
      document.getElementById("email").value === "" ||
      document.getElementById("password").value === ""
    ) {
      setLoading(false);
      toast.error("Please fill out all fields");
    } else if (!document.getElementById("email").value) {
      setLoading(false);
      toast.error("Invalid email address");
    } else {
      setLoading(true);

      const userData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      axios
        .post(
          "https://yaticare-backend.onrender.com/api/admin/adminlogin",
          userData,
        )
        .then(async (res) => {
          toast.success("Login Successful");

          const responseData = res?.data || {};
          const token = responseData?.token || "";

          // Decode the JWT payload to extract the admin ID (no library needed)
          let adminId = "";
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split(".")[1]));
              adminId = payload?.id || payload?._id || payload?.adminId || "";
            } catch {
              // malformed token
            }
          }

          let isLowerAdmin = false;
          if (adminId) {
            localStorage.setItem("adminId", adminId);
            localStorage.setItem("adminToken", token);
            const result = await dispatch(fetchAdminById(adminId));
            const adminData = result?.payload;
            const name = (adminData?.fullName || adminData?.name || "")
              .trim()
              .toLowerCase();
            isLowerAdmin = name === "lower admin";
          }

          if (res.status === 200) {
            nav(
              isLowerAdmin ? "/admin/dashboard/all-chats" : "/admin/dashboard",
            );
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#ebf8fc] flex justify-center">
        <div className="w-[29%] phone:w-[85%] h-[76%]">
          <div className="w-full h-24 py-4 flex justify-center items-end ">
            <img src={logo} alt="" className="w-32 h-20 object-contain" />
          </div>
          <div className="w-full h-max bg-white shadow rounded py-12 px-12 flex flex-col gap-5">
            <div className="w-full h-max text-2xl font-semibold text-center mb-2 text-[pry-text]">
              <p>Manager Login</p>
            </div>
            <div className="w-full h-max flex flex-col gap-2">
              <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
                Your Email
                <span className="text-red-700 flex items-center">*</span>
              </p>
              <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
                <GoMail />
                <input
                  className="border-none outline-none w-[90%] h-full"
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                />
              </div>
            </div>
            <div className="w-full h-max flex flex-col gap-2">
              <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
                Password
                <span className="text-red-700 flex items-center">*</span>
              </p>
              <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
                <LuKey />
                <input
                  className="border-none outline-none w-[90%] h-full"
                  type="password"
                  placeholder="Enter password"
                  id="password"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <NavLink to="/admin/forget-password">
                <p className="w-full flex justify-end text-sm font-bold cursor-pointer text-[#0e4152]">
                  Forget password ?
                </p>
              </NavLink>
              <button
                className="w-full flex items-center justify-center py-3 rounded text-white bg-[#0e4152]"
                onClick={handleLogin}
              >
                {loading ? "Loading" : "Sign in"}
              </button>
            </div>
            <div className="w-full text-center">
              <p className="text-sm">
                © Copyright {year} Yaticare All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
