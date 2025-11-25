import { GoMail } from "react-icons/go";
import "./AddManager.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [coin, setCoin] = useState("");
  const token = JSON.parse(localStorage.getItem("adminData"))?.token;

  const AddWallet = async () => {
    if (!walletName || !walletAddress || !coin) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const toastLoadingId = toast.loading("Please wait...");

    try {
      const url = `https://yaticare-backend.onrender.com/api/admin/createWalletAddress`;
      const data = { walletName, walletAddress, coin };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss(toastLoadingId);
      toast.success("Wallet Address Added successfully");
      console.log("Wallet added:", response.data);

      // Clear inputs
      setWalletName("");
      setWalletAddress("");
      setCoin("");
    } catch (error) {
      console.error("Add Wallet Error:", error);
      toast.dismiss(toastLoadingId);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while adding wallet");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="MainAddManager">
      {/* Wallet Name */}
      <div className="w-full h-max flex flex-col gap-2">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Name{" "}
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Name"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
          />
        </div>
      </div>

      {/* Wallet Coin */}
      <div className="w-full h-max flex flex-col gap-2 mt-4">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Coin Name{" "}
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Coin Name"
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
          />
        </div>
      </div>

      {/* Wallet Address */}
      <div className="w-full h-max flex flex-col gap-2 mt-4">
        <p className="text-[rgb(14,65,82)] flex gap-1 items-center font-bold text-sm">
          Your Wallet Address{" "}
          <span className="text-red-700 flex items-center">*</span>
        </p>
        <div className="w-full h-10 border border-solid border-[rgb(210,228,236)] rounded-md flex items-center px-4 gap-4 text-[0.80rem]">
          <GoMail />
          <input
            className="border-none outline-none w-[90%] h-full"
            type="text"
            placeholder="Add Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full flex items-center justify-center py-3 mt-6 rounded text-white bg-[#0e4152]"
        onClick={AddWallet}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Wallet"}
      </button>
    </div>
  );
};

export default ManageAdmin;
