import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSideBar";
import RestaurantDashboard from "./RestaurantDashboard/RestaurantDashboard";
import RestaurantsOrder from "./Order/RestaurantsOrder";
import RestaurantsMenu from "./Menu/RestaurantsMenu";
import AddMenuForm from "./Menu/AddMenuForm";
import CreateRestaurantForm from "./CreateRestaurant/CreateRestaurantForm";
import FoodCategory from "./Food/FoodCategory";
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
    <div >
       <div className="lg:z-10">
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      </div>
      <div className="lg:flex justify-between">
        {/* <div className="-z-10"> */}
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        {/* </div> */}

        <div className="lg:w-[80vw] ">
          <Routes>
            {/* <Route path="/" element={<RestaurantDashboard />} /> */}
            <Route path="/" element={<Profile />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/menu" element={<RestaurantsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
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
