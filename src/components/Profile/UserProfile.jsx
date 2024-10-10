import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const { auth } = useSelector((store) => store);

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
        </div>
      </div>
    </div>
  );
};
