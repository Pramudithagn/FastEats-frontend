import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getRestaurnatsEvents,
} from "../../components/state/restaurant/Action";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import EventCard from "./EventCard";

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

const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  location: Yup.string().required("Location is required"),
  name: Yup.string()
    .required("Event description is required")
    .min(2, "Event description must be at least 2 characters long"),
  startedAt: Yup.date().required("Start date and time are required").nullable(),
  endsAt: Yup.date()
    .required("End date and time are required")
    .min(
      Yup.ref("startedAt"),
      "End date and time must be after start date and time"
    )
    .nullable(),
});

const Events = () => {
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const jwt = localStorage.getItem("jwt");
  const [uploadingImage, setUploadingImage] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
      location: "",
      name: "",
      startedAt: null,
      endsAt: null,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createEventAction({
          data: values,
          restaurantId: restaurant.usersRestaurant?.id,
          jwt,
        })
      );
      handleCloseModal();
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", image);
    setUploadingImage(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
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
  }, [restaurant.usersRestaurant, dispatch, auth.jwt, jwt]);

  return (
    <div>
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={handleOpenModal}
          variant="contained"
          color="secondary"
        >
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 pb-10 flex flex-wrap gap-5">
        {restaurant.restaurantEvents.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
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
                  {uploadingImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {formik.values.image && (
                    <div className="relative">
                      <img
                        className="w-24 h-24 object-cover"
                        src={formik.values.image}
                        alt="Event"
                      />
                      <IconButton
                        onClick={handleRemoveImage}
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
                  )}
                  {formik.errors.image && formik.touched.image && (
                    <div style={{ color: "red" }}>{formik.errors.image}</div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Description"
                  variant="outlined"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formik.values.startedAt}
                    onChange={(newValue) =>
                      formik.setFieldValue("startedAt", newValue)
                    }
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.startedAt &&
                      Boolean(formik.errors.startedAt)
                    }
                    helperText={
                      formik.touched.startedAt && formik.errors.startedAt
                    }
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formik.values.endsAt}
                    onChange={(newValue) =>
                      formik.setFieldValue("endsAt", newValue)
                    }
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.endsAt && Boolean(formik.errors.endsAt)
                    }
                    helperText={formik.touched.endsAt && formik.errors.endsAt}
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
