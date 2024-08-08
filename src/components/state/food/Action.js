import { api } from "../../../config/api";
import {
  createFoodItemFailure,
  createFoodItemRequest,
  createFoodItemSuccess,
  deleteFoodItemFailure,
  deleteFoodItemRequest,
  deleteFoodItemSuccess,
  getFoodItemsByRestaurantIdFailure,
  getFoodItemsByRestaurantIdRequest,
  getFoodItemsByRestaurantIdSuccess,
} from "./ActionCreator";
import {
  DELETE_FOOD_ITEM_FAILURE,
  DELETE_FOOD_ITEM_REQUEST,
  DELETE_FOOD_ITEM_SUCCESS,
  SEARCH_FOOD_ITEM_FAILURE,
  SEARCH_FOOD_ITEM_REQUEST,
  SEARCH_FOOD_ITEM_SUCCESS,
  UPDATE_FOOD_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_FOOD_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_FOOD_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/ingredients/food/16

export const createFoodItem = ({food,jwt}) => {
  return async (dispatch) => {
    dispatch(createFoodItemRequest());
    try {
      const { data } = await api.post("api/admin/food", food,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created food ", data);
      dispatch(createFoodItemSuccess(data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createFoodItemFailure(error));
    }
  };
};

export const getFoodItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch(getFoodItemsByRestaurantIdRequest());

    try {
      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
        &seasonal=${reqData.seasonal}&category=${reqData.foodCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("food item by restaurants ", data);
      dispatch(getFoodItemsByRestaurantIdSuccess(data));
    } catch (error) {
      dispatch(getFoodItemsByRestaurantIdFailure(error));
    }
  };
};

export const searchFoodItem = ({keyword,jwt}) => {
  console.log("datakey ", keyword);

  return async (dispatch) => {
    dispatch({ type: SEARCH_FOOD_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/food/search?name=${keyword}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data ----------- ", data);
      dispatch({ type: SEARCH_FOOD_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_FOOD_ITEM_FAILURE });
    }
  };
};

export const getAllIngredientsOfFoodItem = (reqData) => {
  return async (dispatch) => {
    dispatch(getFoodItemsByRestaurantIdRequest());
    try {
      const { data } = await api.get(
        `api/food/restaurant/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("Food item by restaurants ", data);
      dispatch(getFoodItemsByRestaurantIdSuccess(data));
    } catch (error) {
      dispatch(getFoodItemsByRestaurantIdFailure(error));
    }
  };
};

export const updateFoodItemsAvailability = ({foodId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_FOOD_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`/api/admin/food/${foodId}`, {},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update FoodItems Availability ", data);
      dispatch({ type: UPDATE_FOOD_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ",error)
      dispatch({
        type: UPDATE_FOOD_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
};
};

export const deleteFoodAction = ({foodId,jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_FOOD_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/food/${foodId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete food ", data);
    dispatch({ type: DELETE_FOOD_ITEM_SUCCESS, payload: foodId });
  } catch (error) {
    dispatch({ type: DELETE_FOOD_ITEM_FAILURE, payload: error });
  }
};