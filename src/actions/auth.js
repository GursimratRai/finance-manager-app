import { APIUrls } from "../helpers/urls";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOGOUT,
} from "./actionTypes";
import { getFormBody } from "../helpers/utils";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody(
        email,
        password
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //dispatch action to save user
          localStorage.setItem('token',data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.error));
      });
  };
}

export function signupStart() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(successMessage) {
  return {
    type: SIGNUP_SUCCESS,
    error:successMessage
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error:errorMessage
  };
}

export function signup(name,email,password,confirmPassword) {
  console.log('signup',name,email,password,confirmPassword);
  return (dispatch) => {
    dispatch(signupStart());
    
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody(
        name,
        email,
        password,
        confirmPassword
      ),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.success){

        dispatch(signupSuccess(data.message));
        return ;
      }
      dispatch(signupFailed(data.error));
    })
  };
}

export function authenticateUser (user){
  return {
    type:AUTHENTICATE_USER,
    user,
  }
}

export function logoutUser(user){
  return {
    type:LOGOUT
  };
}