import axios from "axios";

// export const API_URL = "http://localhost:8080"
export const API_URL = process.env.REACT_APP_API_URL

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded"

    }
})