import { Button, Card } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <div>
      <Card className="flex space-x-5 w-64 p-5">
        <HomeIcon />

        <div className="space-y-3 text-gray-500">
          <h1 className="font-semibold text-lg text-white">Home</h1>
          <p>
            {item?.streetAddress}, {item?.city}, {item?.postalCode},{" "}
            {item?.state}, {item.country}
          </p>

          {showButton && (
            <Button
              onClick={() => handleSelectAddress(item)}
              variant="outlined"
              className="w-full"
              color="secondary"
            >
              select
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AddressCard;
