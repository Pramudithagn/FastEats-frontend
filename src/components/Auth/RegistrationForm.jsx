import React from 'react'
import {Button,MenuItem,Select,TextField,Typography} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../state/auth/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  };

      // const handleSubmit = (values) => {
    
      //   // You can handle login submission here, e.g., send data to your server
      //   console.log("Login form values:", values);
      //   dispatch(registerUser({ data: values, navigate }));
      // };
    
export const RegistrationForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
    
      console.log("Login form values:", values);
      dispatch(registerUser({ data: values, navigate }));
    };

  return (
    <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
        //   validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="fullName"
              id="fullName"
              autoComplete="fullName"
            //   helperText={<ErrorMessage name="fullName" />}
            />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              id="email"
              autoComplete="email"
            //   helperText={<ErrorMessage name="email" />}
            />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            //   helperText={<ErrorMessage name="password" />}
            />
            <Field
              className="mt-3"
              as={Select}
              variant="outlined"
              margin="normal"
              fullWidth
              name="role"
              id="role"
              // autoComplete="role"
            //   helperText={<ErrorMessage name="role" />}
            >
              <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
            </Field>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2,padding:"1rem" }}
            >
              Login
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account ?{" "}
        <Button onClick={() => navigate("/account/login")}>
            Login
        </Button>
        </Typography>
      </div>
  )
}