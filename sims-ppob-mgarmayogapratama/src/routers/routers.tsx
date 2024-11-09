import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import RegisterPages from "../pages/auth/register/register";
import LoginPages from "../pages/auth/login/login";
import DashboardPages from "../pages/main/dashboard/dashboard";
import MainLayout from "../layouts/mainLayout";
import AuthLayout from "@/layouts/authLayout";
import AccountPages from "@/pages/main/account/account";
import AccountEditPages from "@/pages/main/account_update/accountUpdate";
import TopupPages from "@/pages/main/topup/topup";
import TransactionPages from "@/pages/main/transaction/transaction";
import PaymentPages from "@/pages/main/payment/payment";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/login",
        element: <LoginPages />,
        loader: () => {
          if (Cookies.get("token")) {
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/register",
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPages />,
        loader: () => {
          if (Cookies.get("token")) {
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <DashboardPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/account",
        element: <AccountPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/account/edit",
        element: <AccountEditPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/top-up",
        element: <TopupPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/transaction",
        element: <TransactionPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/payment/:code",
        element: <PaymentPages />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
