import axios from "axios";
import { GET_COMPANIES, DELETE_COMPANY } from "./types";

export const getCompanies = () => async (dispatch) => {
  const res = await axios.get("/api/companies");
  dispatch({
    type: GET_COMPANIES,
    payload: res.data,
  });
};

export const deleteCompany = (id) => async (dispatch) => {
  await axios.delete(`/api/companies/${id}`);
  dispatch({
    type: DELETE_COMPANY,
    payload: id,
  });
};
