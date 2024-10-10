import React from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/restaurant/*" element={<AdminRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  );
};
