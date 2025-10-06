import "./Transactions.css";
import {FaDownload, FaArrowAltCircleUp} from "react-icons/fa";
import {LuArrowRightFromLine} from "react-icons/lu";
import {FaArrowUpLong, FaArrowDownLong} from "react-icons/fa6";

const ActiveInvestment = () => {
    return (
        <>
            <div className=" w-full h-max px-6 py-10 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                <h1 className="text-[27px] font-semibold">
                    Active user investment
                </h1>
                <div className="w-full h-max flex flex-col bg-white p-6">
                    <div className="TransactionContentResult">
                        <>
                            <div className="TransactionContentResultA">
                                <div className="w-max flex ">
                                    <div
                                        className={`py-2 px-3 phone:px-2 hover:bg-[#837dde] bg-[#6861ce] text-white cursor-pointer`}
                                    >
                                        <p>Copy</p>
                                    </div>
                                    <div
                                        className={`py-2 px-3 phone:px-2 hover:bg-[#837dde] bg-[#6861ce] text-white cursor-pointer`}
                                    >
                                        <p>CSV</p>
                                    </div>
                                    <div
                                        className={`py-2 px-3 phone:px-2 hover:bg-[#837dde] bg-[#6861ce] text-white cursor-pointer`}
                                    >
                                        <p>Print</p>
                                    </div>
                                </div>
                                <div className="TransactionContentResultARight">
                                    <p>Search</p>
                                    <input type="search" />
                                </div>
                            </div>
                            <div className="TransactionContentResultB">
                                <div className="TransactionContentResultB4">
                                    Client name
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                    Plan
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                    Amount invested
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                    Duration
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                    ROI
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                    Sart date
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                                <div className="TransactionContentResultB4">
                                   Expiration date
                                    <span>
                                        <FaArrowUpLong /> <FaArrowDownLong />
                                    </span>
                                </div>
                            </div>
                            <div className="TransactionContentResultC">
                                <div className="TransactionContentResultCItem">
                                    <div className="TransactionContentResultC1">
                                        $2000
                                    </div>
                                    <div className="TransactionContentResultC2">
                                        BITCOIN PAYMENT
                                    </div>
                                    <div className="TransactionContentResultC3">
                                        <span>Pending</span>
                                    </div>
                                    <div className="TransactionContentResultC3">
                                        <span>Pending</span>
                                    </div>
                                    <div className="TransactionContentResultC3">
                                        <span>Pending</span>
                                    </div>
                                    <div className="TransactionContentResultC3">
                                        <span>Pending</span>
                                    </div>
                                    <div className="TransactionContentResultC4">
                                        Thu, Nov 23, 2023 4:03 AM
                                    </div>
                                </div>
                            </div>
                            <div className="TransactionContentResultD">
                                <div className="TransactionContentResultDLeft">
                                    Showing 1 &nbsp; <p> to 1 &nbsp;</p> of 1
                                    entries
                                </div>
                                <div className="TransactionContentResultDRight">
                                    <div className="TransactionContentResultDRightBtn1">
                                        Previous
                                    </div>
                                    <div className="TransactionContentResultDRightBtn2">
                                        1
                                    </div>
                                    <div className="TransactionContentResultDRightBtn3">
                                        Next
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveInvestment;
