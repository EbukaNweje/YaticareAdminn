import { FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "antd"; // Import Modal from Ant Design

const ManageDeposit = () => {
  const [userData, setUserData] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDepositId, setSelectedDepositId] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const acceptDeposit = (depositId) => {
    const url = `https://yaticare-backend.onrender.com/api/admin/approve/${depositId}`;
    setApproveLoading(true);
    axios
      .put(url)
      .then((response) => {
        setApproveLoading(false);
        console.log("response", response);
        toast.success(response.data.message);
        setAcceptModalVisible(false); // Close modal after success
        getallDeposit(); // Refresh the data
      })
      .catch((error) => {
        setApproveLoading(false);
        console.log("this is the error", error);
      });
  };

  const deleteDeposit = (depositId) => {
    const url = `https://yaticare-back-end.vercel.app/api/admin/delete-deposit/${depositId}`;
    setDeleteLoading(true);
    axios
      .delete(url)
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        setDeleteModalVisible(false); // Close modal after success
        getallDeposit(); // Refresh the data
      })
      .catch((error) => {
        console.log(error);
        setDeleteLoading(false);
      });
  };

  const getallDeposit = () => {
    const url = "https://yaticare-back-end.vercel.app/api/admin/alldeposits";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getallDeposit();
  }, []);

  return (
    <>
      <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
        <p className="text-[27px] font-semibold text-[rgb(87,89,98)]">
          Manage clients deposits
        </p>
        <div className="w-full h-max bg-white shadow p-5">
          <div className="overflow-y-auto">
            <div className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]">
              <div className="w-24 phone:w-36 h-max">Client</div>
              <div className="w-36 phone:w-48 h-max">Amount Deposited</div>
              <div className="w-36 h-max">Payment Method</div>
              <div className="w-36 h-max">Status</div>
              <div className="w-36 h-max">Date</div>
              <div className="w-36 h-max opacity-0">Date</div>
            </div>

            {userData.length > 0 ? (
              userData.map((props) => (
                <div
                  className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]"
                  key={props._id}
                >
                  <div
                    className="w-24 phone:w-36 h-max"
                    style={{ color: props?.user === null ? "red" : "black" }}
                  >
                    {props?.user === null
                      ? "Deleted User"
                      : props?.user.userName}
                  </div>
                  <div className="w-36 phone:w-48 h-max">{props.amount}</div>
                  <div className="w-36 h-max">{props.PaymentType}</div>
                  <div className="w-36 h-max">
                    <p
                      className={`py-1 px-2 text-white w-max  rounded-full text-xs 
                        ${
                          props?.status === "pending"
                            ? `bg-[red]`
                            : `bg-[#31ce36]`
                        }
                      `}
                    >
                      {props.status}
                    </p>
                  </div>
                  <div className="w-36 h-max">{props.depositDate}</div>
                  <div className="w-36 h-max flex items-center gap-2">
                    <button
                      className="py-2 px-3 bg-[#48abf7] rounded text-white"
                      onClick={() => {
                        setSelectedDepositId(props._id);
                        setAcceptModalVisible(true);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="p-2 bg-[#f25961] rounded text-xs text-white"
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
              <p className="text-center mt-10">No deposit found</p>
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
          size: "middle",
          style: {
            backgroundColor: "#0e4152",
          },
        }}
        okText={approveLoading ? "Processing..." : "Yes, Accept"}
        closeIcon={true}
        title={"Accept Deposit"}
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
          size: "middle",
          style: {
            backgroundColor: "#f25961",
          },
        }}
        okText={deleteLoading ? "Processing..." : "Yes, Delete"}
        closeIcon={true}
        title={"Delete Deposit"}
      >
        <p>Are you sure you want to delete this deposit?</p>
      </Modal>
    </>
  );
};

export default ManageDeposit;
