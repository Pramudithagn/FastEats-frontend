// import React, { useState } from 'react';
// import { TextField, Button, makeStyles, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { Create } from '@mui/icons-material';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { createCategoryAction } from '../../components/state/restaurant/Action';
// import { createAddon } from '../../components/state/addon/Action';

// const CreateAddonForm = ({handleClose}) => {
//     const {id}=useParams();
//     const dispatch=useDispatch();
//     const {auth,restaurant,addon}=useSelector(store=>store)
//     const jwt = localStorage.getItem("jwt")

//   const [formData, setFormData] = useState({
//     name: '',
//     addonCategoryId:''
//   });

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form submitted:', formData);

//     setFormData({
//       name: '',
//       addonCategoryId:''
//     })
//     handleClose()
//     const data={...formData,restaurantId:restaurant.usersRestaurant.id}
//     dispatch(createAddon({jwt:auth.jwt || jwt,data}))
    
//   };

//   const handleInputChange = (event) => {

//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className=''>
//         <div className='p-5'>
//           <h1 className='text-gray-400 text-center text-xl pb-10'>Create Addon</h1>
//         <form className="space-y-5" onSubmit={handleFormSubmit}>
//       <TextField
//         label="Addon"
//         name="name"
//         value={formData.name}
//         onChange={handleInputChange}
//         fullWidth
//       />
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Category</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={formData.addonCategoryId}
//           label="Category"
//           name='addonCategoryId'
//           onChange={handleInputChange}
//         >
          
//           {addon.category.map((item)=> <MenuItem value={item.id}>{item.name}</MenuItem>)}
//         </Select>
//       </FormControl>
     
//       <Button type="submit" variant="contained" color="secondary">
//         Create
//       </Button>
//     </form>
//     </div>
//     </div>
//   );
// };

// export default CreateAddonForm;
import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAddon } from '../../components/state/addon/Action';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateAddonForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant, addon } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Addon name is required")
      .min(2, "Addon name must be at least 2 characters long"),
    addonCategoryId: Yup.string()
      .required("Select a category"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      addonCategoryId: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      const data = {
        ...values,
        restaurantId: restaurant.usersRestaurant.id,
      };
      dispatch(createAddon({ jwt: auth.jwt || jwt, data }));
      handleClose();
    },
  });

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Addon</h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <TextField
            label="Addon"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <FormControl fullWidth error={formik.touched.addonCategoryId && Boolean(formik.errors.addonCategoryId)}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={formik.values.addonCategoryId}
              label="Category"
              name="addonCategoryId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {addon.category.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            {formik.touched.addonCategoryId && formik.errors.addonCategoryId ? (
              <div style={{ color: 'red', marginTop: '0.5rem' }}>{formik.errors.addonCategoryId}</div>
            ) : null}
          </FormControl>

          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddonForm;
