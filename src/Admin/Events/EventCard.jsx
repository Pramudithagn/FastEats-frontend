import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../components/state/restaurant/Action";
import dayjs from "dayjs";

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();
  const handleDeleteEvent = () => {
    dispatch(
      deleteEventAction({ eventId: item.id, jwt: localStorage.getItem("jwt") })
    );
  };
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{
            height: 345,
            "&:hover": {
              transform: "scale(1.1)", // Example: Scale the image on hover
              transition: "transform 0.5s ease-in-out", // Example: Apply a smooth transition effect
            },
          }}
          image={item.image}
          title="green iguana"
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

            {/* <p className="text-sm text-blue-500">{item.startedAt}</p>
            <p className="text-sm text-red-500">{item.endsAt}</p> */}
            <p className="text-sm text-blue-500">
              {"Starts at :"} {dayjs(item.startedAt).format("MMMM DD, YYYY hh:mm A")}
            </p>
            <p className="text-sm text-red-500">
            {"Ends :"} {dayjs(item.endsAt).format("MMMM DD, YYYY hh:mm A")}
            </p>
          </div>
        </CardContent>
        {!isCustomer && (
          <CardActions>
            <IconButton
              onClick={handleDeleteEvent}
              aria-label="add to favorites"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
