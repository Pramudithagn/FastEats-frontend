import axios from 'axios';
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from './ActionType';
import { api } from '../../../config/api';

export const getAddonsOfRestaurant = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/addon/restaurant/${id}/items`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all addons ",response.data)
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data // Assuming the response contains the addons data
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const createAddon = ({data,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/addon`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create addons ",response.data)
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

export const createAddonCategory = ({data,jwt}) => {
  console.log("data ",data,"jwt",jwt)
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/addon/category`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create addons category",response.data)
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

export const getAddonCategory = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/addon/restaurant/${id}/categories`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get addons category",response.data)
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      
    }
  };
};

export const updateStockOfAddon = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const {data} = await api.put(`/api/admin/addon/${id}/updatestock`, 
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
      console.log("update addons stock ",data)
    } catch (error) {
        console.log("error ",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};