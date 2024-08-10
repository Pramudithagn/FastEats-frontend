import logo from "./logo.svg";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { Home } from "./components/Home/Home";
import { RestaurantDetails } from "./components/Restaurant/RestaurantDetails";
import { Cart } from "./components/Cart/Cart";
import { CartItem } from "./components/Cart/CartItem";
import { Profile } from "./components/Profile/Profile";
import { CustomerRoutes } from "./Routes/CustomerRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./components/state/auth/Action";
import { findCart } from "./components/state/cart/Action";
import { Routers } from "./Routes/Routers";
import { getRestaurantByUserId } from "./components/state/restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.role == "ROLE_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <NavBar/> */}
      {/* <Home/> */}
      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}
      {/* <CartItem/> */}
      {/* <Profile/> */}
      {/* <CustomerRoutes /> */}
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
