import {FaPlus, FaTimes} from "react-icons/fa";
import {FaPen} from "react-icons/fa";

const InvestmentPlans = () => {
    return (
        <>
            <div className="w-full h-max px-6 py-10 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                <div className="w-full h-14  flex justify-between items-center">
                    <p className="text-3xl phone:text-2xl font-semibold">Investment Plans</p>
                    <button className="py-2 px-4 rounded bg-[#0e4152] flex items-center justify-center text-white gap-1">
                        <FaPlus />
                        New plan
                    </button>
                </div>
                <div className="w-ful h-max py-5 flex phone:flex-col phone:gap-8 justify-between ">
                    <div className="w-[31%] phone:w-full h-[83vh] px-12 py-14 flex flex-col justify-between items-center bg-white border border-gray-300 rounded">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="w-14 p-[0.10rem] bg-[#31ce36] rounded-full flex items-center justify-center text-white text-sm">active</div>
                            <p className="text-2xl text-[rgb(59,59,59)]">Deluxe Plan</p>
                        </div>
                        <div>
                            <p className="text-2xl text-[rgb(98,122,254)] flex items-center">
                                $ <span className="text-6xl">1,000,000</span>
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-3 text-sm text-[rgb(52,58,64)]">
                            <p className="w-full flex justify-between items-center">
                                Minimum Possible Deposit: <span>$510,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Possible Deposit:
                                <span>$1,000,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Minimum Return: <span>650%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Return: <span>1,100%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Gift Bonus: <span>$0</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Duration: <span>28 days</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#ffad46]">
                                <FaPen />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#f25961]">
                                <FaTimes />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded text-xs bg-[#0e4152]">Mark as inactive</button>
                        </div>
                    </div>
                    <div className="w-[31%] phone:w-full h-[83vh] px-12 py-14 flex flex-col justify-between items-center bg-white border border-gray-300 rounded">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="w-14 p-[0.10rem] bg-[#31ce36] rounded-full flex items-center justify-center text-white text-sm">active</div>
                            <p className="text-2xl text-[rgb(59,59,59)]">Premium Plan</p>
                        </div>
                        <div>
                            <p className="text-2xl text-[rgb(98,122,254)] flex items-center">
                                $ <span className="text-6xl">500,000</span>
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-3 text-sm text-[rgb(52,58,64)]">
                            <p className="w-full flex justify-between items-center">
                                Minimum Possible Deposit: <span>$110,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Possible Deposit:
                                <span>$500,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Minimum Return: <span>350%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Return: <span>600%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Gift Bonus: <span>$0</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Duration: <span>35 days</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#ffad46]">
                                <FaPen />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#f25961]">
                                <FaTimes />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded text-xs bg-[#0e4152]">Mark as inactive</button>
                        </div>
                    </div>
                    <div className="w-[31%] phone:w-full h-[83vh] px-12 py-14 flex flex-col justify-between items-center bg-white border border-gray-300 rounded">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="w-14 p-[0.10rem] bg-[#31ce36] rounded-full flex items-center justify-center text-white text-sm">active</div>
                            <p className="text-2xl text-[rgb(59,59,59)]">Starter Plan</p>
                        </div>
                        <div>
                            <p className="text-2xl text-[rgb(98,122,254)] flex items-center">
                                $ <span className="text-6xl">100,000</span>
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-3 text-sm text-[rgb(52,58,64)]">
                            <p className="w-full flex justify-between items-center">
                                Minimum Possible Deposit: <span>$10,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Possible Deposit:
                                <span>$100,000</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Minimum Return: <span>200%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Maximum Return: <span>350%</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Gift Bonus: <span>$0</span>
                            </p>
                            <p className="w-full flex justify-between items-center">
                                Duration: <span>42 days</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#ffad46]">
                                <FaPen />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded bg-[#f25961]">
                                <FaTimes />
                            </button>
                            <button className="px-3 py-2 flex items-center justify-center text-white rounded text-xs bg-[#0e4152]">Mark as inactive</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default InvestmentPlans;
