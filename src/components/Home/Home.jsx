import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { getAllRestaurantsAction } from "../state/restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { findCart } from "../state/cart/Action";
import Footer from "./Footer";

const restaurants = [1, 1, 1, 1, 1, 1];
export const Home = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const {restaurant} = useSelector(store => store)

  // restaurant.restaurants.map((item)=>{console.log(item.images[0])})

  // console.log("restau state in home",restaurant)

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  }, []);

  return (
    <div className="">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center pt-40 lg:pt-80 ">
          <p className="text-3xl lg:text-7xl from-neutral-300 z-10 py-5 text-neutral-200">Fast Eats</p>
          <p className="text-xl z-10 text-gray-400 lg:text-4xl">
          "Dine, Dash, Delight"
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>
      <section className="p-10 lg:px-10 lg:py-20 bg-slate-300">
        <p className="text-2xl font-semibold text-gray-700 py-3 pb-10">
          Popular Meals
        </p>
        <MultiItemCarousel />
      </section>
      {/* <section className="p-10 lg:py-10 lg:py-20"> */}
      <section className="px-5 lg:px-20 pt-5  bg-slate-400">
        <h1 className="text-2xl font-semibold text-gray-700 pb-8 ">
          Order From Popular Restaurants
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurant.restaurants.map((item) => (
            <RestaurantCard item={item}/>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};
