import React from 'react'
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../state/auth/Action';


const menu = [
    // { title: "Home", icon: <HomeIcon /> },
    { title: "Profile", icon: <AccountCircleIcon /> },
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <LocationCityIcon /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notification", icon: <NotificationsIcon /> },
    { title: "Events", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },
  ];

export const ProfileNavigation = ({ open }) => {

    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    // const isSmallScreen = open;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
          dispatch(logout())
        //   handleLogout();
          navigate("/");
        }
        // else if (item.title === "Home") navigate("/")
        else navigate(`/my-profile/${item.title.toLowerCase()}`)
      };

  return (
    <div>
        <Drawer
        sx={{ zIndex: 1 }}
        anchor={"left"}
        open={open}
        // onClose={}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-start text-xl pt-24 gap-8">
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div onClick={() => {handleNavigate(item)}} className="px-5 flex items-center space-x-5 cursor-pointer">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  )
}
