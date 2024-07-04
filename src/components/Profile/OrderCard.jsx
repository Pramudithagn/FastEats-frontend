import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
      {/* <img className="h-16 w-16" src={order.food?.images[0]} alt="" /> */}
        <img className="h-16 w-16" src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-
              mozzarella-cheese-slice-generative-ai_188544-12347.jpg?t=st=1719655178~exp=1719658778~hmac=24a8e064654f50f1d1e23c9b
              5e27d029b4e2bd78508b9439251a284b8e47c8f0&w=826" alt="" />
        <div>
          <p>Pizza</p>
          <p className="text-gray-400">$234</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed" variant="contained">
          Completed
        </Button>
      </div>
    </Card>
  );
};
