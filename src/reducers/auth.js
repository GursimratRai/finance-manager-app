import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_START,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOGOUT
} from "../actions/actionTypes";

const initilAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initilAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn:true,
        user:action.user
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn:false,
        user:{}
      }
    default:
      return state;
  }
}
