import { createStore } from "redux";
import rootReducer from "../reducers/auth.js";

const store = createStore(rootReducer);

export default store;