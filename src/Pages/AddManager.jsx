import { useEffect, useState, useMemo } from "react";
import "./AddManager.css";
import axios from "axios";
import toast from "react-hot-toast";
import {
  IoSearch,
  IoWallet,
  IoTrash,
  IoFilter,
  IoCalendar,
} from "react-icons/io5";
import { FaCopy } from "react-icons/fa";

const AddManager = () => {
  const [adminWallet, setAdminWaller] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("adminData"))?.token;

  const getallWalletAddress = async () => {
    try {
      setLoading(true);
      const url =
        "https://yaticare-backend.onrender.com/api/admin/getallWalletAddress";
      const response = await axios.get(url);
      setAdminWaller(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch wallet addresses");
      setAdminWaller([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort wallets
  const filteredAndSortedWallets = useMemo(() => {
    let filtered = adminWallet.filter((wallet) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        wallet?.walletName?.toLowerCase().includes(searchLower) ||
        wallet?.walletAddress?.toLowerCase().includes(searchLower);

      // Add date filtering if dates are provided
      let matchesDate = true;
      if (fromDate || toDate) {
        const walletDate = new Date(wallet.createdAt || wallet.updatedAt);
        if (fromDate) {
          matchesDate = matchesDate && walletDate >= new Date(fromDate);
        }
        if (toDate) {
          matchesDate = matchesDate && walletDate <= new Date(toDate);
        }
      }

      return matchesSearch && matchesDate;
    });

    // Sort wallets
    filtered.sort((a, b) => {
      const aValue = a.walletName || "";
      const bValue = b.walletName || "";

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [adminWallet, searchTerm, statusFilter, sortOrder, fromDate, toDate]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedWallets.length / itemsPerPage);
  const paginatedWallets = filteredAndSortedWallets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    getallWalletAddress();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortOrder, itemsPerPage, fromDate, toDate]);

  const handleDelete = async (walletId) => {
    const toastLoadingId = toast.loading("Deleting wallet...");
    try {
      const url = `https://yaticare-backend.onrender.com/api/admin/deleteWalletAddress/${walletId}`;
      await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      toast.dismiss(toastLoadingId);
      toast.success("Wallet deleted successfully");
      getallWalletAddress(); // Refresh the list
    } catch (error) {
      toast.dismiss(toastLoadingId);
      toast.error("Failed to delete wallet");
      console.log(error);
    }
  };

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
            Wallet Management
          </h1>
          <p className="text-gray-600">
            Manage admin wallet addresses for transactions
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Total Wallets
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {adminWallet.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Active Wallets
            </div>
            <div className="text-2xl font-bold text-green-600">
              {adminWallet.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              Filtered Results
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {filteredAndSortedWallets.length}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Search and Filters */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="search"
                    placeholder="Search by wallet name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Items per page */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Show
                </label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <div className="relative">
                  <IoCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <div className="relative">
                  <IoCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
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
                      Wallet Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wallet Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedWallets.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        {searchTerm || fromDate || toDate
                          ? "No wallets found matching your criteria."
                          : "No wallets available."}
                      </td>
                    </tr>
                  ) : (
                    paginatedWallets.map((wallet) => (
                      <tr
                        key={wallet._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IoWallet className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {wallet?.walletName || "Unnamed Wallet"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {wallet._id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded"
                              title={wallet.walletAddress}
                            >
                              {wallet.walletAddress?.slice(0, 10)}...
                              {wallet.walletAddress?.slice(-8)}
                            </span>
                            <button
                              onClick={() => copyAddress(wallet.walletAddress)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              title="Copy address"
                            >
                              <FaCopy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDelete(wallet._id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm font-medium"
                          >
                            <IoTrash className="w-3 h-3" />
                            Delete
                          </button>
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
              <div className="text-sm text-gray-600">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredAndSortedWallets.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedWallets.length
                )}{" "}
                of {filteredAndSortedWallets.length} wallets
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
                <span className="px-3 py-1 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
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
    </div>
  );
};

export default AddManager;
