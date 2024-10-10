import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateAddonCategoryForm from "./CreateAddonCategoryForm";
import { useEffect, useState } from "react";
import CreateAddonForm from "./CreateAddonForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddonCategory,
  getAddonsOfRestaurant,
  updateStockOfAddon,
} from "../../components/state/addon/Action";
import { getRestaurantById } from "../../components/state/restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Addons = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, addon } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  console.log("ing", addon);
  const [openAddonCategory, setOpenAddonCategory] = useState(false);
  const handleOpenAddonCategory = () => setOpenAddonCategory(true);
  const handleCloseAddonCategory = () => setOpenAddonCategory(false);

  const [openAddon, setOpenAddon] = useState(false);
  const handleOpenAddon = () => setOpenAddon(true);
  const handleCloseAddon = () => setOpenAddon(false);

  const handleUpdateStocke = (id) => {
    dispatch(updateStockOfAddon({ id, jwt }));
  };

  return (
    <div className="px-2">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <Card className="mt-2 lg:ml-4">
            <CardHeader
              title={"Items"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenAddon}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer className="h-[41vh] lg:h-[85vh] ">
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>

                    <TableCell>Name</TableCell>

                    <TableCell>Category</TableCell>

                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="lg:overflow-y-auto">
                  {addon.addons.map((item, index) => (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      key={item.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{item?.id}</TableCell>

                      <TableCell className="">{item.name}</TableCell>
                      <TableCell className="">
                        {item.addonCategory.name}
                      </TableCell>

                      <TableCell className="">
                        <Button
                          onClick={() => handleUpdateStocke(item.id)}
                          color={item.inStock ? "success" : "primary"}
                        >
                          {item.inStock ? "in stock" : "out of stock"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="mt-2">
            <CardHeader
              title={"Category"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenAddonCategory}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer>
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>

                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addon.category?.map((item, index) => (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      key={item.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{item?.id}</TableCell>

                      <TableCell className="">{item.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={openAddon}
        onClose={handleCloseAddon}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="mx-20"
      >
        <Box sx={style}>
          <CreateAddonForm handleClose={handleCloseAddon} />
        </Box>
      </Modal>

      <Modal
        open={openAddonCategory}
        onClose={handleCloseAddonCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateAddonCategoryForm handleClose={handleCloseAddonCategory} />
        </Box>
      </Modal>
    </div>
  );
};

export default Addons;
