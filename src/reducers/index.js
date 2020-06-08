import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import companyReducer from "./companyReducer";

export default combineReducers({
  stock: stockReducer,
  company: companyReducer,
});
