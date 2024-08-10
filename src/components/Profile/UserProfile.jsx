import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const { auth } = useSelector((store) => store);
  console.log(auth);
  const handleLogout = () => {};

  return (
    <div>
      <div className=" flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-center pt-52">
          <AccountCircleIcon sx={{ fontSize: "9rem" }} />
          <h1 className="py-5 text-3xl font-semibold">{auth.user.fullName}</h1>
          <p className="py-5 text-lg from-neutral-300">
            Email : {auth.user.email}
          </p>
          <p className=" text-lg from-neutral-400">
            Account type :{" "}
            {auth.user.role === "ROLE_CUSTOMER" ? "Customer" : "Owner"}
          </p>

          {/* <Button onClick={handleLogout} variant='contained' sx={{margin:"2rem 0rem"}}>Logout</Button> */}
        </div>
      </div>
    </div>
  );
};
