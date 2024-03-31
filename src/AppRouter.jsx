import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/home";
import Price from "./pages/price";
import Wallet from "./pages/wallet";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: () => {
      return <div>Loading</div>;
    },
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "price",
        element: <Price />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "*",
        loader: () => {
          return redirect("/");
        },
      },
    ],
  },
]);

export default router;
