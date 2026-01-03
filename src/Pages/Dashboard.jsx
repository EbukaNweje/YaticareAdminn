import { ImUsers } from "react-icons/im";
import {
  IoReceiptOutline,
  IoSearch,
  IoTrendingUp,
  IoTrendingDown,
} from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { MdOutlineAccessTime, MdDashboard } from "react-icons/md";
import { FaArrowRight, FaUsers, FaWallet, FaClock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { SimpleBarChart } from "./SimpleBarChart";
import { SimpleLineChart } from "./SimpleLineChart";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const Dashboard = () => {
  const loadAdminData = () => {
    const adminData = localStorage?.getItem("adminData");
    return adminData ? JSON?.parse(adminData) : {};
  };

  const [activeUser, setActiveUser] = useState(0);
  const [blockedUser, setBlockedUser] = useState(0);
  const [aciveSubscribers, setAciveSubscribers] = useState(0);
  const [totalDailyWithdrawal, setTotalDailyWithdrawals] = useState(0);
  const [totalDailyDeposit, setTotalDailyDeposits] = useState(0);
  const [totalPendingWithdrawal, setTotalPendingWithdrawals] = useState(0);
  const [totalPendingDeposit, settotalPendingDeposits] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  loadAdminData();

  const userData = localStorage?.getItem("allUserData")
    ? JSON.parse(localStorage?.getItem("allUserData"))
    : { data: [] };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!userData?.data) return [];

    return userData.data.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user?.fullName?.toLowerCase().includes(searchLower) ||
        user?.userName?.toLowerCase().includes(searchLower) ||
        user?.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [userData?.data, searchTerm]);

  const baseUrl = "https://yaticare-backend.onrender.com/api/admin/";

  const getAciveandBlockedUser = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totalblockedandactiveusers`);
      setActiveUser(data?.data?.activeCount || 0);
      setBlockedUser(data?.data?.blockedCount || 0);
    } catch (err) {
      console.log("Error fetching blocked and active users:", err);
    }
  };

  const getAciveSubscribers = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totalactivesubscribers`);
      setAciveSubscribers(data?.data?.activeSubscribersCount || 0);
    } catch (err) {
      console.log("Error fetching active subscribers:", err);
    }
  };

  const totalDailyWithdrawals = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totaldailywithdrawals`);
      setTotalDailyWithdrawals(data?.data?.totalAmount || 0);
    } catch (err) {
      console.log("Error fetching daily withdrawals:", err);
    }
  };

  const totalDailyDeposits = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totaldailydeposit`);
      setTotalDailyDeposits(data?.data?.totalAmount || 0);
    } catch (err) {
      console.log("Error fetching daily deposits:", err);
    }
  };

  const totalPendingWithdrawals = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totalpendingwithdrawals`);
      setTotalPendingWithdrawals(data?.data?.pendingCount || 0);
    } catch (err) {
      console.log("Error fetching pending withdrawals:", err);
    }
  };

  const totalPendingDeposits = async () => {
    try {
      const data = await axios.get(`${baseUrl}/totalpendingdeposits`);
      settotalPendingDeposits(data?.data?.pendingCount || 0);
    } catch (err) {
      console.log("Error fetching pending deposits:", err);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        getAciveandBlockedUser(),
        getAciveSubscribers(),
        totalDailyWithdrawals(),
        totalDailyDeposits(),
        totalPendingWithdrawals(),
        totalPendingDeposits(),
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <MdDashboard className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Welcome back, Admin!
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Monitor your platform's performance and manage operations
                efficiently.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <NavLink to="/admin/dashboard/manage-deposits">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                  <IoTrendingUp className="w-4 h-4" />
                  Deposits
                </button>
              </NavLink>
              <NavLink to="/admin/dashboard/manage-withdrawals">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                  <IoTrendingDown className="w-4 h-4" />
                  Withdrawals
                </button>
              </NavLink>
              <NavLink to="/admin/dashboard/manageusers">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                  <FaUsers className="w-4 h-4" />
                  Users
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading
                    ? "..."
                    : (userData?.data?.length || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {loading ? "..." : activeUser.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ImUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Daily Deposits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Daily Deposits
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ${loading ? "..." : (totalDailyDeposit || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IoTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Daily Withdrawals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Daily Withdrawals
                </p>
                <p className="text-3xl font-bold text-red-600">
                  $
                  {loading
                    ? "..."
                    : (totalDailyWithdrawal || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <IoTrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Subscribers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Active Subscribers
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {loading ? "..." : (aciveSubscribers || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <IoReceiptOutline className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Blocked Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Blocked Users
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {loading ? "..." : (blockedUser || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ImUsers className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Pending Deposits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Pending Deposits
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {loading
                    ? "..."
                    : (totalPendingDeposit || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Pending Withdrawals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Pending Withdrawals
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {loading
                    ? "..."
                    : (totalPendingWithdrawal || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaWallet className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Latest Users */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* User Statistics Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                User Statistics
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                2025
              </span>
            </div>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
              <SimpleLineChart />
            </div>
          </div>

          {/* Latest Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Latest Users
              </h2>
              <span className="text-sm text-gray-500">
                {filteredUsers.length} users
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? "No users found matching your search."
                    : "No users available."}
                </div>
              ) : (
                filteredUsers.slice(0, 10).map((user, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      nav(`/admin/dashboard/user-details/${user?._id}`)
                    }
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-300 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.fullName?.charAt(0)?.toUpperCase() ||
                          user?.userName?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {user?.fullName || user?.userName || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-32">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <FaArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Transactions Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Transaction Overview
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Deposits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Withdrawals</span>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <SimpleBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
