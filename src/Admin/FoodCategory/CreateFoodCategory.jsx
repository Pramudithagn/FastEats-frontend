import React from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../components/state/restaurant/Action";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateFoodCategory = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Please provide a category name")
      .min(2, "Category name must be at least 2 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.categoryName,
        restaurant: { id },
      };
      dispatch(createCategoryAction({ reqData: data, jwt: auth.jwt || jwt }));
      handleClose();
    },
  });

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Category
        </h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <TextField
            label="Category Name"
            name="categoryName"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={
              formik.touched.categoryName && Boolean(formik.errors.categoryName)
            }
            helperText={
              formik.touched.categoryName && formik.errors.categoryName
            }
          />
          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategory;
