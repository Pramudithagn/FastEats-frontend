import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MenuCard } from "./MenuCard";

const categories = ["rice", "noodles", "pizza", "burger", "Grilled"]
const foodTypes = [
    {label:"All", value:"all"}, 
    {label:"Vegetarian", value:"vegetarian"}, 
    {label:"Non-Vegetarian", value:"non_vegetarian"}, 
    {label:"Seasonal", value:"seasonal"},
]

const menu = [1,1,1,1,1]

export const RestaurantDetails = () => {

    const [foodType, setFoodType] = useState("all")

    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name)
    }

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">breadcrumb</h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://img.freepik.com/free-photo/happy-waiter-serving-food-
                                 group-cheerful-friends-pub_637285-12525.jpg?ga=GA1.1.370232724.1715709909&semt=sph"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://img.freepik.com/free-photo/happy-waiter-serving-food-
                                 group-cheerful-friends-pub_637285-12525.jpg?ga=GA1.1.370232724.1715709909&semt=sph"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://img.freepik.com/free-photo/happy-waiter-serving-food-
                                 group-cheerful-friends-pub_637285-12525.jpg?ga=GA1.1.370232724.1715709909&semt=sph"
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">Pizza Hut</h1>
          <p className="text-gray-500 mt-1"> In a lacinia lacus, eu consectetur est. Sed accumsan malesuada tortor, nec lobortis justo 
            dictum vel. Sed bibendum mi vitae facilisis aliquam. Vestibulum malesuada imperdiet molestie. Suspendisse lacinia euismod risus 
            et euismod. Nulla a iaculis justo.</p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <PlaceIcon />
              <span>Col. SL</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Everyday : 9.00 AM - 9.00 PM</span>
            </p>
          </div>
        </div>
      </section>
      <Divider/>
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
            <div className="box space-y-5 lg:sticky top-28">
                <div>
                    <Typography variant="h5" sx={{paddingBottom:"1rem"}}> Food Type</Typography>
                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                        <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                            {foodTypes.map((item) => (<FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />))}
                        </RadioGroup>
                    </FormControl>
                </div>
                <Divider/>
                <div>
                    <Typography variant="h5" sx={{paddingBottom:"1rem"}}> Food Category</Typography>
                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                        <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                            {categories.map((item) => (<FormControlLabel key={item} value={item} control={<Radio />} label={item} />))}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>

        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.map((item) => <MenuCard/>)}
        </div>
      </section>
    </div>
  );
};
