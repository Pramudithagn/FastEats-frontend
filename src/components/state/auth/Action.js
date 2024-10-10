import { api } from "../../../config/api";
import {
  ADD_TO_FAVOURITE_FAILURE,
  ADD_TO_FAVOURITE_REQUEST,
  ADD_TO_FAVOURITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const data = await api.post("/auth/register", reqData.data);
    if (data.data.token) localStorage.setItem("jwt", data.data.token);
    if (data.data.role === "ROLE_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.data.token });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.error(error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const data = await api.post("/auth/signin", reqData.data);

    if (data.data.token) localStorage.setItem("jwt", data.data.token);
    if (data.data.role === "ROLE_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    console.error(error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const data = await api.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.error(error);
  }
};

export const addToFavourite =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
    try {
      const { data } = await api.put(
        `/api/restaurant/${restaurantId}/add-favourite`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_TO_FAVOURITE_FAILURE, payload: error });
      console.error(error);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error(error);
  }
};

export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({ type: REQUEST_RESET_PASSWORD_REQUEST });
  try {
    const { data } = await api.post(
      `/auth/reset-password-request?email=${email}`,
      {}
    );

    dispatch({ type: REQUEST_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.error("error ", error);
    dispatch({ type: REQUEST_RESET_PASSWORD_FAILURE, payload: error.message });
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({ type: REQUEST_RESET_PASSWORD_REQUEST });
  try {
    const { data } = await api.post(`/auth/reset-password`, reqData.data);
    reqData.navigate("/password-change-success");

    dispatch({ type: REQUEST_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.error("error ", error);
    dispatch({ type: REQUEST_RESET_PASSWORD_FAILURE, payload: error.message });
  }
};
