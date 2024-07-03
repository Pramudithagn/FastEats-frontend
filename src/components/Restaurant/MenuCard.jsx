import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ingredientItems = [
  {
    category: "Protien",
    ingredients: ["Chicken breast", "Bacon strips"],
  },
  {
    category: "Nuts & seeds",
    ingredients: ["Cashews"],
  },
];

export const MenuCard = () => {

  const handleCheckBoxChange=(value) =>{
    console.log("value")
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-
              mozzarella-cheese-slice-generative-ai_188544-12347.jpg?t=st=1719655178~exp=1719658778~hmac=24a8e064654f50f1d1e23c9b
              5e27d029b4e2bd78508b9439251a284b8e47c8f0&w=826"
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">Pizza</p>
              <p>$799</p>
              <p className="text-gray-400">Hot hot pizza</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form action="">
          <div className="flex gap-5 flex-wrap">
            {ingredientItems.map((item) => (
              <div>
                <p>{item.category}</p>
                <FormGroup>
                  {item.ingredients.map((item) => (
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleCheckBoxChange(item)}/>}
                      label={item}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={false} type="submit">{true?"Add to cart":"Out of stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
