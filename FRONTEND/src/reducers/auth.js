import * as types from "../actions/types";

const initialState = {
  username: "",
  token: "",
  isLoggedIn: false,
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        isLoggedIn: true
      };
    case types.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
