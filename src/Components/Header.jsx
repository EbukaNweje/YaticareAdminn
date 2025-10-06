import { IoMdMenu } from "react-icons/io";
import { FaSearch, FaUser } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const Header = ({ sideBar }) => {
  return (
    <>
      <div className="w-full h-16 bg-[#0e4152] fixed top-0 left-0 flex phone:relative">
        <div className="w-[16%] h-full flex items-center justify-between px-6 phone:px-2">
          <IoMdMenu
            className="cursor-pointer  text-white hidden phone:block w-8 h-10"
            onClick={sideBar}
          />

          <p className="text-[1.70rem] text-white phone:hidden">Yaticare</p>

          <IoMdMenu className="cursor-pointer w-7 h-7 text-white phone:hidden" />
        </div>
        <div className="w-[84%] h-full flex justify-between  items-center px-8">
          <p className="text-[1.70rem] text-white w-[80%] phone:flex justify-center hidden">
            Yaticare{" "}
          </p>

          <div className="flex items-center h-10 w-96 bg-[#0c3846] rounded text-white phone:hidden">
            <FaSearch className="w-10 h-6 cursor-pointer" />
            <input
              type="text"
              placeholder="Manage users"
              className="w-full h-full bg-transparent text-sm font-bold outline-none pl-4 text-white"
            />
          </div>
          <FaUser className="cursor-pointer w-8 h-8 p-1 phone:hidden text-white" />
          <HiDotsVertical className="hidden phone:block w-7 h-7 cursor-pointer text-white" />
        </div>
      </div>
    </>
  );
};

export default Header;
