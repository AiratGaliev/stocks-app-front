import axios from "axios";
import { GET_STOCKS, DELETE_STOCK, GET_ERRORS } from "./types";

export const getStocks = () => async (dispatch) => {
  const res = await axios.get("/api/stocks");
  dispatch({
    type: GET_STOCKS,
    payload: res.data,
  });
};

export const createStock = (stock) => async (dispatch) => {
  try {
    await axios.post("/api/stocks/create", stock);
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

export const editStock = (stock) => async (dispatch) => {
  try {
    await axios.patch(`/api/stocks/${stock.id}`, stock);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteStock = (id) => async (dispatch) => {
  await axios.delete(`/api/stocks/${id}`);
  dispatch({
    type: DELETE_STOCK,
    payload: id,
  });
};
