import { combineReducers } from "redux";
import auth from "./auth";
import { initialState } from "../store";

const appReducer = combineReducers({
	auth,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
