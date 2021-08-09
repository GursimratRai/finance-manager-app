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

//function for encoding the form data
import { getFormBody ,notify} from "../helpers/utils";

//Start action for login
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
//If Logging in the user Failed
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

//If the user is successfully log in 
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

//Sending an Api Request for checking the credentials of the user.
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
          //if success
          dispatch(loginSuccess(data.data.user));
          //notified success
          notify('success',data.message);
          return;
        }
        //if failed
        dispatch(loginFailed(data.error));
        //notified error
        notify('error',data.error);
      });
  };
}

//Start action for sign up
export function signupStart() {
  return {
    type: SIGNUP_START,
  };
}

//If new user account is successfully created
export function signupSuccess(successMessage) {
  return {
    type: SIGNUP_SUCCESS,
    error:successMessage
  };
}

//If there is an error in creating the user account
export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error:errorMessage
  };
}

//Sending an Api Request for Creating a new account
export function signup(name,email,password,confirmPassword) {
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
        notify('success',data.message);
        return ;
      }
      dispatch(signupFailed(data.error));
      notify('error',data.error);
    })
  };
}

//Action for authenticating the logged in user
export function authenticateUser (user){
  return {
    type:AUTHENTICATE_USER,
    user,
  }
}

//Action for logging out the user
export function logoutUser(user){
  return {
    type:LOGOUT
  };
}