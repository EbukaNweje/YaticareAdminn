import { NavLink } from "react-router-dom";
import { GoMail } from "react-icons/go";

const ForgetPassword = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="w-full h-screen bg-[#ebf8fc] flex justify-center">
        <div className="w-[29%] phone:w-[85%] h-[76%]">
          <div className="w-full h-max bg-white shadow rounded py-12 px-12 flex flex-col gap-5 mt-16">
            <div className="w-full h-max text-2xl font-semibold text-center mb-2 text-[pry-text]">
              <p>Password Reset</p>
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
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1">
              <button className="w-full flex items-center justify-center py-3 rounded text-white bg-[#0e4152]">
                Continue
              </button>
              <NavLink to="/adminlogin/login">
                <p className="w-full flex justify-center text-sm cursor-pointer text-[#0e4152] mt-5">
                  Repeat login? <span className="font-bold ml-4">Login</span>
                </p>
              </NavLink>
            </div>
            <div className="w-full text-center">
              <p className="text-sm">
                © Copyright {year} Yati care All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
