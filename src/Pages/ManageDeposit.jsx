import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import { Image } from "antd";
import {
  IoSearch,
  IoEye,
  IoCheckmark,
  IoTrash,
  IoFilter,
} from "react-icons/io5";

const ManageDeposit = () => {
  const [userData, setUserData] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDepositId, setSelectedDepositId] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("depositDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const token = JSON.parse(localStorage.getItem("adminData"))?.token;

  const acceptDeposit = async (depositId) => {
    try {
      setApproveLoading(true);
      const url = `https://yaticare-backend.onrender.com/api/admin/approve/${depositId}`;
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
      setAcceptModalVisible(false);
      getallDeposit();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setApproveLoading(false);
    }
  };

  const deleteDeposit = async (depositId) => {
    try {
      setDeleteLoading(true);
      const url = `https://yaticare-backend.onrender.com/api/admin/deletedeposit/${depositId}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setDeleteModalVisible(false);
      getallDeposit();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setDeleteLoading(false);
    }
  };

  const getallDeposit = async () => {
    try {
      setLoading(true);
      const url = "https://yaticare-backend.onrender.com/api/admin/alldeposits";
      const response = await axios.get(url);
      setUserData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching deposits:", error);
      toast.error("Failed to fetch deposits");
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort deposits
  const filteredAndSortedDeposits = useMemo(() => {
    let filtered = userData.filter((deposit) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        deposit?.user?.userName?.toLowerCase().includes(searchLower) ||
        deposit?._id?.toLowerCase().includes(searchLower) ||
        deposit?.depositWallet?.toLowerCase().includes(searchLower) ||
        deposit?.PaymentType?.toLowerCase().includes(searchLower) ||
        deposit?.amount?.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || deposit?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort deposits
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "amount":
          aValue = parseFloat(a.amount) || 0;
          bValue = parseFloat(b.amount) || 0;
          break;
        case "depositDate":
          aValue = new Date(a.depositDate);
          bValue = new Date(b.depositDate);
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
          aValue = new Date(a.depositDate);
          bValue = new Date(b.depositDate);
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
  const totalPages = Math.ceil(filteredAndSortedDeposits.length / itemsPerPage);
  const paginatedDeposits = filteredAndSortedDeposits.slice(
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
    getallDeposit();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, sortOrder, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Deposit Management
          </h1>
          <p className="text-gray-600">Monitor and manage client deposits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Total Deposits
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userData.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {userData.filter((d) => d.status === "pending").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Approved</div>
            <div className="text-2xl font-bold text-green-600">
              {userData.filter((d) => d.status === "approved").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Total Amount
            </div>
            <div className="text-2xl font-bold text-blue-600">
              $
              {userData
                .reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0)
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
                  placeholder="Search by client, transaction ID, wallet..."
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
                  <option value="depositDate">Sort by Date</option>
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
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Wallet Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proof
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDeposits.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        {searchTerm || statusFilter !== "all"
                          ? "No deposits found matching your criteria."
                          : "No deposits available."}
                      </td>
                    </tr>
                  ) : (
                    paginatedDeposits.map((deposit) => (
                      <tr
                        key={deposit._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {deposit?.user === null ? (
                              <span className="text-red-500 italic">
                                Deleted User
                              </span>
                            ) : (
                              deposit?.user?.userName || "N/A"
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 font-mono break-all">
                            {deposit._id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="text-sm text-gray-900 break-all max-w-xs">
                            {deposit.depositWallet?.slice(0, 20)}...
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-semibold text-green-600">
                            ${parseFloat(deposit.amount || 0).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-900">
                            {deposit.PaymentType || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {deposit.proofFile ? (
                            <button
                              onClick={() => {
                                setSelectedImage(deposit.proofFile);
                                setImageModalVisible(true);
                              }}
                              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                            >
                              <IoEye className="w-3 h-3" />
                              View
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No proof
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              deposit.status
                            )}`}
                          >
                            {deposit.status?.charAt(0).toUpperCase() +
                              deposit.status?.slice(1) || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden xl:table-cell">
                          <div className="text-sm text-gray-500">
                            {formatDate(deposit.depositDate)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            {deposit.status === "pending" && (
                              <button
                                onClick={() => {
                                  setSelectedDepositId(deposit._id);
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
                                setSelectedDepositId(deposit._id);
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
                    filteredAndSortedDeposits.length
                  )}{" "}
                  to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredAndSortedDeposits.length
                  )}{" "}
                  of {filteredAndSortedDeposits.length} deposits
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

      {/* Image Modal */}
      <Modal
        open={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={null}
        title="Proof of Payment"
        width={600}
      >
        <div className="flex justify-center">
          <Image
            src={selectedImage}
            alt="Proof of payment"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </div>
      </Modal>

      {/* Accept Modal */}
      <Modal
        open={acceptModalVisible}
        onOk={() => acceptDeposit(selectedDepositId)}
        onCancel={() => setAcceptModalVisible(false)}
        okButtonProps={{
          loading: approveLoading,
          className: "bg-green-600 hover:bg-green-700 border-green-600",
        }}
        okText={approveLoading ? "Processing..." : "Yes, Approve"}
        title={
          <div className="flex items-center gap-2 text-green-700">
            <IoCheckmark className="w-5 h-5" />
            Approve Deposit
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to approve this deposit? This action will
            credit the amount to the user's account.
          </p>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalVisible}
        onOk={() => deleteDeposit(selectedDepositId)}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{
          loading: deleteLoading,
          className: "bg-red-600 hover:bg-red-700 border-red-600",
        }}
        okText={deleteLoading ? "Processing..." : "Yes, Delete"}
        title={
          <div className="flex items-center gap-2 text-red-700">
            <IoTrash className="w-5 h-5" />
            Delete Deposit
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete this deposit? This action cannot be
            undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageDeposit;
