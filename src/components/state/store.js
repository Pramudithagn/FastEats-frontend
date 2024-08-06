import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./restaurant/Reducer";
import menuItemReducer from "./menu/Reducer";
import cartReducer from "./cart/Reducer";
import { orderReducer } from "./order/Reducer";
import restaurantsOrderReducer from "./restaurant.order/Reducer";
import { ingredientReducer } from "./ingredient/Reducer";
import { LOGOUT } from "./auth/ActionType";

const appReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredient: ingredientReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined; // Reset the state to undefined, triggering a fresh initial state
    }
    return appReducer(state, action);
}

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))