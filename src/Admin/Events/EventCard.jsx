import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../components/state/restaurant/Action";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = dayjs();
      const end = dayjs(item.endsAt);
      const diff = end.diff(now);

      if (diff <= 0) {
        setCountdown("Event has ended");
        return;
      }

      const duration = dayjs.duration(diff);
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();

      setCountdown(`${days} days ${hours} hours ${minutes} minutes left`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);

    return () => clearInterval(interval);
  }, [item.endsAt]);

  const handleDeleteEvent = () => {
    dispatch(
      deleteEventAction({ eventId: item.id, jwt: localStorage.getItem("jwt") })
    );
  };

  return (
    <div>
      <Card sx={{ width: 345, position: "relative" }}>
        <CardMedia
          sx={{
            height: 345,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.5s ease-in-out",
            },
          }}
          image={item.image}
          title="Event Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.name}
          </Typography>
          <div className="py-2 space-y-2">
            <p className="text-md ">
              <PlaceIcon />
              <span>{item.location}</span>
            </p>
            <p className="text-sm text-blue-500">
              {"Starts at :"}{" "}
              {dayjs(item.startedAt).format("MMMM DD, YYYY hh:mm A")}
            </p>
            <p className="text-sm text-red-500">
              {"Ends :"} {dayjs(item.endsAt).format("MMMM DD, YYYY hh:mm A")}
            </p>
          </div>
        </CardContent>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          {countdown}
        </Box>
        {!isCustomer && (
          <CardActions>
            <IconButton onClick={handleDeleteEvent} aria-label="delete event">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
