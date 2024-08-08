import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSideBar";
import RestaurantDashboard from "./RestaurantDashboard/RestaurantDashboard";
import RestaurantsOrder from "./Order/RestaurantsOrder";
import RestaurantsFood from "./Food/RestaurantsFood";
import AddFoodForm from "./Food/AddFoodForm";
import CreateRestaurantForm from "./CreateRestaurant/CreateRestaurantForm";
import FoodCategory from "./FoodCategory/FoodCategory";
import Ingredients from "./Ingredients/Ingredients";
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details/Details";
import Events from "./Events/Events";
import { getIngredientCategory, getIngredientsOfRestaurant } from "../components/state/ingredient/Action";
import { getRestaurantsCategory } from "../components/state/restaurant/Action";
import { fetchRestaurantsOrder } from "../components/state/restaurant.order/Action";
import AdminNavbar from "./AdminNavbar";
import { Profile } from "../components/Profile/Profile";
// import { getUsersOrders } from "../State/Customers/Orders/Action";

export const Admin = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientCategory({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getRestaurantsCategory({jwt: auth.jwt || jwt, restaurantId: restaurant.usersRestaurant?.id })
      );
      dispatch(
        fetchRestaurantsOrder({restaurantId: restaurant.usersRestaurant?.id,jwt: auth.jwt || jwt })
      );
    }
  }, [restaurant.usersRestaurant] );
  
  return (
    <div className="flex flex-col h-screen">
       <div className="fixed top-0 left-0 right-0 z-50">
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      </div>
      <div className="flex flex-1 mt-[60px] lg:mt-[72px] justify-between">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />

        <div className="lg:w-[80vw] overflow-y-auto  bg-slate-700">
          <Routes>
            {/* <Route path="/" element={<RestaurantDashboard />} /> */}
            <Route path="/" element={<Profile />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/food" element={<RestaurantsFood />} />
            <Route path="/add-food" element={<AddFoodForm />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<Events />} />

            {/* <Route path="/event" element={<IngredientTable />} /> */}
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
