import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  
  import React, { useEffect } from "react";
  import { useLocation, useNavigate, useParams } from "react-router-dom";
  
  import { useDispatch, useSelector } from "react-redux";
  import { deleteFoodAction, getFoodItemsByRestaurantId, updateFoodItemsAvailability } from "../../components/state/food/Action";
  import { updateStockOfIngredient } from "../../components/state/ingredient/Action";
  import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
  import { categorizeIngredients } from "../../components/util/categorizeIngredients";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Create, Remove } from "@mui/icons-material";
  
  const FoodTable = ({ isDashboard, name }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { food, ingredient, restaurant, auth } = useSelector((store) => store);
    const { id } = useParams();
    const jwt = localStorage.getItem("jwt");
  
    useEffect(() => {
      if (restaurant.usersRestaurant) {
        dispatch(
          getFoodItemsByRestaurantId({
            restaurantId: restaurant.usersRestaurant?.id,
            jwt: localStorage.getItem("jwt"),
            seasonal: false,
            vegetarian: false,
            nonveg: false,
            foodCategory: "",
          })
        );
      }
    }, [ingredient.update, restaurant.usersRestaurant]);
  
    // console.log(
    //   "-------- ",
    //   food.foodItems[1].ingredient,
    //   categorizeIngredients(food.foodItems[1].ingredients)
    // );
  
    const handleFoodAvialability = (foodId) => {
      dispatch(updateFoodItemsAvailability({ foodId, jwt: auth.jwt || jwt }));
    };
  
    const handleDeleteFood = (foodId) => {
      console.log(auth.jwt);
      console.log(jwt);
      dispatch(deleteFoodAction({ foodId, jwt: auth.jwt || jwt }));
    };
  
    return (
      <Box width={"100%"}>
        <Card className="mt-1">
          <CardHeader
            title={name}
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
            action={
              <IconButton onClick={() => navigate("/admin/restaurant/add-food")}>
                <Create />
              </IconButton>
            }
          />
          <TableContainer>
            <Table aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                  {!isDashboard && <TableCell sx={{ textAlign: "" }}>Ingredients</TableCell>}
                  <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell> */}
  
                  <TableCell sx={{ textAlign: "center" }}>Availabilty</TableCell>
                  {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {food.foodItems?.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      {" "}
                      <Avatar alt={item.name} src={item.images[0]} />{" "}
                    </TableCell>
  
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="caption">{item.brand}</Typography>
                      </Box>
                    </TableCell>
  
                    {!isDashboard && (
                      <TableCell>
                        {Object.keys(categorizeIngredients(item?.ingredients))?.map((category) => (
                          <div key={category}>
                            <p className="font-semibold">{category}</p>
                            <div className="pl-5">
                              {categorizeIngredients(item?.ingredients)[category].map((ingredient, index) => (
                                <div key={ingredient.id} className="flex gap-1 items-center">
                                  <div>
                                    <HorizontalRuleIcon sx={{ fontSize: "1rem" }} />
                                  </div>
                                  <div key={ingredient.id} className="flex gap-4 items-center">
                                    <p>{ingredient.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </TableCell>
                    )}
                    <TableCell sx={{ textAlign: "center" }}>${item.price}</TableCell>
  
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button color={item.available ? "success" : "error"} variant="text" onClick={() => handleFoodAvialability(item.id)}>
                        {item.available ? "in stock" : "out of stock"}
                      </Button>
                    </TableCell>
  
                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton onClick={() => handleDeleteFood(item.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
  
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={food.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  };
  
  export default FoodTable;