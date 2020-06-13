import axios from "axios";
import {
  GET_STOCKS,
  POST_STOCK,
  PATCH_STOCK,
  DELETE_STOCK,
  GET_ERRORS,
  OPEN_MODAL,
} from "./types";

export const getErrors = (error) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: error.response.data,
  });
};

export const getStocks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stocks");
    dispatch({
      type: GET_STOCKS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error));
  }
};

export const createStock = (stock) => async (dispatch) => {
  try {
    const res = await axios.post("/api/stocks/create", stock);
    dispatch({
      type: POST_STOCK,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error));
  }
};

export const modalStatus = (status) => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: status,
  });
};

export const editStock = (stock) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/stocks/${stock.id}`, stock);
    dispatch({
      type: PATCH_STOCK,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error));
  }
};

export const deleteStock = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/stocks/${id}`);
    dispatch({
      type: DELETE_STOCK,
      payload: id,
    });
  } catch (error) {
    dispatch(getErrors(error));
  }
};
