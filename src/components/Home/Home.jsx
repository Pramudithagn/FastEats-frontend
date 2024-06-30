import React from "react";
import "./Home.css";
import { MultiItemCarousel } from "./MultiItemCarousel";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

const restaurants = [1, 1, 1, 1, 1, 1];
export const Home = () => {
  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Food</p>
          <p className="text-xl z-10 text-gray-300 lg:text-4xl">
            HEy taste food heyyy
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>
      <section className="p-10 lg:px-10 lg:py-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Top Meals
        </p>
        <MultiItemCarousel />
      </section>
      {/* <section className="p-10 lg:py-10 lg:py-20"> */}
      <section className="px-5 lg:px-20 pt-5">

        <h1 className="text-2xl font-semibold text-gray-400 pb-8 ">
          Order From Our Recommended Restaurants
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurants.map((item) => (
            <RestaurantCard />
          ))}
        </div>
      </section>
    </div>
  );
};
