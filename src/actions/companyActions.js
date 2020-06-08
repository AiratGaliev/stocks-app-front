import axios from "axios";
import { GET_COMPANIES } from "./types";

export const getCompanies = () => async (dispatch) => {
  const res = await axios.get("/api/companies");
  dispatch({
    type: GET_COMPANIES,
    payload: res.data,
  });
};
