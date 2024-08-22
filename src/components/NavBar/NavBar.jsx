// import { Avatar, Badge, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import React from "react";
// import { pink } from "@mui/material/colors";
// import "./NavBar.css";
// import { Person } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const NavBar = () => {

//   const {auth, cart} = useSelector((store) => store)
//   const navigate = useNavigate()

//   const handleAvatarClick = () =>{
//     if(auth.user?.role === "ROLE_CUSTOMER"){
//       navigate('/my-profile')
//     }
//     else{
//       navigate('/admin/restaurant')
//     }
//   }

//   return (
//     <div className="px-5 top-0 sticky z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
//       <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
//         <li className="logo font-semibold text-gray-300 text-2xl" onClick={() => navigate("/")}>food</li>
//       </div>
//       <div className="flex items-center space-x-2 lg:space-x-10">
//         <div className="">
//           <IconButton>
//             <SearchIcon sx={{ fontSize: "1.5rem" }}></SearchIcon>
//           </IconButton>
//         </div>
//         <div className="">
//           {auth.user? <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: pink.A400 }}>{auth.user.fullName[0].toUpperCase()}</Avatar>:
//                 <IconButton onClick={() => navigate("/account/login")}>
//                   <Person/>
//                 </IconButton>}
//         </div>
//         <div className="">
//           <IconButton onClick={() => navigate("/cart")}>
//             <Badge color="primary" badgeContent={cart?.cartItems?.length}>
//               <ShoppingCartIcon sx={{ fontSize: "1.5rem" }}></ShoppingCartIcon>
//             </Badge>
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import "../NavBar/NavBar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/auth/Action";
import { grey, pink } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({handleOpenSide}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToProfile = (e) => {
    e.preventDefault()
    // auth.user?.role === "ROLE_ADMIN" || 
    auth.user?.role === "ROLE_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile/");
  };

  const handleCloseAuthModel = () => {
    navigate("/");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  // useEffect(()=>{
  //   if(auth.user?.fullName){
  //     // handleCloseAuthModel()
  //   }

  // },[auth.user])

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  return (
    <div className="px-5 sticky z-50 py-[.8rem] bg-[#212529]  lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div
          // onClick={navigateToHome}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          {/* <li className="logo font-semibold text-gray-300 text-2xl">
            Food-Home
          </li> */}
          {isSmallScreen? <IconButton onClick={handleOpenSide}><MenuIcon/></IconButton>
                // :<li onClick={navigateToHome} className="logo font-semibold text-gray-300 text-2xl">Food-Home</li>}
                :<IconButton onClick={navigateToHome}><HomeIcon/></IconButton>}
        </div>
        {/* <li className="font font-semibold">Home</li> */}
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_ADMIN"
                  ? handleOpenMenu
                  : navigateToProfile
              }
              className=" font-semibold cursor-pointer"
            >
              <Avatar sx={{ bgcolor: "white",color:grey.A700}} className="bg-white">
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() =>
                auth.user?.role === "ROLE_ADMIN"
                  ? navigate("/admin")
                  : navigate("/super-admin")
              }
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        <IconButton onClick={navigateToCart}>
          <Badge color="primary" badgeContent={cart.cartItems.length}>
            <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </div>

      <Auth handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Navbar;