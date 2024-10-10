import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizeAddons } from "../util/categorizeAddons";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../state/cart/Action";
import { grey } from "@mui/material/colors";

// const addonItems = [
//   {
//     category: "Protien",
//     addons: ["Chicken breast", "Bacon strips"],
//   },
//   {
//     category: "Nuts & seeds",
//     addons: ["Cashews"],
//   },
// ];

export const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCheckboxChange = (itemName) => {
    if (selectedAddons.includes(itemName)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== itemName));
    } else {
      setSelectedAddons([...selectedAddons, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();

    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        addons: selectedAddons,
      },
    };
    console.log(data);
    dispatch(addItemToCart(data));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Accordion sx={{ bgcolor: grey[800] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between ">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt=""
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>${item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeAddons(item.addons)).map(
                (addonCategory) => (
                  <div>
                    <p>{addonCategory}</p>
                    <FormGroup>
                      {categorizeAddons(item.addons)[addonCategory].map(
                        (addon) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="blue"
                                onChange={() =>
                                  handleCheckboxChange(addon.name)
                                }
                              />
                            }
                            label={addon.name}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>
            <div className="pt-5">
              <Button
                color="secondary"
                variant="contained"
                disabled={!item.available}
                type="submit"
              >
                {item.available ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};
