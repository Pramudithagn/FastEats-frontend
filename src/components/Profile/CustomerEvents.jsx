// import React from "react";
// import { EventCard } from "./EventCard";

// export const Events = () => {
//   return (
//     <div className="mt-5 px-5 flex flex-wrap gap-5">
//       {[1,1,1].map((item) => <EventCard />)}
//       {/* {restaurant.restaurantEvents.map((item) => (
//         <EventCard item={item} />
//       ))} */}
//       {/* <div>
//           <img
//           className="rounded-md w-[25rem] h-[25-rem] object-cover"
//             src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=600"
//             alt=""
//           />
//         </div> */}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../Admin/Events/EventCard";
import { getAllEvents, getRestaurnatsEvents } from "../state/restaurant/Action";

const CustomerEvents = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurant, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, [auth.jwt]);

  return (
    <div className="mt-5 pb-10 px-5 lg:pl-56 flex flex-wrap gap-5">
      {restaurant.events.map((item) => (
        <div>
          <EventCard isCustomer={true} item={item} />
        </div>
      ))}
    </div>
  );
};

export default CustomerEvents;