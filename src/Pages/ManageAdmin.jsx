import { GoMail } from "react-icons/go";
import "./AddManager.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [walletName, setWalletName] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [coin, setCoin] = useState();

  const AddWallet = () => {
    const url = `https://yaticare-back-end.vercel.app/api/createWalletAddress`;
    const toastLoadingId = toast.loading("Please wait...");

    const data = { walletName, walletAddress, coin };
    axios
      .post(url, data)
      .then((response) => {
        toast.dismiss(toastLoadingId);
        console.log(response);
        toast.success("Wallet Address Added successfully");
        setTimeout(() => {
          handleGetOneUserData();
        }, 1000);
        setShowActions(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Profile", error);
        setLoading(false);
      });
  };

  return (
    <div className="MainAddManager">
      <div className="w-full h-max flex flex-col gap-2">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Name
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Name"
            id="email"
            onChange={(e) => setWalletName(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="w-full h-max flex flex-col gap-2">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Coin Name
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Coin Name"
            id="email"
            onChange={(e) => setCoin(e.target.value)}
          />
        </div>
      </div>{" "}
      <br />
      <div className="w-full h-max flex flex-col gap-2">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Address
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Adddress"
            id="email"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
      </div>
      <br />
      <button
        className="w-full flex items-center justify-center py-3 rounded text-white bg-[#0e4152]"
        onClick={AddWallet}
      >
        {loading ? "Loading" : "Add Wallet"}
      </button>
    </div>
  );
};

export default ManageAdmin;
