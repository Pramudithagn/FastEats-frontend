import React from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Orders } from "./Orders";
import Addresses from "./Addresses";
import { Favorites } from "./Favorites";
import CustomerEvents from "./CustomerEvents";
import { Payments } from "./Payments";
import { Notifications } from "./Notifications";

export const Profile = ({handleCloseSide, openSideBar}) => {
  console.log("sidebar state",openSideBar)
  // const [openSideBar, setOpenSideBar] = React.useState(false);

  return (
    <div className="lg:flex justify-center">
      <div onClick={handleCloseSide} className="sticky lg:h-[80vh] lg:w-[0%]">
        {/* <ProfileNavigation open={openSideBar} /> */}
        <ProfileNavigation open={openSideBar} />

      </div>
      <div className="lg:w-[80%] h-lvh">
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Addresses />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<CustomerEvents />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/notification" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};
