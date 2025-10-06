import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import AdminHome from "./Components/AdminHome";
import Dashboard from "./Pages/Dashboard";
import InvestmentPlans from "./Pages/InvestmentPlans";
import ActiveInvestment from "./Pages/ActiveInvestment";
import ManageUsers from "./Pages/ManageUsers";
import ManageDeposit from "./Pages/ManageDeposit";
import ManageWithdrawal from "./Pages/ManageWithdrawal";
// import Kyc from "./Pages/KYC";
import CreateTask from "./Pages/CreateTask";
import ManageTask from "./Pages/ManageTask";
import Leads from "./Pages/Leads";
import EmailServices from "./Pages/EmailServices";
import AddManager from "./Pages/AddManager";
import ManageAdmin from "./Pages/ManageAdmin";
import AppSettings from "./Pages/AppSettings";
import ReferralSettings from "./Pages/ReferralSettings";
import PaymentSettings from "./Pages/PaymentSettings";
import SwapSettings from "./Pages/SwapSettings";
import FrontendSettings from "./Pages/FrontendSettings";
import IPSettings from "./Pages/IPSettings";
import Platform from "./Pages/Platform";
import HomeRoute from "./HomeRoute";
import ForgetPassword from "./Pages/ForgetPassword";
import UserDetails from "./Pages/UserDetails";
import LoginActivity from "./Pages/LoginActivity";
// import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <HomeRoute/>
    </>,
  },
  {
    path: "/adminlogin/login",
    element: <>
      <Login/>
    </>,
  },
  {
    path: "/admin/forget-password",
    element: <>
      <ForgetPassword/>
    </>,
  },
  {
    
      path: "admin",
      element: <AdminHome />,
      children: [
          {
              path: "dashboard",
              element: (
                  <>
                      <Dashboard />
                  </>
              ),
          },
          {
              path: "dashboard/plans",
              element: (
                  <>
                      <InvestmentPlans />
                  </>
              ),
          },
          {
              path: "dashboard/active-investment",
              element: (
                  <>
                      <ActiveInvestment />
                  </>
              ),
          },
          {
              path: "dashboard/manageusers",
              element: (
                  <>
                      <ManageUsers />
                  </>
              ),
          },
          {
              path: "dashboard/user-details/:id",
              element: (
                  <>
                      <UserDetails />
                  </>
              ),
          },
          {
              path: "dashboard/login-activity/:id",
              element: (
                  <>
                      <LoginActivity />
                  </>
              ),
          },
          {
              path: "dashboard/manage-deposits",
              element: (
                  <>
                      <ManageDeposit />
                  </>
              ),
          },
          {
              path: "dashboard/manage-withdrawals",
              element: (
                  <>
                      <ManageWithdrawal />
                  </>
              ),
          },
        //   {
        //       path: "dashboard/kyc-applications",
        //       element: <>
        //       <Kyc />,
        //       </>
        //   },
          {
              path: "dashboard/create-task",
              element: <>
              <CreateTask />
              </>
          },
          {
              path: "dashboard/manage-task",
              element: <>
              <ManageTask />
              </>
          },
          {
              path: "dashboard/leads",
              element: <>
              <Leads />
              </>
          },
          {
              path: "dashboard/email-services",
              element: <>
              <EmailServices />
              </>
          },
          {
              path: "dashboard/add-manager",
              element: <>
              <AddManager />
              </>
          },
          {
              path: "dashboard/manage-admin",
              element: <>
              <ManageAdmin />
              </>
          },
          {
              path: "dashboard/app-settings",
              element: <>
              <AppSettings />
              </>
          },
          {
              path: "dashboard/referral-settings",
              element: <>
              <ReferralSettings />
              </>
          },
          {
              path: "dashboard/payment-settings",
              element: <>
              <PaymentSettings />
              </>
          },
          {
              path: "dashboard/manage-crypto-assets",
              element: <>
              <SwapSettings />
              </>
          },
          {
              path: "dashboard/frontpage",
              element: <>
              <FrontendSettings />
              </>
          },
          {
              path: "dashboard/privacy-policy",
              element: <>
              <AddManager />
              </>
          },
          {
              path: "dashboard/ipaddress",
              element: <>
              <IPSettings />
              </>
          },
          {
              path: "dashboard/platform",
              element: <>
              <Platform />
              </>
          },
      ],
  },
]);

const App = () => {
    return  <>
   
    <RouterProvider router={router} />
</>
};

export default App;
