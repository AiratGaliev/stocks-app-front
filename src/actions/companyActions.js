import axios from "axios";
import { GET_COMPANIES, DELETE_COMPANY, GET_ERRORS } from "./types";

export const getCompanies = () => async (dispatch) => {
  const res = await axios.get("/api/companies");
  dispatch({
    type: GET_COMPANIES,
    payload: res.data,
  });
};

export const createCompany = (company) => async (dispatch) => {
  try {
    await axios.post("/api/companies/create", company);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const editCompany = (company) => async (dispatch) => {
  try {
    await axios.patch(`/api/companies/${company.id}`, company);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  await axios.delete(`/api/companies/${id}`);
  dispatch({
    type: DELETE_COMPANY,
    payload: id,
  });
};
