import { FaEye, FaCopy } from "react-icons/fa";
import {
  IoSearch,
  IoCheckmark,
  IoTrash,
  IoFilter,
  IoWallet,
} from "react-icons/io5";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "antd";

const ManageWithdrawal = () => {
  const [userData, setUserData] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedWithdrawalId, setSelectedWithdrawalId] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("withdrawalDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const token = JSON.parse(localStorage.getItem("adminData"))?.token;

  const acceptWithdrawal = async (withdrawId) => {
    try {
      setApproveLoading(true);
      const url = `https://yaticare-backend.onrender.com/api/admin/approvewithdrawal/${withdrawId}`;
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      getallWithdrawal();
      setAcceptModalVisible(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setApproveLoading(false);
    }
  };

  const deleteWithdrawal = async (withdrawId) => {
    try {
      setDeleteLoading(true);
      const url = `https://yaticare-backend.onrender.com/api/admin/deletewithdrawal/${withdrawId}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      getallWithdrawal();
      setDeleteModalVisible(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setDeleteLoading(false);
    }
  };

  const getallWithdrawal = async () => {
    try {
      setLoading(true);
      const url =
        "https://yaticare-backend.onrender.com/api/admin/allwithdrawals";
      const response = await axios.get(url);
      setUserData(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch withdrawals");
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort withdrawals
  const filteredAndSortedWithdrawals = useMemo(() => {
    let filtered = userData.filter((withdrawal) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        withdrawal?.user?.userName?.toLowerCase().includes(searchLower) ||
        withdrawal?.method?.toLowerCase().includes(searchLower) ||
        withdrawal?.walletAddress?.toLowerCase().includes(searchLower) ||
        withdrawal?.amount?.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || withdrawal?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort withdrawals
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "amount":
          aValue = parseFloat(a.amount) || 0;
          bValue = parseFloat(b.amount) || 0;
          break;
        case "withdrawalDate":
          aValue = new Date(a.withdrawalDate);
          bValue = new Date(b.withdrawalDate);
          break;
        case "status":
          aValue = a.status || "";
          bValue = b.status || "";
          break;
        case "userName":
          aValue = a.user?.userName || "";
          bValue = b.user?.userName || "";
          break;
        default:
          aValue = new Date(a.withdrawalDate);
          bValue = new Date(b.withdrawalDate);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [userData, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedWithdrawals.length / itemsPerPage
  );
  const paginatedWithdrawals = filteredAndSortedWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    getallWithdrawal();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, sortOrder, itemsPerPage]);

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Withdrawal Management
          </h1>
          <p className="text-gray-600">Monitor and manage client withdrawals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Total Withdrawals
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userData.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {userData.filter((w) => w.status === "pending").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Approved</div>
            <div className="text-2xl font-bold text-green-600">
              {userData.filter((w) => w.status === "approved").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Total Amount
            </div>
            <div className="text-2xl font-bold text-red-600">
              $
              {userData
                .reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0)
                .toLocaleString()}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Search and Filters */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="search"
                  placeholder="Search by client, method, wallet address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <IoFilter className="w-4 h-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="withdrawalDate">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                  <option value="userName">Sort by Client</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wallet Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedWithdrawals.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        {searchTerm || statusFilter !== "all"
                          ? "No withdrawals found matching your criteria."
                          : "No withdrawals available."}
                      </td>
                    </tr>
                  ) : (
                    paginatedWithdrawals.map((withdrawal) => (
                      <tr
                        key={withdrawal._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {withdrawal?.user === null ? (
                              <span className="text-red-500 italic">
                                Deleted User
                              </span>
                            ) : (
                              withdrawal?.user?.userName || "N/A"
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-semibold text-red-600">
                            $
                            {parseFloat(
                              withdrawal.amount || 0
                            ).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <IoWallet className="w-3 h-3 text-gray-400" />
                            {withdrawal.method || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm text-gray-900 font-mono"
                              title={withdrawal.walletAddress}
                            >
                              {withdrawal.walletAddress?.slice(0, 6)}...
                              {withdrawal.walletAddress?.slice(-4)}
                            </span>
                            <button
                              onClick={() =>
                                copyAddress(withdrawal.walletAddress)
                              }
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              title="Copy address"
                            >
                              <FaCopy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              withdrawal.status
                            )}`}
                          >
                            {withdrawal.status?.charAt(0).toUpperCase() +
                              withdrawal.status?.slice(1) || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-500">
                            {formatDate(withdrawal.withdrawalDate)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            {withdrawal.status === "pending" && (
                              <button
                                onClick={() => {
                                  setSelectedWithdrawalId(withdrawal._id);
                                  setAcceptModalVisible(true);
                                }}
                                className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                title="Approve"
                              >
                                <IoCheckmark className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedWithdrawalId(withdrawal._id);
                                setDeleteModalVisible(true);
                              }}
                              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                              title="Delete"
                            >
                              <IoTrash className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Show:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <span className="text-gray-600">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * itemsPerPage + 1,
                    filteredAndSortedWithdrawals.length
                  )}{" "}
                  to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredAndSortedWithdrawals.length
                  )}{" "}
                  of {filteredAndSortedWithdrawals.length} withdrawals
                </span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accept Modal */}
      <Modal
        open={acceptModalVisible}
        onOk={() => acceptWithdrawal(selectedWithdrawalId)}
        onCancel={() => setAcceptModalVisible(false)}
        okButtonProps={{
          loading: approveLoading,
          className: "bg-green-600 hover:bg-green-700 border-green-600",
        }}
        okText={approveLoading ? "Processing..." : "Yes, Approve"}
        title={
          <div className="flex items-center gap-2 text-green-700">
            <IoCheckmark className="w-5 h-5" />
            Approve Withdrawal
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to approve this withdrawal? This action will
            process the payment to the user's wallet.
          </p>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalVisible}
        onOk={() => deleteWithdrawal(selectedWithdrawalId)}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{
          loading: deleteLoading,
          className: "bg-red-600 hover:bg-red-700 border-red-600",
        }}
        okText={deleteLoading ? "Processing..." : "Yes, Delete"}
        title={
          <div className="flex items-center gap-2 text-red-700">
            <IoTrash className="w-5 h-5" />
            Delete Withdrawal
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete this withdrawal request? This action
            cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageWithdrawal;
