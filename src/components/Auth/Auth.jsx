import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordRequest from "./ResetPasswordRequest";
import ResetPasswordForm from "./ResetPasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Auth = ({ open, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login" ||
          location.pathname === "/account/reset-password-request" ||
          location.pathname === "/account/reset-password"
        }
        onClose={handleClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegistrationForm />
          ) : location.pathname === "/account/login" ? (
            <LoginForm />
          ) : location.pathname === "/account/reset-password" ? (
            <ResetPasswordForm />
          ) : (
            <ResetPasswordRequest />
          )}
          <div className="flex justify-center mt-5">
            {location.pathname === "/account/reset-password-request" ||
            location.pathname === "/account/reset-password" ? (
              <Button onClick={() => navigate("/account/login")}>
                Go Back To Login
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/account/reset-password-request")}
              >
                Forgot Pasword
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
