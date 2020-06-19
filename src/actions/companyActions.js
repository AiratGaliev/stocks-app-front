import axios from "axios";
import {
  GET_COMPANIES,
  POST_COMPANY,
  PATCH_COMPANY,
  DELETE_COMPANY,
  GET_ERRORS,
} from "./types";

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const getCompanies = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/companies");
    dispatch({
      type: GET_COMPANIES,
      payload: res.data,
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const createCompany = (company) => async (dispatch) => {
  try {
    const res = await axios.post("/api/companies/create", company);
    dispatch({
      type: POST_COMPANY,
      payload: res.data,
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const editCompany = (company) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/companies/${company.id}`, company);
    dispatch({
      type: PATCH_COMPANY,
      payload: res.data,
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/companies/${id}`);
    dispatch({
      type: DELETE_COMPANY,
      payload: id,
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
