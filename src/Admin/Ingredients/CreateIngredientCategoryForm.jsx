import React, { useState } from "react";
import { TextField, Button, makeStyles, Card, Modal, Box } from "@mui/material";
import { Create } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../components/state/restaurant/Action";
import { createIngredientCategory } from "../../components/state/ingredient/Action";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Please provide an ingredient category name")
      .min(2, "Category name must be at least 2 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      const data = {
        name: values.name,
        restaurantId: restaurant.usersRestaurant.id,
      };
      dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
      handleClose();
    },
  });

  // const [formData, setFormData] = useState({
  //   name: "",
  // });

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted:", formData);
  //   setFormData({
  //     name: "",
  //   });
  //   const data = {
  //     name: formData.name,
  //     restaurantId: restaurant.usersRestaurant.id,
  //   };
  //   dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
  //   handleClose();
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  return (
    // <div className=" ">
    //   <div className="p-5">
    //     <h1 className="text-gray-400 text-center text-xl pb-10">
    //       Create Ingredient Category
    //     </h1>
    //     <form className="space-y-5" onSubmit={handleFormSubmit}>
    //       <TextField
    //         label="Category Name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleInputChange}
    //         fullWidth
    //       />

    //       <Button type="submit" variant="contained" color="secondary">
    //         Create
    //       </Button>
    //     </form>
    //   </div>
    // </div>
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <TextField
            label="Category Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;