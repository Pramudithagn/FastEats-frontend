import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const cartItems = [1, 1, 1];

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
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Please provide a street address"),
  state: Yup.string().required("Please provide a state"),
  pincode: Yup.string().required("Please provide a pincode"),
  city: Yup.string().required("Please provide a city"),
});

export const Cart = () => {
  const createOrderUsingSelectedAddress = (deliveryAddress) => {};
  const handleOpenAddressModal = () => {
    setOpen(true);
  };
  const handleSubmit = (values) => { console.log(values)};

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          {cartItems.map((item) => (
            <CartItem />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>$1000</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>$21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Plateform Fee</p>
                <p>$5</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>$33</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>$5000</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div className="">
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {/* {auth.user?.addresses.map((item, index) => (
              <AddressCard
                handleSelectAddress={createOrderUsingSelectedAddress}
                item={item}
                showButton={true}
              />
            ))} */}
              {[1, 1, 1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}

              <Card className="flex flex-col justify-center items-center p-5  w-64 ">
                <div className="flex space-x-5">
                  <AddLocationAltIcon />
                  <div className="space-y-5">
                    <p>Add New Address</p>
                    <Button
                      onClick={handleOpenAddressModal}
                      sx={{ padding: ".75rem" }}
                      fullWidth
                      variant="contained"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="streetAddress"
                  label="Street Address"
                  fullWidth
                  variant="outlined"
                  error={!ErrorMessage("streetAddress")}
                  helperText={
                    <ErrorMessage name="streetAddress">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="state"
                  label="state"
                  fullWidth
                  variant="outlined"
                  error={!ErrorMessage("state")}
                  helperText={
                    <ErrorMessage name="state">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="pincode"
                  label="pincode"
                  fullWidth
                  variant="outlined"
                  error={!ErrorMessage("pincode")}
                  helperText={
                    <ErrorMessage name="pincode">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="city"
                  label="city"
                  fullWidth
                  variant="outlined"
                  error={!ErrorMessage("city")}
                  helperText={
                    <ErrorMessage name="city">
                      {(msg) => <span className="text-red-600">{msg}</span>}
                    </ErrorMessage>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                  <Button fullWidth type="submit" variant="contained" color="primary">
                    Deliver Here
                  </Button>
                </Grid>
            </Grid>
            </Form>
            
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
