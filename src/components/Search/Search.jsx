import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchFoodItem } from "../state/food/Action";
import { topMeals } from "../Home/topMeals";

const dish = [1, 1, 1, 1];

const Search = () => {
  const dispatch = useDispatch();
  const { food, auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  const handleSearchFood = (keyword) => {
    dispatch(searchFoodItem({keyword,jwt:auth.jwt || jwt }));
  };
  
  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          onChange={(e) => handleSearchFood(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeals.slice(0, 9).map((item) => (
            <PopularCuisines image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {food.search.map((item) => (
          <SearchDishCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;