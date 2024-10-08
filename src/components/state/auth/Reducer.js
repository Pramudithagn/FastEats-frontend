import { isPresentInFavorites } from "../../../config/logics";
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  success: null,
  error: null,
  jwt: null,
  favourites: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVOURITE_REQUEST:
      return { ...state, isLoading: true, success: null, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: "Register success",
        jwt: action.payload,
      };

      case GET_USER_SUCCESS:
          return {
            ...state,
            isLoading: false,
            user: action.payload,
            favourites: action.payload.favourites
          };

    case ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favourites: isPresentInFavorites(state.favourites, action.payload)
          ? state.favourites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favourites],
      };

    case LOGOUT:
        return initialState;

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVOURITE_FAILURE:
      return { ...state, isLoading: false, success: null, error: action.payload };

    default:
      return state;
  }
};
