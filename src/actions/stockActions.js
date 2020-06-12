import axios from "axios";
import {
  GET_STOCKS,
  POST_STOCK,
  PATCH_STOCK,
  DELETE_STOCK,
  GET_ERRORS,
} from "./types";

export const getStocks = () => async (dispatch) => {
  const res = await axios.get("/api/stocks");
  dispatch({
    type: GET_STOCKS,
    payload: res.data,
  });
};

export const createStock = (stock) => async (dispatch) => {
  try {
    const res = await axios.post("/api/stocks/create", stock);
    dispatch({
      type: POST_STOCK,
      payload: res.data,
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
    const res = await axios.patch(`/api/stocks/${stock.id}`, stock);
    dispatch({
      type: PATCH_STOCK,
      payload: res.data,
    });
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
