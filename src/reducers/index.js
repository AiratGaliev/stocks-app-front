import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import companyReducer from "./companyReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  stock: stockReducer,
  company: companyReducer,
  errors: errorReducer,
});
