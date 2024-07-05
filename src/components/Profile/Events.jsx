import React from "react";
import { EventCard } from "./EventCard";

export const Events = () => {
  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {[1,1,1].map((item) => <EventCard />)}
      {/* {restaurant.restaurantsEvents.map((item) => (
        <EventCard item={item} />
      ))} */}
      {/* <div>
          <img
          className="rounded-md w-[25rem] h-[25-rem] object-cover"
            src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div> */}
    </div>
  );
};
