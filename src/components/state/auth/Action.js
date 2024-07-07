import { api } from "../../../config/api"
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

export const registerUser = (reqData) => async(dispatch) => {
    dispatch({type: REGISTER_REQUEST})
    try{
        const data = await api.post('/auth/register', reqData.data)
        console.log(data.data)
        console.log(data.data.token)
        if(data.data.token) localStorage.setItem("jwt", data.data.token)
            if(data.data.role === "ROLE_OWNER"){
                reqData.navigate("/admin/restaurant")
            }
            else{
                reqData.navigate("/")
            }
            dispatch({type: REGISTER_SUCCESS, payload: data.data.token})
            console.log(data, "Successfully registered")
    }
    catch(error){
        dispatch({type: REGISTER_FAILURE, payload: error})
        console.log(error)
    }

}

export const loginUser = (reqData) => async(dispatch) => {
    console.log("entered data----------------",reqData)
    dispatch({type: LOGIN_REQUEST})
    try{
        const data = await api.post('/auth/signin', reqData.data)
        console.log("fetched data----------------",data)

        if(data.data.token) localStorage.setItem("jwt", data.data.token)
            if(data.data.role === "ROLE_OWNER"){
                reqData.navigate("/admin/restaurant")
            }
            else{
                reqData.navigate("/")
            }
            dispatch({type: LOGIN_SUCCESS, payload: data.data.token})

    }
    catch(error){
        dispatch({type: LOGIN_FAILURE, payload: error})
        console.log(error)
    }

}

export const getUser = (jwt) => async(dispatch) => {
    dispatch({type: GET_USER_REQUEST})
    try{
        const data = await api.get('/api/user/profile', {
            headers:{ Authorization: `Bearer ${jwt}`}
        })

        dispatch({type: GET_USER_SUCCESS, payload: data.data})
        // console.log("profile :"+data.data)
        console.log("profile :"+JSON.stringify(data.data, null, 2))

    }
    catch(error){
        dispatch({type: GET_USER_FAILURE, payload: error})
        console.log(error)
    }
    
}

export const addToFavourite = ({jwt, restaurantId}) => async(dispatch) => {
    dispatch({type: ADD_TO_FAVOURITE_REQUEST})
    try{
        console.log(jwt)
        const data = await api.put(`/api/restaurant/${restaurantId}/add-favourite`, {} , {
            headers:{ Authorization: `Bearer ${jwt}`}
        })

        dispatch({type: ADD_TO_FAVOURITE_SUCCESS, payload: data.data})
        console.log("Added to the favourites :"+data)

    }
    catch(error){
        dispatch({type: ADD_TO_FAVOURITE_FAILURE, payload: error})
        console.log(error)
    }

}

export const logout = () => async(dispatch) => {
    try{

        localStorage.clear()
        dispatch({type: LOGOUT})
        console.log("logged out")

    }
    catch(error){
        console.log(error)
    }

}