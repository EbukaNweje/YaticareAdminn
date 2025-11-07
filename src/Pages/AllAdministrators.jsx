import { useEffect, useState } from "react";
import "./AddManager.css";
import axios from "axios";
import toast from "react-hot-toast";

const AllAdministrators = () => {
  const [adminData, setAdminData] = useState();

  const getallAddmin = () => {
    const url = "https://yaticare-back-end.vercel.app/api/admin/getadmins";
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setAdminData(response?.data?.admins);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getallAddmin();
  }, []);

  //   const handleDelete = (walletId) => {
  //     console.log(walletId);
  //     const toastLoadingId = toast.loading("Please wait...");
  //     const url = `https://joe-backend-bit-trade-lime.vercel.app/api/deleteWalletAddress/${walletId}`;
  //     axios
  //       .delete(url)
  //       .then((res) => {
  //         console.log(res);
  //         setTimeout(() => {
  //           toast.dismiss(toastLoadingId);
  //           toast.success("Success");
  //         }, 3000);
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  console.log(adminData);

  return (
    <>
      <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
        <p className="text-[27px] font-semibold text-[rgb(87,89,98)]">
          All Administrators
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
              <div className="w-36 h-max">Email</div>
              <div className="w-36 h-max">Admin Rows</div>
              <div></div>
            </div>

            {adminData?.map((props) => (
              <div
                className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]"
                key={"props._id"}
              >
                <div className="w-36 phone:w-36 h-max">{props?.email}</div>
                <div></div>
                <div className="w-36 phone:w-48 h-max">
                  {props.super ? "Supper Admin" : "Admin"}
                </div>
                <div></div>

                <div className="w-36 h-max flex items-center gap-2">
                  {/* <button
                    className="p-2 bg-[#f25961] rounded text-xs text-white"
                    onClick={() => handleDelete(props._id)}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAdministrators;
