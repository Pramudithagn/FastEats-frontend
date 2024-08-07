import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = ({item, order}) => {
  console.log("users order from orderscard ", order)

  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
      {/* <img className="h-16 w-16" src={order.food?.images[0]} alt="" /> */}
        <img className="h-16 w-16" src={item.food?.images[0]} alt="" />
        <div>
          <p>{item.food?.name}</p>
          <p className="text-gray-400">${item.totalPrice}</p>
        </div>
      </div>
      <div>
        <Button disabled className="cursor-not-allowed" variant="contained">
          {order.orderStatus}
        </Button>
      </div>
    </Card>
  );
};
