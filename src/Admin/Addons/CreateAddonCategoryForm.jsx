import React from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAddonCategory } from "../../components/state/addon/Action";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateAddonCategoryForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Please provide an addon category name")
      .min(2, "Category name must be at least 2 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        restaurantId: restaurant.usersRestaurant.id,
      };
      dispatch(createAddonCategory({ data, jwt: auth.jwt || jwt }));
      handleClose();
    },
  });

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Addon Category
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

export default CreateAddonCategoryForm;
