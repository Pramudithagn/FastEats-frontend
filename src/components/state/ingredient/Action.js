import axios from 'axios';
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from './ActionType';
import { api } from '../../../config/api';

export const getIngredientsOfRestaurant = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredient/restaurant/${id}/items`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all ingredients ",response.data)
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data // Assuming the response contains the ingredients data
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const createIngredient = ({data,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredient`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredients ",response.data)
      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const createIngredientCategory = ({data,jwt}) => {
  console.log("data ",data,"jwt",jwt)
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredient/category`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredients category",response.data)
      dispatch({
        type:CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const getIngredientCategory = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredient/restaurant/${id}/categories`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get ingredients category",response.data)
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      
    }
  };
};

export const updateStockOfIngredient = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const {data} = await api.put(`/api/admin/ingredient/${id}/updatestock`, 
      { },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: UPDATE_STOCK,
        payload: data
      });
      console.log("update ingredients stock ",data)
    } catch (error) {
        console.log("error ",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};