import { useEffect, useState } from "react";
import "./AddManager.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddManager = () => {
  const [adminWallet, setAdminWaller] = useState();

  const getallDeposit = () => {
    const url = "https://yaticare-back-end.vercel.app/api/getallWalletAddress";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setAdminWaller(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getallDeposit();
  }, []);

  const handleDelete = (walletId) => {
    console.log(walletId);
    const toastLoadingId = toast.loading("Please wait...");
    const url = `https://yaticare-back-end.vercel.app/api/deleteWalletAddress/${walletId}`;
    axios
      .delete(url)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          toast.dismiss(toastLoadingId);
          toast.success("Success");
        }, 3000);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(adminWallet);

  return (
    <>
      <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
        <p className="text-[27px] font-semibold text-[rgb(87,89,98)]">
          Manage Admin Wallets
        </p>
        <div className="w-full h-max bg-white shadow p-5">
          <div className="w-full h-max flex phone:flex-col gap-2 border-b border-b-gray-200 pb-3">
            <div>
              <p className="text-sm text-[rgb(73,80,87)]">search</p>
              <input
                type="text"
                placeholder="Search by user name"
                className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
              />
            </div>
            <div>
              <p className="text-sm  text-[rgb(73,80,87)]">status</p>
              <select
                name=""
                id=""
                className="w-max phone:w-full h-10 rounded pl-2 text-sm border outline-sky-100"
              >
                <option value="all">All</option>
                <option value="all">Processed</option>
                <option value="all">Pending</option>
              </select>
            </div>
            <div className="phone:w-full phone:flex flex gap-2">
              <div>
                <p className="text-sm text-[rgb(73,80,87)]">page</p>
                <select
                  name=""
                  id=""
                  className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-[rgb(73,80,87)]">order</p>
                <select
                  name=""
                  id=""
                  className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                >
                  <option value="descending">Descending</option>
                  <option value="ascending">Ascending</option>
                </select>
              </div>
            </div>

            <div className="phone:w-full phone:flex flex gap-2">
              <div>
                <p className="text-sm text-[rgb(73,80,87)]">from</p>
                <input
                  type="date"
                  className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                />
              </div>
              <div>
                <p className="text-sm text-[rgb(73,80,87)]">to</p>
                <input
                  type="date"
                  className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                />
              </div>
            </div>
          </div>
          <div className="overflow-y-auto">
            <div className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]">
              <div className="w-36 phone:w-36 h-max">Wallet Name</div>
              <div className="w-36 h-max">Wallet Address</div>
              <div></div>
            </div>

            {adminWallet?.map((props) => (
              <div
                className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]"
                key={props._id}
              >
                <div className="w-24 phone:w-36 h-max">{props?.walletName}</div>
                <div className="w-36 phone:w-48 h-max">
                  {props.walletAddress}
                </div>
                <div></div>

                <div className="w-36 h-max flex items-center gap-2">
                  <button
                    className="p-2 bg-[#f25961] rounded text-xs text-white"
                    onClick={() => handleDelete(props._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddManager;
