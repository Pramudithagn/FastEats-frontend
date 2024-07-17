import React from "react";
import { Route, Routes } from "react-router-dom";
import {CustomerRoutes} from "./CustomerRoutes";
import { useSelector } from "react-redux";
import {AdminRoutes} from "./AdminRoutes";

export const Routers = () => {
    // const { auth } = useSelector((store) => store);

  return (
    <>
      <Routes>
        {/* <Route path="/super-admin/*" element={<SuperAdmin />} /> */}
        <Route path="/admin/restaurant/*" element={<AdminRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  )
}
