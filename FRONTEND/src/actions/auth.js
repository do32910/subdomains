import * as types from "./types";

const userLogout = () => ({
  type: types.AUTH_LOGOUT,
});


export function doLogin(username, token) {
    return {
        type: types.AUTH_LOGIN,
        username: username,
        token: token
    }
}

export function doLogout(){
  return{
    type: types.AUTH_LOGOUT
  }
}

// export const doLogout = () => dispatch => {
//   dispatch(userLogout());
// };
