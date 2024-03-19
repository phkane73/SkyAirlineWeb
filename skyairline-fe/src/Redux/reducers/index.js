import { combineReducers } from "redux";
import FlightReducer from "./SessionReducer";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
  Session: FlightReducer,
  Auth: AuthReducer
});

export default reducers;
