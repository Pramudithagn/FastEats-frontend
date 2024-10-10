import { api } from "../../../config/api";
import { clearCartAction } from "../cart/Action";
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getUsersOrdersFailure,
  getUsersOrdersRequest,
  getUsersOrdersSuccess,
} from "./ActionCreator";
import {
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const { data } = await api.post("/api/order", reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;

        dispatch(createOrderSuccess(data));
        dispatch(clearCartAction());
      }
    } catch (error) {
      console.error("error ", error);
      dispatch(createOrderFailure(error));
    }
  };
};

export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      console.log("order action jwt", jwt);
      const data = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch(getUsersOrdersSuccess(data.data));
    } catch (error) {
      dispatch(getUsersOrdersFailure(error));
    }
  };
};

export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const { data } = await api.get("/api/notifications");

      dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      console.error("error ", error);
      dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error });
    }
  };
};

export const cancelOrder = (jwt, id) => {
  return async () => {
    try {
      const data = await api.delete(`/api/order/${id}/cancel`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (error) {
      console.error("cancel order error ", error);
    }
  };
};
