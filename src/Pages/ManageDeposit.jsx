import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import { Image } from "antd";

const ManageDeposit = () => {
  const [userData, setUserData] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDepositId, setSelectedDepositId] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      const url = "https://yaticare-backend.onrender.com/api/admin/alldeposits";
      const response = await axios.get(url);
      setUserData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  };

  useEffect(() => {
    getallDeposit();
  }, []);

  return (
    <>
      <div className="w-full px-4 py-8 bg-[#f9fbfd] text-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Manage Clients Deposits</h2>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="min-w-[1500px]">
            {/* Header Row */}
            <div className="flex font-semibold border-b border-gray-200 px-4 py-3 bg-gray-50 text-sm">
              <div className="min-w-[140px]">Client</div>
              <div className="min-w-[200px]">Transaction ID</div>
              <div className="min-w-[200px]">Deposit Wallet</div>
              <div className="min-w-[200px]">Coin Type</div>
              <div className="min-w-[140px]">Amount</div>
              <div className="min-w-[140px]">Method</div>
              <div className="min-w-[140px]">Proof of Payment</div>
              <div className="min-w-[120px]">Status</div>
              <div className="min-w-[160px]">Date</div>
              <div className="min-w-[180px]">Actions</div>
            </div>

            {/* Data Rows */}
            {userData.length > 0 ? (
              userData.map((props) => (
                <div
                  key={props._id}
                  className="flex items-center border-b border-gray-100 px-4 py-3 text-sm"
                >
                  <div className="min-w-[140px] text-ellipsis overflow-hidden">
                    {props?.user === null ? (
                      <span className="text-red-500">Deleted User</span>
                    ) : (
                      props?.user.userName
                    )}
                  </div>
                  <div className="min-w-[200px] break-all">{props._id}</div>
                  <div className="min-w-[200px] break-all">
                    {props.depositWallet}
                  </div>
                  <div className="min-w-[200px] break-all">
                    {props.depositWallet}
                  </div>
                  <div className="min-w-[140px]">${props.amount}</div>
                  <div className="min-w-[140px]">{props.PaymentType}</div>
                  <div className="min-w-[fit] break-all  p-2">
                    <Image width={100} src={props.proofFile} />
                  </div>
                  <div className="min-w-[120px]">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        props.status === "pending"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {props.status}
                    </span>
                  </div>
                  <div className="min-w-[160px]">{props.depositDate}</div>
                  <div className="min-w-[180px] flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                      onClick={() => {
                        setSelectedDepositId(props._id);
                        setAcceptModalVisible(true);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                      onClick={() => {
                        setSelectedDepositId(props._id);
                        setDeleteModalVisible(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">No deposit found</p>
            )}
          </div>
        </div>
      </div>

      {/* Accept Modal */}
      <Modal
        open={acceptModalVisible}
        onOk={() => acceptDeposit(selectedDepositId)}
        onCancel={() => setAcceptModalVisible(false)}
        okButtonProps={{
          className: "bg-[#0A503D] text-white",
          style: { backgroundColor: "#0e4152" },
        }}
        okText={approveLoading ? "Processing..." : "Yes, Accept"}
        title="Accept Deposit"
      >
        <p>Are you sure you want to approve this deposit?</p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalVisible}
        onOk={() => deleteDeposit(selectedDepositId)}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{
          className: "bg-[#f25961] text-white",
          style: { backgroundColor: "#f25961" },
        }}
        okText={deleteLoading ? "Processing..." : "Yes, Delete"}
        title="Delete Deposit"
      >
        <p>Are you sure you want to delete this deposit?</p>
      </Modal>
    </>
  );
};

export default ManageDeposit;
