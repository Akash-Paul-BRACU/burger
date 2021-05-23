import axios from "axios"
import * as actionTypes from "./ActionType"

export const authSuccess = (token, userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token: token,
            userId: userId,
        }
    }
}

const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload:errMsg
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let authUrl = null;
    if(mode === "Sign Up"){
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }
    else{
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }

    const API_KEY = "AIzaSyCPR_-G9h0H6tA6ebtD9APFfi0PS4AhkbM";
    axios.post(authUrl + API_KEY, authData)
    .then(res => {
        dispatch(authLoading(false));
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.locationId);
        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn *1000);
        localStorage.setItem("expirationTime", expirationTime)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
    })
    .catch(err => {
        dispatch(authLoading(true))
        dispatch(authFailed(err.response.data.error.message));
    })
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem("token");
    if(!token){
        dispatch(logout());
    }
    else{
        const expirationTime = new Date(localStorage.getItem("expirationTime"))
        if(expirationTime <= new Date ()){
            dispatch(logout());
        }
        else{
            const userId =localStorage.getItem("userId")
            dispatch(authSuccess(token, userId));
        }
    }
    
    
}