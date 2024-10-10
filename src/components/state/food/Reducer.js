import * as actionTypes from "./ActionType";

const initialState = {
  foodItems: [],
  loading: false,
  error: null,
  search: [],
  message: null,
};

const foodItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_FOOD_ITEM_REQUEST:
    case actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.DELETE_FOOD_ITEM_REQUEST:
    case actionTypes.SEARCH_FOOD_ITEM_REQUEST:
    case actionTypes.UPDATE_FOOD_ITEMS_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case actionTypes.CREATE_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        foodItems: [...state.foodItems, action.payload],
        message: "Food Created Successfully",
      };
    case actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        foodItems: action.payload,
      };
    case actionTypes.DELETE_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        foodItems: state.foodItems.filter(
          (foodItem) => foodItem.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_FOOD_ITEMS_AVAILABILITY_SUCCESS:
      console.log("updated items id ", action.payload.id);
      return {
        ...state,
        loading: false,
        foodItems: state.foodItems.map((foodItem) =>
          foodItem.id === action.payload.id ? action.payload : foodItem
        ),
      };
    case actionTypes.SEARCH_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload,
      };
    case actionTypes.CREATE_FOOD_ITEM_FAILURE:
    case actionTypes.GET_FOOD_ITEMS_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.DELETE_FOOD_ITEM_FAILURE:
    case actionTypes.SEARCH_FOOD_ITEM_FAILURE:
    case actionTypes.UPDATE_FOOD_ITEMS_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default foodItemReducer;
