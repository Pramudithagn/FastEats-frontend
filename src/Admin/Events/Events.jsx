import { Box, Button, Card, Grid, Modal, TextField, Typography, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction, getRestaurnatsEvents } from "../../components/state/restaurant/Action";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");

  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    // const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
    // console.log("date:", date);
    // console.log("formattedDate:", formattedDate);

    // setFormValues({ ...formValues, [dateType]: formattedDate });
    setFormValues({ ...formValues, [dateType]: date });

  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    // formik.setFormValues("images", [...formik.values.images, image]);
    setFormValues({ ...formValues, image: image });
    setUploadingImage(false);
  };

  const handleRemoveImage = () => {
    // const updatedImages = [...formValues.image];
      const updatedImage = "";
    // updatedImages.splice(index, 1);
    // formik.setFieldValue("images", updatedImages);
    setFormValues({ ...formValues, image: updatedImage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    console.log("Image URL:", formValues, restaurant.usersRestaurant?.id);
    handleCloseModal()
    // setFormValues(initialValues);
    // handleCloseModal();
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div>
      <div className="p-5">
        <Button sx={{ padding: "1rem 2rem" }} onClick={handleOpenModal} variant="contained" color="secondary">
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 pb-10 flex flex-wrap gap-5">
        {restaurant.restaurantEvents.map((item) => (
          <EventCard item={item} />
        ))}
        {/* <div>
          <img
          className="rounded-md w-[25rem] h-[25-rem] object-cover"
            src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div> */}
      </div>

      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <TextField name="image" label="Image URL" variant="outlined" fullWidth value={formValues.image} onChange={handleFormChange} />
              </Grid> */}
              <Grid className="flex flex-wrap gap-5" item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <label className="relative" htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                    <AddPhotoAlternateIcon className="text-white" />
                  </span>
                  {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                <div className="flex flex-wrap gap-2">
                  {/* {formValues.image.map((image, index) => ( */}
                    {(formValues.image !== "") &&
                    <div className="relative">
                      <img
                        className="w-24 h-24 object-cover"
                        // key={index}
                        src={formValues.image}
                        alt={`EventImage`}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage()}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          outline: "none",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                    }
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField name="location" label="Location" variant="outlined" fullWidth value={formValues.location} onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="name" label="Event Description" variant="outlined" fullWidth value={formValues.name} onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;