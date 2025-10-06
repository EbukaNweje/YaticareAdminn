import {FaArrowLeft} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const LoginActivity = () => {
    return (
        <>
            <>
                <div className="w-full h-max px-6 py-10 flex flex-col gap-4 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                    <div className="w-full flex justify-between">
                        <p className="text-2xl font-semibold">Jairo Arcila login activities</p>
                        <button className="py-2 px-3 flex gap-1 items-center text-xs bg-[#0e4152] text-white rounded">
                            <FaArrowLeft /> Back
                        </button>
                    </div>
                    <div className="w-full h-max">
                        <button className="py-2 px-3 flex gap-1 items-center text-xs bg-[#f25961] text-white rounded">
                            <MdDelete /> Clear Data
                        </button>
                    </div>
                    <div className="w-full h-max flex flex-col gap-2 p-4 bg-white">
                        <div className="w-full h-max flex justify-between">
                            <div className="w-max h-max flex items-center">
                                <button className="py-3 px-4 flex gap-1 items-center text-xs bg-[#6861ce] text-white ">Copy</button>
                                <button className="py-3 px-4 flex gap-1 items-center text-xs bg-[#6861ce] text-white ">CSV</button>
                                <button className="py-3 px-4 flex gap-1 items-center text-xs bg-[#6861ce] text-white ">Print</button>
                               
                            </div>
                            <div className="w-max h-max flex items-center">
                                <p>Search:</p>
                                <input type="search" className="border border-gray-300 rounded outline-sky-50 outline-1 outline-offset-1 pl-2"/>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <div className="">IP Address</div>
                                <div className="">Device/OS/Browser</div>
                                <div className="">Date/Time logged in</div>
                            </div>
                            <div className="">
                                <div className="">102.129.153.221 </div>
                                <div className="">Macintosh/OS X/Safari </div>
                                <div className="">
                                    Sat, Nov 25, 2023 4:12 PM
                                </div>
                            </div>
                            <div className="">
                                <div className="">102.129.153.221 </div>
                                <div className="">Macintosh/OS X/Safari </div>
                                <div className="">
                                    Sat, Nov 25, 2023 4:12 PM
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p>Showing 1 to 2 of 2 entries</p>
                            <div>
                                <button>Previous</button>
                                <p>1</p>
                                <button>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default LoginActivity;
