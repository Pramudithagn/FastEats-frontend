import { Button, Card } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen  px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5 m-5">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />
          <h1 className="py-5 text-2xl font-semibold text-center">Order Placed Successfully</h1>
          <p className="py-3 text-center text-gray-400">
            Thank you for choosing us
          </p>
          <p className="py-2 text-center text-gray-200 text-lg">
            Have a nice day !
          </p>
          <Button
            variant="contained"
            color="secondary"
            className="my-5"
            sx={{ margin: "1rem 0rem" }}
            onClick={navigateToHome}
          >
            Back To Home
          </Button>
        </Card>
      </div>
    </div>
  );
};
