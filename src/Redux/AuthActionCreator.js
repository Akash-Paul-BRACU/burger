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

export const auth = (email, password, mode) => dispatch => {
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
        dispatch(authSuccess(res.data.idToken, res.data.localId))
    })
}