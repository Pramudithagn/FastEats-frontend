import { Chip, IconButton, Card } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite } from "../../components/state/auth/Action";
import { isPresentInFavorites } from "../../config/logics";

export const RestaurantCard = ({item}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorites = () => {
    console.log(jwt)
    dispatch(addToFavourite({restaurantId:item.id,jwt:auth.jwt||jwt}));
  };

  const navigateToRestaurant = () => {
    if(item.open)
    navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
  };

  return (
    <div>
      <Card className="m-5 w-[18rem]">
        <div
          className={`${
            true ? "cursor-pointer" : "cursor-not-allowed"
          } relative`}
          onClick={navigateToRestaurant}
        >
          <img
            className="w-full h-[10rem] rounded-t-md object-cover "
            src= {item.images?.[0]}
          
            alt=""
          />
          <Chip
            className="absolute top-2 left-2"
            size="small"
            color={item.open ? "success" : "error"}
            label={item.open ? "open" : "closed"}
          ></Chip>
        </div>

        <div className="p-4 textPart lg:flex w-full justify-between  bg-gray-800">
          <div className="space-y-1">
            <p className="font-semibold text-lg">{item.name}</p>
            <p className="text-gray-500 text-sm truncate w-[13rem] ">{item.description}</p>
          </div>
          <div>
            <IconButton onClick={handleAddToFavorites}>
            {isPresentInFavorites(auth.favourites, item) ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />)}
              {/* {true? <FavoriteIcon/> : <FavoriteBorderIcon/>} */}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
