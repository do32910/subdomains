import * as types from "./types";

const userLogout = () => ({
  type: types.AUTH_LOGOUT,
});


export function doLogin(username, token, userId) {
    return {
        type: types.AUTH_LOGIN,
        username: username,
        token: token,
        userId: userId
    }
}

export function doLogout(){
  return{
    type: types.AUTH_LOGOUT
  }
}
