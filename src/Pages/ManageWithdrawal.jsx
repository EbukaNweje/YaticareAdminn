import { FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
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
  const token = JSON.parse(localStorage.getItem("adminData")).token;

  const acceptWithdrawal = (withdrawId) => {
    setApproveLoading(true);
    const url = `https://yaticare-backend.onrender.com/api/admin/approvewithdrawal/${withdrawId}`;
    axios
      .put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        toast.success(response.data.message);
        getallWithdrawal(); // Refresh list
        setAcceptModalVisible(false);
      })
      .catch((error) => {
        setApproveLoading(false);
        console.log("error", error);
        toast.error(error?.response?.data?.message || "An error occurred");
      });
  };

  const deleteWithdrawal = (withdrawId) => {
    setDeleteLoading(true);
    const url = `https://yaticare-backend.onrender.com/api/admin/deletewithdrawal/${withdrawId}`;
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        getallWithdrawal(); // Refresh list
        setDeleteModalVisible(false);
      })
      .catch((error) => {
        setDeleteLoading(false);
        toast.error(error?.response?.data?.message || "An error occurred");
      });
  };

  const getallWithdrawal = () => {
    const url = "https://yaticare-back-end.vercel.app/api/admin/allwithdrawals";
    axios
      .get(url)
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch withdrawals");
      });
  };

  useEffect(() => {
    getallWithdrawal();
  }, []);

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <>
      <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
        <p className="text-[27px] font-semibold text-[rgb(87,89,98)]">
          Manage clients Withdrawal
        </p>
        <div className="w-full h-max bg-white shadow p-5">
          {/* Filters omitted for brevity */}

          <div className="overflow-y-auto">
            <div className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]">
              <div className="w-24 phone:w-36 h-max">Client</div>
              <div className="w-36 phone:w-48 h-max">Amount</div>
              <div className="w-36 h-max">Withdraw Method</div>
              <div className="w-36 h-max">Withdraw Address</div>
              <div className="w-36 h-max">Status</div>
              <div className="w-36 h-max">Date</div>
              <div className="w-36 h-max opacity-0">Actions</div>
            </div>

            {userData.map((props) => (
              <div
                className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]"
                key={props._id}
              >
                <div
                  className="w-24 phone:w-36 h-max"
                  style={{ color: props?.user === null ? "red" : "black" }}
                >
                  {props?.user === null ? "Deleted User" : props?.user.userName}
                </div>
                <div className="w-36 phone:w-48 h-max">{props.amount}</div>
                <div className="w-36 h-max">{props.method}</div>
                <div className="w-36 h-max flex items-center gap-1">
                  <span title={props.walletAddress}>
                    {props.walletAddress?.slice(0, 6)}...
                    {props.walletAddress?.slice(-4)}
                  </span>
                  <button
                    className="text-blue-500 underline text-xs"
                    onClick={() => copyAddress(props.walletAddress)}
                  >
                    Copy
                  </button>
                </div>
                <div className="w-36 h-max">
                  <p
                    className={`py-1 px-2 text-white w-max rounded-full text-xs ${
                      props?.status === "pending" ? "bg-[red]" : "bg-[#31ce36]"
                    }`}
                  >
                    {props.status}
                  </p>
                </div>
                <div className="w-36 h-max">{props.withdrawalDate}</div>
                <div className="w-36 h-max flex items-center gap-2">
                  <button
                    className="py-2 px-3 bg-[#48abf7] rounded text-white"
                    onClick={() => {
                      setSelectedWithdrawalId(props._id);
                      setAcceptModalVisible(true);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="p-2 bg-[#f25961] rounded text-xs text-white"
                    onClick={() => {
                      setSelectedWithdrawalId(props._id);
                      setDeleteModalVisible(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accept Modal */}
      <Modal
        open={acceptModalVisible}
        onOk={() => acceptWithdrawal(selectedWithdrawalId)}
        onCancel={() => setAcceptModalVisible(false)}
        okButtonProps={{
          className: "bg-[#0A503D] text-white",
          size: "middle",
          style: { backgroundColor: "#0e4152" },
        }}
        okText={approveLoading ? "Processing..." : "Yes, Accept"}
        closeIcon={true}
        title={"Accept Withdrawal"}
      >
        <p>Are you sure you want to approve this withdrawal?</p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalVisible}
        onOk={() => deleteWithdrawal(selectedWithdrawalId)}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{
          className: "bg-[#f25961] text-white",
          size: "middle",
          style: { backgroundColor: "#f25961" },
        }}
        okText={deleteLoading ? "Processing..." : "Yes, Delete"}
        closeIcon={true}
        title={"Delete Withdrawal"}
      >
        <p>Are you sure you want to delete this withdrawal?</p>
      </Modal>
    </>
  );
};

export default ManageWithdrawal;
