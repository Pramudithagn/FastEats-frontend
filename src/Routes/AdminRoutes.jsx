import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateRestaurantForm from "../Admin/CreateRestaurant/CreateRestaurantForm";
import { Admin } from "../Admin/Admin";
import { Backdrop, CircularProgress } from "@mui/material";

export const AdminRoutes = () => {
  const { restaurant } = useSelector((store) => store);
  const [showComponent, setShowComponent] = React.useState(false);

  React.useEffect(() => {
    const delay = setTimeout(() => setShowComponent(true), 200);
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
