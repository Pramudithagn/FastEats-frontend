import React from "react";
import AddressCard from "../Cart/AddressCard";
import { useSelector } from "react-redux";

const Addresses = () => {
  const {auth}=useSelector(state=>state)
  return (
    <div>
      <div className="flex items-center flex-col lg:px-10 pt-8">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className=" lg:pl-40 flex justify-center flex-wrap gap-3">
          {auth.user?.addresses.map((item) => (
            <AddressCard item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;