import { Chip, IconButton, Card } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";

export const RestaurantCard = () => {
  return (
    <div>
      <Card className="m-5 w-[18rem]">
        <div
          className={`${
            true ? "cursor-pointer" : "cursor-not-allowed"
          } relative`}
        >
          <img
            className="w-full h-[10rem] rounded-t-md object-cover "
            src="https://img.freepik.com/free-photo/happy-waiter-serving-food-
            group-cheerful-friends-pub_637285-12525.jpg?ga=GA1.1.370232724.1715709909&semt=sph"
          
            alt=""
          />
          <Chip
            className="absolute top-2 left-2"
            size="small"
            color={true ? "success" : "error"}
            label={true ? "open" : "closed"}
          ></Chip>
        </div>

        <div className="p-4 textPart lg:flex w-full justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-lg">Pizza Hut</p>
            <p className="text-gray-500 text-sm">pizza hut best pizza hut best pizza hut best</p>
          </div>
          <div>
            <IconButton>
              {true? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
