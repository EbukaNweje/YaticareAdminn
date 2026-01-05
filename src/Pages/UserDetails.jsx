import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCaretDown,
  FaUser,
  FaWallet,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaLock,
  FaEye,
} from "react-icons/fa";
import {
  IoMail,
  IoCall,
  IoCard,
  IoStatsChart,
  IoShield,
  IoTime,
  IoPerson,
} from "react-icons/io5";
import { MdAccountBalance, MdHistory, MdSecurity } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [oneUserData, setOneUserData] = useState({});
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("adminData")).token;
  const [EditInfo, setEditInfo] = useState({
    pin: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [totalreferredactivesubscribers, settotalreferredactivesubscribers] =
    useState(null);

  console.log("this is userData", oneUserData);

  const Nav = useNavigate();
  // console.log("id", id);

  const handleGetOneUserData = () => {
    const url = `https://yaticare-backend.onrender.com/api/user/userdata/${id}`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res?.data);
        setOneUserData(res?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchReferredSubscribers = () => {
    const url = `https://yaticare-backend.onrender.com/api/user/totalreferredactivesubscribers/${id}`;
    axios
      .get(url)
      .then((res) => {
        settotalreferredactivesubscribers(
          res?.data?.totalReferredActiveSubscribers
        );
        console.log("this is totalreferredactivesubscribers", res);
        // setOneUserData(res?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handlDeleteOneUserData = () => {

  // };

  useEffect(() => {
    if (id) {
      handleGetOneUserData();
      fetchReferredSubscribers();
    }
  }, [id]);

  const [showActions, setShowActions] = useState(false);
  const [blockUser, setBlockUser] = useState(false);
  const handleBlockUser = () => {
    setBlockUser(false); // Close the modal
    const toastLoadingId = toast.loading("Blocking user...");
    // API endpoint for blocking the user
    const url = `https://yaticare-backend.onrender.com/api/admin/blockuser/${id}`;

    axios
      .patch(
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
        toast.dismiss(toastLoadingId);
        toast.success(`${oneUserData.userName} has been blocked successfully`);
        handleGetOneUserData(); // Refresh user data after blocking
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setShowActions(false); // Close the actions dropdown
      });
  };
  const handleUnblockUser = () => {
    setBlockUser(false); // Close the modal
    const toastLoadingId = toast.loading("Unblocking user...");

    // API endpoint for unblocking the user
    const url = `https://yaticare-backend.onrender.com/api/admin/unblockuser/${id}`;

    axios
      .patch(
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
        toast.dismiss(toastLoadingId);
        toast.success(`${oneUserData.userName} has been blocked successfully`);
        handleGetOneUserData(); // Refresh user data after blocking
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setShowActions(false); // Close the actions dropdown
      });
  };

  const handleOnRoi = () => {
    setShowActions(false);
    const toastLoadingId = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(toastLoadingId);
      toast.success("ROI turned of successfully");
    }, 3000);
  };

  const [creditDebit, setCreditDebit] = useState(false);
  const [creditOrDebit, setCreditOrDebit] = useState("Credit");

  const [creditDebitValue, setCreditDebitValue] = useState("");
  const [creditDebitItem, setCreditDebitItem] = useState("");
  let reqData;

  // if (creditDebitItem === "bonus") {
  //     reqData = {bonus: `${Number(creditDebitValue) + Number(oneUserData.bonus)}`};
  // } else if (creditDebitItem === "profit") {
  //     reqData = {totalProfit:`${Number(creditDebitValue) + Number(oneUserData.totalProfit)}`};
  // } else if (creditDebitItem === "refBonus") {
  //     reqData = {ref: `${Number(creditDebitValue) + Number(oneUserData.ref)}`};
  // } else if (creditDebitItem === "accountBalance") {
  //     reqData = {accountBalance: `${Number(creditDebitValue) + Number(oneUserData.accountBalance)}`};
  // } else if (creditDebitItem === "deposit") {
  //     reqData = {totalDeposit: `${Number(creditDebitValue) + Number(oneUserData.totalDeposit)}`};
  // } else if (creditDebitItem === "totalInv") {
  //     reqData = {totalInvestment: `${Number(creditDebitValue) + Number(oneUserData.totalInvestment)}`};
  // }

  // const handleCreditDebit = () => {
  //     if (!creditDebitValue) {
  //         alert("Please enter a value");
  //     } else if (!reqData) {
  //         alert("Please select a column");
  //     } else {
  //         const toastLoadingId = toast.loading("Please wait...");
  //         const data = reqData;
  //         console.log(data);
  //         const url = `https://yaticare-backend.onrender.com/api/userdata/${id}`;
  //         console.log(url);
  //         axios
  //             .patch(url, data)
  //             .then((response) => {
  //                 toast.dismiss(toastLoadingId);
  //                 console.log(response);
  //                 setCreditDebit(false);
  //                 toast.success("Account updated successfully");
  //                 setTimeout(() => {
  //                     handleGetOneUserData();
  //                 }, 1000);
  //                 setShowActions(false);
  //                 reqData = {};
  //                 setCreditDebitValue("");
  //                 setCreditDebitItem("");
  //             })
  //             .catch((error) => {
  //                 console.log(error);
  //             });
  //     }
  // };

  // const handleCreditDebit = () => {
  //   if (!creditDebitValue) {
  //     alert("Please enter a value");
  //   } else if (!creditDebitItem) {
  //     alert("Please select a column");
  //   } else {
  //     const toastLoadingId = toast.loading("Please wait...");

  //     // Determine whether to add (credit) or subtract (debit)
  //     const value = Number(creditDebitValue); // Input value
  //     const isCredit = creditOrDebit === "Credit"; // Check if credit or debit

  //     if (creditDebitItem === "bonus") {
  //       reqData = {
  //         bonus: isCredit
  //           ? `${Number(oneUserData.bonus) + value}`
  //           : `${Number(oneUserData.bonus) - value}`,
  //       };
  //     } else if (creditDebitItem === "profit") {
  //       reqData = {
  //         totalProfit: isCredit
  //           ? `${Number(oneUserData.totalProfit) + value}`
  //           : `${Number(oneUserData.totalProfit) - value}`,
  //       };
  //     } else if (creditDebitItem === "refBonus") {
  //       reqData = {
  //         ref: isCredit
  //           ? `${Number(oneUserData.ref) + value}`
  //           : `${Number(oneUserData.ref) - value}`,
  //       };
  //     } else if (creditDebitItem === "accountBalance") {
  //       reqData = {
  //         accountBalance: isCredit
  //           ? `${Number(oneUserData.accountBalance) + value}`
  //           : `${Number(oneUserData.accountBalance) - value}`,
  //       };
  //     } else if (creditDebitItem === "deposit") {
  //       reqData = {
  //         totalDeposit: isCredit
  //           ? `${Number(oneUserData.totalDeposit) + value}`
  //           : `${Number(oneUserData.totalDeposit) - value}`,
  //       };
  //     } else if (creditDebitItem === "totalInv") {
  //       reqData = {
  //         totalInvestment: isCredit
  //           ? `${Number(oneUserData.totalInvestment) + value}`
  //           : `${Number(oneUserData.totalInvestment) - value}`,
  //       };
  //     }
  //     // Proceed with the API call
  //     const url = `https://yaticare-backend.onrender.com/api/user/userdata/${id}`;
  //     axios
  //       .patch(url, reqData)
  //       .then((response) => {
  //         toast.dismiss(toastLoadingId);
  //         console.log(response);
  //         setCreditDebit(false);
  //         toast.success("Account updated successfully");
  //         setTimeout(() => {
  //           handleGetOneUserData();
  //         }, 1000);
  //         setShowActions(false);
  //         reqData = {};
  //         setCreditDebitValue("");
  //         setCreditDebitItem("");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const [resetPwd, setResetPwd] = useState(false);
  // const handleResetPwd = () => {
  //   setResetPwd(false);
  //   const toastLoadingId = toast.loading("Please wait...");
  //   setTimeout(() => {
  //     toast.dismiss(toastLoadingId);
  //     toast.success("Password reset successfully");
  //   }, 3000);
  //   setShowActions(false);
  // };

  const [clearAcc, setClearAcc] = useState(false);
  // const handleClearAcc = () => {
  //   setClearAcc(false);
  //   const toastLoadingId = toast.loading("Please wait...");
  //   const Clr = {
  //     accountBalance: 0,
  //     bonus: 0,
  //     totalDeposit: 0,
  //     totalInvestment: 0,
  //     totalProfit: 0,
  //     totalWithdrawal: 0,
  //     tradingAccounts: 0,
  //   };
  //   const url = `https://yaticare-backend.onrender.com/api/user/api/userdata/${id}`;
  //   axios
  //     .patch(url, Clr)
  //     .then((response) => {
  //       toast.dismiss(toastLoadingId);
  //       console.log(response);
  //       toast.success("Account Clear successfully");
  //       setTimeout(() => {
  //         handleGetOneUserData();
  //       }, 1000);
  //       setShowActions(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const [addRoi, setAddRoi] = useState(false);
  const handleAddRoi = () => {
    setAddRoi(false);
    const toastLoadingId = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(toastLoadingId);
      toast.success("ROI added successfully");
    }, 3000);
    setShowActions(false);
  };

  // const AddProfit = () => {
  //     const url = `https://yaticare-backend.onrender.com/api/add-profit/${id}`;
  //     const profitAmount = creditDebitValue
  //     console.log("This is it",profitAmount)
  //     const toastLoadingId = toast.loading("Please wait...");
  //     axios
  //         .post(url, {profitAmount})
  //         .then((response) => {
  //             toast.dismiss(toastLoadingId);
  //             console.log("Profile",response);
  //             toast.success("Profit Added successfully");
  //             setTimeout(() => {
  //                 handleGetOneUserData();
  //             }, 1000);
  //             setShowActions(false);
  //         })
  //         .catch((error) => {
  //             console.log("Profile",error);
  //         });

  // }

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(false);
    const toastLoadingId = toast.loading("Please wait...");

    // Prepare the data to be updated (e.g., email)
    const updatedData = {
      email: email, // Replace with the updated email value
    };

    // API endpoint for updating user details
    const url = `https://yaticare-backend.onrender.com/api/admin/updateuseremail/${id}`;

    axios
      .put(url, updatedData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.dismiss(toastLoadingId);
        toast.success("User email updated successfully");
        handleGetOneUserData(); // Refresh user data after update
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setShowActions(false);
      });
  };

  const [sendEmail, setSendEmail] = useState(false);
  const handleSendEmail = () => {
    setSendEmail(false);
    const toastLoadingId = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(toastLoadingId);
      toast.success("Email sent successfully");
    }, 3000);
    setShowActions(false);
  };

  const [login, setLogin] = useState(false);
  const handleLogin = () => {
    setLogin(false);
    const toastLoadingId = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(toastLoadingId);
      toast.success("Success");
      // window.location.href = `http://localhost:5174/#/dashboard/${id}`;
      window.location.href = `https://ya-ti-pauy.vercel.app/#/dashboard/${id}`;
    }, 3000);
    setShowActions(false);
  };

  const [deleteUser, setDeleteUser] = useState(false);
  const handleDelete = () => {
    setDeleteUser(false);
    const toastLoadingId = toast.loading("Please wait...");
    setShowActions(false);
    const url = `https://yaticare-backend.onrender.com/api/admin/deleteuser/${id}`;
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTimeout(() => {
          toast.dismiss(toastLoadingId);
          toast.success("Success");
        }, 3000);
        window.history.back();
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      });
  };
  const goBack = () => {
    window.history.back();
  };

  const TextClick = () => {
    // if(creditDebitItem === "profit"){
    //     AddProfit()
    // }else{
    handleCreditDebit();
    // }
  };

  const formatCurrency = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return "0.00";
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const handleChangePin = (newPin) => {
    const toastLoadingId = toast.loading("Updating PIN...");

    const url = `https://yaticare-backend.onrender.com/api/admin/changeuserpin/${id}`;

    axios
      .patch(
        url,
        { newPin: newPin },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.dismiss(toastLoadingId);
        toast.success("PIN updated successfully");
        handleGetOneUserData(); // Refresh user data
        setEditInfo({ ...EditInfo, pin: false, newPin: "" });
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      });
  };

  const handleChangePassword = (newPassword) => {
    if (!newPassword) {
      toast.error("Please enter a valid password");
      return;
    }

    const toastLoadingId = toast.loading("Updating password...");

    const url = `https://yaticare-backend.onrender.com/api/admin/changeuserpassword/${id}`;

    axios
      .patch(
        url,
        { newPassword: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.dismiss(toastLoadingId);
        toast.success("Password updated successfully");
        setEditInfo((prev) => ({
          ...prev,
          password: false, // Close the input field
          newPassword: "", // Clear the input field
        }));
        handleGetOneUserData(); // Refresh user data
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error(error?.response?.data?.message || "An error occurred");
      });
  };
  // console.log("this is one user data", oneUserData);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <NavLink to="/admin/dashboard/manageusers">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <FaArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </NavLink>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {oneUserData.userName || "User Details"}
                </h1>
                <p className="text-gray-600">
                  Manage user account and settings
                </p>
              </div>
            </div>

            {/* Actions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Actions <FaCaretDown />
              </button>

              {showActions && (
                <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
                  <button
                    onClick={() => setEdit(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <FaEdit className="w-4 h-4 text-blue-600" />
                    Edit Email
                  </button>
                  <button
                    onClick={() => setSendEmail(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <FaEnvelope className="w-4 h-4 text-green-600" />
                    Send Email
                  </button>
                  <button
                    onClick={() => setLogin(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-green-600"
                  >
                    <FaEye className="w-4 h-4" />
                    Login as {oneUserData.userName}
                  </button>
                  <button
                    onClick={() => setBlockUser(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    style={{
                      color:
                        oneUserData.status === "blocked" ? "orange" : "red",
                    }}
                  >
                    <IoShield className="w-4 h-4" />
                    {oneUserData.status === "blocked"
                      ? "Unblock"
                      : "Block"}{" "}
                    User
                  </button>
                  <button
                    onClick={() => setDeleteUser(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
                  >
                    <FaTrash className="w-4 h-4" />
                    Delete User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {oneUserData.userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {oneUserData.userName}
              </h2>
              <p className="text-gray-600">{oneUserData.email}</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  oneUserData.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {oneUserData.status?.charAt(0)?.toUpperCase() +
                  oneUserData.status?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Account Balance
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${(oneUserData?.accountBalance || 0).toLocaleString()}.00
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MdAccountBalance className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Withdrawals
                </p>
                <p className="text-2xl font-bold text-red-600">
                  $
                  {(
                    oneUserData?.userTransactionTotal?.withdrawalTotal || 0
                  ).toLocaleString()}
                  .00
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <IoCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Deposits
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  $
                  {(
                    oneUserData?.userTransactionTotal?.depositTotal || 0
                  ).toLocaleString()}
                  .00
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaWallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Referral Count
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {oneUserData?.referralCount || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <IoPerson className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transaction Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Interest Total</span>
                <span className="font-medium">
                  $
                  {(
                    oneUserData?.userTransactionTotal
                      ?.dailyInterestHistoryTotal || 0
                  ).toLocaleString()}
                  .00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscriptions Total</span>
                <span className="font-medium">
                  $
                  {(
                    oneUserData?.userTransactionTotal
                      ?.subscriptionsHistoryTotal || 0
                  ).toLocaleString()}
                  .00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bonus Total</span>
                <span className="font-medium">
                  $
                  {(
                    oneUserData?.userTransactionTotal?.bonusHistoryTotal || 0
                  ).toLocaleString()}
                  .00
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Referral Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Referral Bonus</span>
                <span className="font-medium">
                  ${formatCurrency(oneUserData?.inviteCode?.bonusAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Subscribers</span>
                <span className="font-medium">
                  {totalreferredactivesubscribers || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium ${
                    oneUserData.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {oneUserData.status?.charAt(0)?.toUpperCase() +
                    oneUserData.status?.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registered</span>
                <span className="font-medium text-sm">
                  {new Date(oneUserData.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaUser className="w-5 h-5 text-blue-600" />
            User Information
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaUser className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Username</span>
                </div>
                <span className="text-gray-900">{oneUserData.userName}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IoMail className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Email</span>
                </div>
                <span className="text-gray-900">{oneUserData.email}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IoCall className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Phone</span>
                </div>
                <span className="text-gray-900">
                  {oneUserData.phoneNumber || "Not provided"}
                </span>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaWallet className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Wallet Name</span>
                </div>
                <span className="text-gray-900">
                  {oneUserData?.WalletInfo?.WalletName || "Not set"}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IoCard className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">
                    Wallet Address
                  </span>
                </div>
                <span className="text-gray-900 font-mono text-sm">
                  {oneUserData?.WalletInfo?.WalletAddress
                    ? `${oneUserData.WalletInfo.WalletAddress.slice(
                        0,
                        10
                      )}...${oneUserData.WalletInfo.WalletAddress.slice(-6)}`
                    : "Not set"}
                </span>
              </div>

              {/* Security Actions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MdSecurity className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">PIN</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {EditInfo.pin && (
                      <input
                        type="password"
                        value={EditInfo.newPin || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setEditInfo((prev) => ({ ...prev, newPin: value }));
                          }
                        }}
                        className="px-3 py-1 border border-gray-300 rounded text-sm w-24"
                        placeholder="New PIN"
                        maxLength={4}
                      />
                    )}
                    <button
                      onClick={() => {
                        if (EditInfo.pin) {
                          handleChangePin(EditInfo.newPin);
                        } else {
                          setEditInfo((prev) => ({ ...prev, pin: !prev.pin }));
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      {EditInfo.pin ? "Save" : "Change PIN"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaLock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Password</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {EditInfo.password && (
                      <input
                        type="password"
                        value={EditInfo.newPassword || ""}
                        onChange={(e) =>
                          setEditInfo((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        className="px-3 py-1 border border-gray-300 rounded text-sm w-32"
                        placeholder="New password"
                      />
                    )}
                    <button
                      onClick={() => {
                        if (EditInfo.password) {
                          handleChangePassword(EditInfo.newPassword);
                        } else {
                          setEditInfo((prev) => ({
                            ...prev,
                            password: !prev.password,
                          }));
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      {EditInfo.password ? "Save" : "Change Password"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={blockUser}
        onOk={
          oneUserData.status === "blocked" ? handleUnblockUser : handleBlockUser
        }
        onCancel={() => setBlockUser(false)}
        okButtonProps={{
          className: "bg-red-600 hover:bg-red-700 border-red-600",
        }}
        okText={
          oneUserData.status === "blocked" ? "Yes, Unblock" : "Yes, Block"
        }
        title={`${oneUserData.status === "blocked" ? "Unblock" : "Block"} User`}
      >
        <p className="py-4">
          Are you sure you want to{" "}
          {oneUserData.status === "blocked" ? "unblock" : "block"}{" "}
          <strong>{oneUserData.userName}</strong>?
        </p>
      </Modal>

      <Modal
        open={edit}
        onOk={handleEdit}
        onCancel={() => setEdit(false)}
        okButtonProps={{
          className: "bg-blue-600 hover:bg-blue-700 border-blue-600",
        }}
        okText="Update Email"
        title={`Edit ${oneUserData.userName} Details`}
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter new email address"
          />
        </div>
      </Modal>

      <Modal
        open={sendEmail}
        onOk={handleSendEmail}
        onCancel={() => setSendEmail(false)}
        okButtonProps={{
          className: "bg-green-600 hover:bg-green-700 border-green-600",
        }}
        okText="Send Email"
        title="Send Email"
      >
        <div className="py-4 space-y-4">
          <p className="text-gray-600">
            Send a message to <strong>{oneUserData.userName}</strong>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Email subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Email message"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={login}
        onOk={handleLogin}
        onCancel={() => setLogin(false)}
        okButtonProps={{
          className: "bg-green-600 hover:bg-green-700 border-green-600",
        }}
        okText="Proceed"
        title={`Login as ${oneUserData.userName}`}
      >
        <p className="py-4">
          You are about to login as <strong>{oneUserData.userName}</strong>.
          This will redirect you to their account dashboard.
        </p>
      </Modal>

      <Modal
        open={deleteUser}
        onOk={handleDelete}
        onCancel={() => setDeleteUser(false)}
        okButtonProps={{
          className: "bg-red-600 hover:bg-red-700 border-red-600",
        }}
        okText="Yes, Delete"
        title="Delete User"
      >
        <div className="py-4">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete{" "}
            <strong>{oneUserData.userName}</strong>'s account?
          </p>
          <p className="text-red-600 text-sm">
            ⚠️ This action cannot be undone. Everything associated with this
            account will be permanently lost.
          </p>
        </div>
      </Modal>

      <Modal
        open={addRoi}
        onOk={handleAddRoi}
        onCancel={() => setAddRoi(false)}
        okButtonProps={{
          className: "bg-blue-600 hover:bg-blue-700 border-blue-600",
        }}
        okText="Add History"
        title={`Add Trading History for ${oneUserData.userName}`}
      >
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Plan
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">Select Plan</option>
              <option value="bronze">Bronze Plan</option>
              <option value="silver">Silver Plan</option>
              <option value="gold">Gold Plan</option>
              <option value="diamond">Diamond Plan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">Select Type</option>
              <option value="bonus">Bonus</option>
              <option value="roi">ROI</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetails;
