import React from "react";
import { Route, Routes } from "react-router-dom";
// import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
// import SuperAdmin from "../SuperAdmin/SuperAdmin";
// import NotFound from "../customers/pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import CreateRestaurantForm from "../Admin/CreateRestaurant/CreateRestaurantForm";
import {Admin} from "../Admin/Admin";
// import AdminNavbar from "../Admin/AdminNavbar";

export const AdminRoutes = () => {
  const { auth, restaurant } = useSelector((store) => store);
  console.log("rest in routes", restaurant)
  
  return (
    <div>
      {/* <AdminNavbar handleOpenSideBar={handleOpenSideBar} /> */}
      <Routes>
        <Route path="/*" element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} />
        {/* <Route path="/*" element={false ? <CreateRestaurantForm /> : <Admin />} /> */}
      </Routes>
    </div>
  );
};
