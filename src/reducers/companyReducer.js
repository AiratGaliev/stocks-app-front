import { GET_COMPANIES, POST_COMPANY } from "../actions/types";
import moment from "moment";

const initialState = {
  companies: [],
  company: {},
  companyName: "",
  date: moment(Date.now()).format("YYYY-MM-DD"),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    case POST_COMPANY:
      return {
        ...state,
        companies: Object.assign(state.companies, Array.from(action.payload)),
      };
    default:
      return state;
  }
}
