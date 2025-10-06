import {Outlet} from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import {useState} from "react";
import "./Component.css";
import SideNavMobile from "./SideNavMobile";

const AdminHome = () => {
    const [sideBar, setSideBar] = useState(false);

    const handleSideBar = () => {
        setSideBar(!sideBar);
        // console.log("Sidebar Opened");
    };

    return (
        <>
            <div className="w-full h-max phone:flex">
                <div
                    className={`phone:w-64 shadow-2xl phone:h-[100vh] bg-purple-300 hidden phone:block phone:overflow-y-auto z-10 fixed top-0 left-0 right-0 ${
                        sideBar ? "sidebar sideOpen" : "sidebar"
                    }`}
                >
                    <div className="phone:w-full phone:h-max flex-auto bg-lime-100">
                        <SideNavMobile />
                    </div>
                </div>
                <div
                    className={`w-full phone:w-full h-max bg-white ${
                        sideBar ? "main-panel" : "panelEase"
                    }`}
                >
                    <Header sideBar={handleSideBar} />
                    <div className="w-full h-max flex mt-16 phone:mt-0">
                        <SideNav />
                        <div className="w-[84%] phone:w-[100%] h-max flex flex-col overflow-y-auto shadow-lg">
                            <div className="h-[90.8vh] phone:h-[91.5vh] w-full bg-[#0e4152]">
                                <div className="w-full min-h-[76vh] phone:min-h-[78.5vh] h-max bg-[#f9fbfd]">
                                    <Outlet />
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome