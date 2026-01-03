import { GoMail } from "react-icons/go";
import { IoWallet, IoAdd, IoCheckmarkCircle } from "react-icons/io5";
import { FaWallet, FaBitcoin } from "react-icons/fa";
import "./AddManager.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [coin, setCoin] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const token = JSON.parse(localStorage.getItem("adminData"))?.token;

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!walletName.trim()) {
      newErrors.walletName = "Wallet name is required";
    } else if (walletName.length < 2) {
      newErrors.walletName = "Wallet name must be at least 2 characters";
    }

    if (!coin.trim()) {
      newErrors.coin = "Coin name is required";
    } else if (coin.length < 2) {
      newErrors.coin = "Coin name must be at least 2 characters";
    }

    if (!walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    } else if (walletAddress.length < 10) {
      newErrors.walletAddress = "Please enter a valid wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddWallet = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    const toastLoadingId = toast.loading("Adding wallet...");

    try {
      const url = `https://yaticare-backend.onrender.com/api/admin/createWalletAddress`;
      const data = {
        walletName: walletName.trim(),
        walletAddress: walletAddress.trim(),
        coin: coin.trim(),
      };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss(toastLoadingId);
      toast.success("Wallet address added successfully!");
      setSuccessMessage("Wallet has been added successfully to your account.");

      // Clear inputs and errors
      setWalletName("");
      setWalletAddress("");
      setCoin("");
      setErrors({});

      console.log("Wallet added:", response.data);
    } catch (error) {
      console.error("Add Wallet Error:", error);
      toast.dismiss(toastLoadingId);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add wallet. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    setSuccessMessage("");

    switch (field) {
      case "walletName":
        setWalletName(value);
        break;
      case "coin":
        setCoin(value);
        break;
      case "walletAddress":
        setWalletAddress(value);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <IoWallet className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Add New Wallet
            </h1>
          </div>
          <p className="text-gray-600">
            Add a new wallet address to your admin account for managing
            transactions
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 text-sm">{successMessage}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              AddWallet();
            }}
          >
            {/* Wallet Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaWallet className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter wallet name (e.g., Main Bitcoin Wallet)"
                  value={walletName}
                  onChange={(e) =>
                    handleInputChange("walletName", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.walletName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.walletName && (
                <p className="mt-1 text-sm text-red-600">{errors.walletName}</p>
              )}
            </div>

            {/* Coin Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coin/Currency Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBitcoin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter coin name (e.g., Bitcoin, Ethereum, USDT)"
                  value={coin}
                  onChange={(e) => handleInputChange("coin", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.coin
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.coin && (
                <p className="mt-1 text-sm text-red-600">{errors.coin}</p>
              )}
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoWallet className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter the complete wallet address"
                  value={walletAddress}
                  onChange={(e) =>
                    handleInputChange("walletAddress", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-sm ${
                    errors.walletAddress
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.walletAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.walletAddress}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Make sure to double-check the wallet address for accuracy
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding Wallet...
                  </>
                ) : (
                  <>
                    <IoAdd className="w-4 h-4" />
                    Add Wallet Address
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Important Notes:
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>
                • Ensure the wallet address is correct and belongs to the
                specified coin/currency
              </li>
              <li>• Double-check all information before submitting</li>
              <li>• This wallet will be used for receiving transactions</li>
              <li>
                • You can manage all wallets from the wallet management page
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
