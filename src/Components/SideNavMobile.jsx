import {useState} from "react";
import {
    FaAlignCenter,
    FaArrowAltCircleUp,
    FaCaretDown,
    FaCog,
    FaCubes,
    FaDownload,
    FaHome,
    FaInfoCircle,
    FaUser,
    FaUserCheck,
    FaUserCircle,
} from "react-icons/fa";
import { NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const SideNavMobile = () => {
    const [dropInvestment, setDropInvestment] = useState(false);

    const handleDropInvestment = () => {
        setDropInvestment(!dropInvestment);
    };
    const [dropCrm, setDropCrm] = useState(false);

    const handleDropCRM = () => {
        setDropCrm(!dropCrm);
    };
    const [dropAdmin, setDropAdmin] = useState(false);

    const handleDropAdmin = () => {
        setDropAdmin(!dropAdmin);
    };
    const [dropSetting, setDropSetting] = useState(false);

    const handleDropSetting = () => {
        setDropSetting(!dropSetting);
    };

    const nav = useNavigate();

    const handleNavToPlan = () => {
        nav("/admin/dashboard");
    };

    return (
        <>
            <div className="seesidebar w-64 h-[100vh] bg-white overflow-y-auto ">
                <div className="w-full h-max px-5 flex flex-col gap-4">
                    <div className="w-full h-20 flex flex-col justify-center border-b border-b-gray-200 cursor-pointer">
                        <p className="text-[rgb(119,119,119)]">Admin Test</p>
                        <p className="text-sm font-bold text-[rgb(85,85,85)]">
                            Admin
                        </p>
                    </div>
                    <div
                        onClick={handleNavToPlan}
                        className={`${
                            location.pathname === "/admin/dashboard"
                                ? "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                : "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                        } transition-all w-full text-sm h-12 cursor-pointer rounded-md flex items-center gap-4 font-bold px-2 `}
                    >
                        <FaHome className="w-5 h-5" />
                        <p className="">Dashboard</p>
                    </div>
                    {/* <div className="w-full h-max flex flex-col gap-2 ">
                        <div
                            className="w-full h-12 flex text-sm transition-all hover:text-[0.90rem] hover:bg-gray-100  hover:text-[#0e4152] cursor-pointer items-center justify-between text-[#777777]"
                            onClick={handleDropInvestment}
                        >
                            <div className="w-full h-full flex items-center gap-4 font-bold px-2 ">
                                <FaCubes className="w-5 h-5" />
                                <p className="">Investment</p>
                            </div>
                            <div
                                className={`w-6 h-full  flex items-center transition-all duration-700 justify-center ${
                                    dropInvestment
                                        ? "transform -rotate-180"
                                        : ""
                                }`}
                            >
                                <FaCaretDown />
                            </div>
                        </div>
                        <div
                            className={`w-full h-max flex flex-col cursor-pointer gap-2 text-sm text-[#777777] ${
                                dropInvestment
                                    ? "w-full max-h-[9rem] overflow-hidden transition-max-h duration-700 ease-in-out "
                                    : "max-h-0 opacity-0 transition-max-h duration-700 pointer-events-none overflow-hidden"
                            }`}
                        >
                            <NavLink
                                to={"/admin/dashboard/plans"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Investment Plans</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/active-investment"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded text-[#777] hover:text-[#0e4152]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Active Investment</p>
                                </div>
                            </NavLink>
                        </div>
                    </div> */}
                    <NavLink
                        to={"/admin/dashboard/manageusers"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all  hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152]  hover:bg-[#0e4152] text-white hover:text-[0.90rem]"
                        }
                    >
                        <div className="w-full h-12 text-sm rounded-md hover:text-[0.90rem] cursor-pointer transition-all flex items-center gap-4 font-bold px-2 ">
                            <FaUserCircle className="w-5 h-5" />
                            <p className="">Manage Users</p>
                        </div>
                    </NavLink>
                    <NavLink
                        to={"/admin/dashboard/manage-deposits"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                        }
                    >
                        <div className="w-full h-12 text-sm cursor-pointer hover:text-[0.90rem] transition-all rounded-md flex items-center gap-4 font-bold px-2 ">
                            <FaDownload className="w-5 h-5" />
                            <p className="">Manage Deposits</p>
                        </div>
                    </NavLink>

                    <NavLink
                        to={"/admin/dashboard/manage-withdrawals"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                        }
                    >
                        <div className="w-full h-12 text-sm cursor-pointer hover:text-[0.90rem] transition-all  rounded-md flex items-center gap-4 font-bold px-2 ">
                            <FaArrowAltCircleUp className="w-5 h-5" />
                            <p className="">Manage Withdrawal</p>
                        </div>
                    </NavLink>
                    <NavLink
                        to={"/admin/dashboard/kyc-applications"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                        }
                    >
                        {/* <div className="w-full h-12 text-sm cursor-pointer hover:text-[0.90rem] transition-all  rounded-md flex items-center gap-4 font-bold px-2 ">
                            <FaUserCheck className="w-5 h-5" />
                            <p className="">KYC Application(s)</p>
                        </div> */}
                    </NavLink>
                    {/* <div className="w-full h-max flex flex-col gap-2 ">
                        <div
                            className="w-full h-12 flex text-sm transition-all  cursor-pointer items-center justify-between text-[#777777]"
                            onClick={handleDropCRM}
                        >
                            <div className="w-full h-full hover:text-[0.90rem] transition-all hover:text-[#0e4152] flex items-center gap-4 font-bold px-2 ">
                                <FaAlignCenter className="w-5 h-5" />
                                <p className="">CRM</p>
                            </div>
                            <div
                                className={`w-8 h-full  flex items-center transition-all duration-700 justify-center ${
                                    dropCrm ? "transform -rotate-180" : ""
                                }`}
                            >
                                <FaCaretDown />
                            </div>
                        </div>
                        <div
                            className={`w-full h-max flex flex-col cursor-pointer text-sm gap-2 text-[#777777] ${
                                dropCrm
                                    ? "w-full max-h-[15rem] overflow-hidden transition-max-h duration-700 ease-in-out "
                                    : "max-h-0 transition-max-h duration-700 pointer-events-none overflow-hidden opacity-0"
                            }`}
                        >
                            <NavLink
                                to={"/admin/dashboard/create-task"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem]  cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Create Task</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/manage-task"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Manage Task</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/leads"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Lead</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/email-services"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Email Services</p>
                                </div>
                            </NavLink>
                        </div>
                    </div> */}
                    <div className="w-full h-max flex flex-col gap-2 ">
                        <div
                            className="w-full h-12 text-sm flex cursor-pointer transition-all  items-center justify-between text-[#777777]"
                            onClick={handleDropAdmin}
                        >
                            <div className="w-[90%] h-full hover:text-[0.90rem] transition-all hover:text-[#0e4152] flex items-center gap-4 font-bold px-2 ">
                                <FaUser className="w-5 h-5 " />
                                <p className="">Administrator(s)</p>
                            </div>
                            <div
                                className={`w-8 h-full  flex items-center transition-all duration-700 justify-center ${
                                    dropAdmin ? "transform -rotate-180" : ""
                                }`}
                            >
                                <FaCaretDown />
                            </div>
                        </div>
                        <div
                            className={`w-full h-max flex flex-col cursor-pointer text-sm gap-2 text-[#777777] ${
                                dropAdmin
                                    ? "w-full max-h-[9rem] overflow-hidden transition-max-h duration-700 ease-in-out "
                                    : "max-h-0 transition-max-h duration-700 pointer-events-none overflow-hidden opacity-0"
                            }`}
                        >
                            <NavLink
                                to={"/admin/dashboard/add-manager"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Manager Wallet</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/manage-admin"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full h-12  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Add Admin Wallet(s)</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    {/* <div className="w-full h-max flex flex-col gap-2 ">
                        <div
                            className="w-full h-12 text-sm flex cursor-pointer transition-all  items-center justify-between text-[#777777]"
                            onClick={handleDropSetting}
                        >
                            <div className="w-full h-full hover:text-[0.90rem] transition-all hover:text-[#0e4152] flex items-center gap-4 font-bold px-2 ">
                                <FaCog className="w-5 h-5" />
                                <p className="">Settings</p>
                            </div>
                            <div
                                className={`w-8 h-full  flex items-center transition-all duration-700 justify-center ${
                                    dropSetting ? "transform -rotate-180" : ""
                                }`}
                            >
                                <FaCaretDown />
                            </div>
                        </div>
                        <div
                            className={`w-full h-max flex flex-col cursor-pointer text-sm gap-2 text-[#777777] ${
                                dropSetting
                                    ? "w-full max-h-[21rem] overflow-hidden transition-max-h duration-700 ease-in-out "
                                    : "max-h-0 transition-max-h duration-700 pointer-events-none overflow-hidden opacity-0"
                            }`}
                        >
                            <NavLink
                                to={"/admin/dashboard/app-settings"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all text-sm hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">App Settings</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/referral-settings"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Referrals/Bonus Settings</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/payment-settings"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Payment Settings</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/manage-crypto-assets"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Swap Settings</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/frontpage"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Frontend Settings</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/privacy-policy"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Terms and Privacy</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/admin/dashboard/ipaddress"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Ip Blacklist</p>
                                </div>
                            </NavLink>
                        </div>
                    </div> */}
                    <NavLink
                        to={"/admin/dashboard/platform"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                        }
                    >
                        <div className="w-full h-12 text-sm cursor-pointer hover:text-[0.90rem] transition-all rounded-md flex items-center gap-4 font-bold px-2 ">
                            <FaInfoCircle className="w-5 h-5" />
                            <p className="">Platform</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default SideNavMobile;
