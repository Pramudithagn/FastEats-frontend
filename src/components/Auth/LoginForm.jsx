import React from 'react'
import {Button,TextField,Typography} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../state/auth/Action';


const initialValues = {
    email: "",
    password: "",
  };

export const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

        const handleSubmit = (values) => {
      
          // console.log("Login form values:", values);
          dispatch(loginUser({ data: values, navigate }));
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 2,padding:"1rem" }}
            >
              Login
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Typography>
      </div>
  )
}
