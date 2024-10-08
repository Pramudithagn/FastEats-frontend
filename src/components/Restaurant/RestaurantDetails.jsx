import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { FoodCard } from "./FoodCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../state/restaurant/Action";
import { getFoodItemsByRestaurantId } from "../state/food/Action";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

export const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, food } = useSelector((store) => store);
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dispatch(getRestaurantById({ jwt, restaurantId: id }));
      dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(
      getFoodItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: foodType === "seasonal",
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        foodCategory: selectedCategory,
      })
    );
  }, [selectedCategory, foodType]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="px-5 lg:px-20">
        <section>
          <h3 className="text-gray-500 py-2 mt-10"></h3>
          <div className="hidden sm:block">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="40vh" />
                ) : (
                  <img
                    className="w-full h-[40vh] object-cover"
                    src={restaurant.restaurant?.images[0]}
                    alt=""
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="40vh" />
                ) : (
                  <img
                    className="w-full h-[40vh] object-cover"
                    src={restaurant.restaurant?.images[1]}
                    alt=""
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="40vh" />
                ) : (
                  <img
                    className="w-full h-[40vh] object-cover"
                    src={restaurant.restaurant?.images[2]}
                    alt=""
                  />
                )}
              </Grid>
            </Grid>
          </div>

          <div className="lg:hidden md:hidden ">
            <Slider {...settings}>
              {restaurant.restaurant?.images.map((item, index) => (
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-[22rem] h-[16rem] object-cover object-center justify-center items-center"
                    src={item}
                    alt={""}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="pt-3 pb-5">
            {loading ? (
              <>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
              </>
            ) : (
              <>
                <h1 className="text-4xl py-2 font-semibold">
                  {restaurant.restaurant?.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  {restaurant.restaurant?.description}
                </p>
                <div className="space-y-3 mt-3">
                  <p className="text-gray-500 flex items-center gap-3">
                    <PlaceIcon />
                    <span>
                      {restaurant.restaurant?.address.city}
                      {". "}
                      {restaurant.restaurant?.address.country}
                    </span>
                  </p>
                  <p className="text-gray-500 flex items-center gap-3">
                    <CalendarTodayIcon />
                    <span>
                      Everyday : {restaurant.restaurant?.openingHours}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Divider />
      <div className="px-5 lg:px-20  bg-gray-800">
        <section className="pt-[2rem] lg:flex relative ">
          <div className="space-y-10 lg:w-[20%] filter pb-20">
            <div className="box space-y-5 lg:sticky top-28">
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  {" "}
                  Food Type
                </Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup
                    onChange={handleFilter}
                    name="food_type"
                    value={foodType}
                  >
                    {foodTypes.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio color="blue" />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
              <Divider />
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  {" "}
                  Food Category
                </Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup
                    onChange={handleFilterCategory}
                    name="food_category"
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio color="blue" />}
                      label="All"
                    />
                    {restaurant.categories.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item.name}
                        control={<Radio color="blue" />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="space-y-5 pb-20 lg:w-[80%] lg:pl-10">
            {loading
              ? [1, 2, 3, 4, 5].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    width="100%"
                    height={150}
                  />
                ))
              : food.foodItems.map((item) => <FoodCard item={item} />)}
          </div>
        </section>
      </div>
    </div>
  );
};
