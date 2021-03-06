import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAN_AUTH_ERROR,
} from "../../../constants";
const initialState = {
  authError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, authError: null };

    case LOGIN_FAILED:
      return { ...state, authError: "Login failed" };

    case SIGNOUT_SUCCESS:
      console.log("SignOut success");
      return state;

    case SIGNOUT_FAILED:
      return state;

    case SIGNUP_SUCCESS:
      console.log("Signup success");
      return { ...state, authError: null };

    case SIGNUP_FAILED:
      console.log("Signup failed ");
      return { ...state, authError: action.err.message };

    case CLEAN_AUTH_ERROR:
      return initialState;

    default:
      return state;
  }
};
