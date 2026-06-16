import { useEffect, useState } from "react";
import "./AddManager.css";
import axios from "axios";
import toast from "react-hot-toast";

const AllAdministrators = () => {
  const [adminData, setAdminData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [giftOptions, setGiftOptions] = useState([]);
  const [newGiftTitle, setNewGiftTitle] = useState("");
  const [creatingGift, setCreatingGift] = useState(false);

  const token = localStorage.getItem("adminToken");

  const getAllAdmin = async () => {
    try {
      const url = "https://yaticare-backend.onrender.com/api/admin/getadmins";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setAdminData(response?.data?.admins || []);
    } catch (error) {
      toast.error("Failed to fetch admins");
    }
  };

  const getGiftOptions = async () => {
    try {
      const url =
        "https://yaticare-backend.onrender.com/api/admin/gift-options";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setGiftOptions(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch gift options");
    }
  };

  const handleCreateGiftOption = async () => {
    if (!newGiftTitle.trim()) {
      toast.error("Title is required");
      return;
    }

    if (creatingGift) {
      return;
    }

    setCreatingGift(true);
    try {
      const url =
        "https://yaticare-backend.onrender.com/api/admin/create-gift-option";
      await axios.post(
        url,
        {
          title: newGiftTitle.trim(),
          amount: 1,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        },
      );
      toast.success("Gift option created successfully");
      setNewGiftTitle("");
      getGiftOptions();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create gift option",
      );
    } finally {
      setCreatingGift(false);
    }
  };

  const handleDeleteGiftOption = async (optionId) => {
    try {
      const url = `https://yaticare-backend.onrender.com/api/admin/delete-gift-option/${optionId}`;
      await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      toast.success("Gift option deleted successfully");
      getGiftOptions();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete gift option",
      );
    }
  };

  useEffect(() => {
    getAllAdmin();
    getGiftOptions();
  }, []);

  const filteredAdmins = adminData.filter(
    (admin) =>
      admin?.email?.toLowerCase().includes(search.toLowerCase()) &&
      (status === "all" || (status === "super" ? admin.super : !admin.super)),
  );

  return (
    <div className="all-admin-container">
      <h2 className="admin-title">All Administrators</h2>

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-item">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="super">Super Admin</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div className="col">Email</div>
          <div className="col">Role</div>
          <div className="col actions">Actions</div>
        </div>

        {filteredAdmins.length === 0 ? (
          <p className="no-data">No admins found.</p>
        ) : (
          filteredAdmins.map((admin) => (
            <div className="admin-table-row" key={admin._id}>
              <div className="col">{admin.email}</div>
              <div className="col">{admin.super ? "Super Admin" : "Admin"}</div>
              <div className="col actions">
                {/* <button className="delete-btn" onClick={() => handleDelete(admin._id)}>Delete</button> */}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="gift-options-section mt-8">
        <h2 className="admin-title">Gift Options</h2>

        <div className="admin-filters grid gap-4 md:grid-cols-1">
          <div className="filter-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="Gift title"
              value={newGiftTitle}
              onChange={(e) => setNewGiftTitle(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`px-4 py-2 rounded-lg mt-4 text-white ${
            creatingGift
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleCreateGiftOption}
          disabled={creatingGift}
        >
          {creatingGift ? "Adding..." : "Add Gift Option"}
        </button>

        <div className="admin-table-wrapper mt-6">
          <div className="admin-table-header">
            <div className="col">Title</div>
            <div className="col actions">Actions</div>
          </div>

          {giftOptions.length === 0 ? (
            <p className="no-data">No gift options available.</p>
          ) : (
            giftOptions.map((option) => (
              <div className="admin-table-row" key={option._id || option.id}>
                <div className="col">{option.title}</div>
                <div className="col actions">
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteGiftOption(option._id || option.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAdministrators;
