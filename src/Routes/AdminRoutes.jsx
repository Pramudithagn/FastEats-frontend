import React from "react";
import { Route, Routes } from "react-router-dom";
// import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
// import SuperAdmin from "../SuperAdmin/SuperAdmin";
// import NotFound from "../customers/pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import CreateRestaurantForm from "../Admin/CreateRestaurant/CreateRestaurantForm";
import { Admin } from "../Admin/Admin";
import { Backdrop, CircularProgress } from "@mui/material";
// import AdminNavbar from "../Admin/AdminNavbar";

export const AdminRoutes = () => {
  const { auth, restaurant } = useSelector((store) => store);
  console.log("rest in routes", restaurant);
  const [showComponent, setShowComponent] = React.useState(false);

  React.useEffect(() => {
    const delay = setTimeout(() => setShowComponent(true), 100);
    return () => clearTimeout(delay);
  }, []);

  if (!showComponent) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        />
      </Routes>
    </div>
  );
};
