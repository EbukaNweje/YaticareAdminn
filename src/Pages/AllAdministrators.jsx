import { useEffect, useState } from "react";
import "./AddManager.css";
import axios from "axios";
import toast from "react-hot-toast";

const AllAdministrators = () => {
  const [adminData, setAdminData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const getAllAdmin = async () => {
    try {
      const url = "https://yaticare-backend.onrender.com/api/admin/getadmins";
      const response = await axios.get(url);
      setAdminData(response?.data?.admins || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  const filteredAdmins = adminData.filter(
    (admin) =>
      admin?.email?.toLowerCase().includes(search.toLowerCase()) &&
      (status === "all" || (status === "super" ? admin.super : !admin.super))
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
    </div>
  );
};

export default AllAdministrators;
