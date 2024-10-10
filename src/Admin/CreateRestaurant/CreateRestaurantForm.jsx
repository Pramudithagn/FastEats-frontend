import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createRestaurant } from "../../components/state/restaurant/Action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { CircularProgress, IconButton } from "@mui/material";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  phone: "",
  facebook: "",
  instagram: "",
  openingTime: dayjs(),
  closingTime: dayjs(),

  images: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cuisineType: Yup.string().required("Cuisine Type is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  stateProvince: Yup.string().required("State/Province is required"),
  postalCode: Yup.number()
    .required("Postal Code is required")
    .typeError("Postal Code must be a number"),
  country: Yup.string().required("Country is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.number()
    .required("Phone number is required")
    .typeError("Phone number must be a number"),
  facebook: Yup.string().url("Invalid URL"),
  instagram: Yup.string().url("Invalid URL"),
  openingTime: Yup.date().required("Opening time is required"),
  closingTime: Yup.date().required("Closing time is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        phone: values.phone,
        facebook: values.facebook,
        instagram: values.instagram,
      },
      openingHours: `${
        values.openingTime ? values.openingTime.format("hh:mm A") : ""
      } - ${values.closingTime ? values.closingTime.format("hh:mm A") : ""}`,
      images: values.images,
    };

    dispatch(createRestaurant({ data, jwt }));
  };

  const handleTimeChange = (time, timeType) => {
    if (time && dayjs(time).isValid()) {
      formik.setFieldValue(timeType, time);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl ">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
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
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt={`ProductImage ${index + 1}`}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
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
                ))}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cuisineType &&
                  Boolean(formik.errors.cuisineType)
                }
                helperText={
                  formik.touched.cuisineType && formik.errors.cuisineType
                }
              />
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Opening Time"
                  value={formik.values.openingTime}
                  onChange={(time) => handleTimeChange(time, "openingTime")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      fullWidth
                      error={
                        formik.touched.openingTime &&
                        Boolean(formik.errors.openingTime)
                      }
                      helperText={
                        formik.touched.openingTime && formik.errors.openingTime
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Closing Time"
                  value={formik.values.closingTime}
                  onChange={(time) => handleTimeChange(time, "closingTime")}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      fullWidth
                      error={
                        formik.touched.closingTime &&
                        Boolean(formik.errors.closingTime)
                      }
                      helperText={
                        formik.touched.closingTime && formik.errors.closingTime
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.touched.streetAddress && formik.errors.streetAddress
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.stateProvince &&
                  Boolean(formik.errors.stateProvince)
                }
                helperText={
                  formik.touched.stateProvince && formik.errors.stateProvince
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="facebook"
                name="facebook"
                label="Facebook"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.facebook}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
                helperText={formik.touched.facebook && formik.errors.facebook}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.instagram && Boolean(formik.errors.instagram)
                }
                helperText={formik.touched.instagram && formik.errors.instagram}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="secondary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
