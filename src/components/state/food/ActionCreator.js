import * as actionTypes from './ActionType';

export const deleteFoodItemRequest = () => ({
    type: actionTypes.DELETE_FOOD_ITEM_REQUEST,
  });
  
  export const deleteFoodItemSuccess = (foodItemId) => ({
    type: actionTypes.DELETE_FOOD_ITEM_SUCCESS,
    payload: foodItemId,
  });
  
  export const deleteFoodItemFailure = (error) => ({
    type: actionTypes.DELETE_FOOD_ITEM_FAILURE,
    payload: error,
  });

export const getFoodItemsByRestaurantIdRequest = () => ({
    type: actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_REQUEST,
  });
  
  export const getFoodItemsByRestaurantIdSuccess = (foodItems) => ({
    type: actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    payload: foodItems,
  });
  
  export const getFoodItemsByRestaurantIdFailure = (error) => ({
    type: actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_FAILURE,
    payload: error,
  });

export const createFoodItemRequest = () => ({
    type: actionTypes.CREATE_FOOD_ITEM_REQUEST,
  });
  
  export const createFoodItemSuccess = (foodItem) => ({
    type: actionTypes.CREATE_FOOD_ITEM_SUCCESS,
    payload: foodItem,
  });
  
  export const createFoodItemFailure = (error) => ({
    type: actionTypes.CREATE_FOOD_ITEM_FAILURE,
    payload: error,
  });