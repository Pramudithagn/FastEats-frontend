import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../../Admin/Events/EventCard";
import { getAllEvents } from "../state/restaurant/Action";

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