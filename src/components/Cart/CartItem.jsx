import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const CartItem = () => {
  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-
              mozzarella-cheese-slice-generative-ai_188544-12347.jpg?t=st=1719655178~exp=1719658778~hmac=24a8e064654f50f1d1e23c9b
              5e27d029b4e2bd78508b9439251a284b8e47c8f0&w=826"
            alt=""
          />
        </div>

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full ">
            <p className="">Pizza</p>
            
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <IconButton
                    onClick
                    // onClick={() => handleUpdateCartItem(-1)}
                    color="primary"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <div className="w-5 h-5 text-xs flex items-center justify-center ">
                    {/* {item.quantity} */}8
                  </div>

                  <IconButton
                    // onClick={() => handleUpdateCartItem(1)}
                    onClick
                    color="primary"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            
          </div>
          <p>$4500</p>
          {/* <p>${item.totalPrice}</p> */}
        </div>
      </div>

      <div className="pt-3 space-x-2">
        {/* {item.ingredients.map((item) => ( */}
        {[1,1,1,1].map((item) => (

          <Chip label="cheese" />
        ))}
      </div>

    </div>
  );
};
