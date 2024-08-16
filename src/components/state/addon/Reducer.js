import {
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

const initialState = {
  addons: [],
  update: null,
  category: [],
};

export const addonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        addons: action.payload,
      };
    case GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        addons: [...state.addons, action.payload],
      };
    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        addons: state.addons.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};