import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {RegistrationForm} from "./RegistrationForm";
import {LoginForm} from "./LoginForm";
import { Box, Button, Modal } from '@mui/material';

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
  
export const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const handleOnClose = () => navigate("/")

  return (
    <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        //   location.pathname === "/account/reset-password-request" ||
        //   location.pathname === "/account/reset-password"
        }
        onClose={handleOnClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegistrationForm />
          ) : <LoginForm />
        //   : location.pathname === "/account/login" ? (
        //     <LoginForm />
        //   ) : location.pathname === "/account/reset-password" ? <ResetPasswordForm/>: (
        //     <ResetPasswordRequest />
        //   )
          }
          {/* <div className="flex justify-center mt-5">
            {location.pathname === "/account/reset-password-request" || location.pathname === "/account/reset-password"  ? (
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
            <Snackbar
              sx={{ zIndex: 50 }}
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleCloseSnackBar}
              // handleClose={handleCloseSnackBar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity={auth.error?"error":"success"} sx={{ width: "100%" }}>
                {auth.success || auth.error}
              </Alert>
            </Snackbar>
          </div> */}
        </Box>
      </Modal>
  )
}
