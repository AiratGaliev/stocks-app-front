import axios from "axios";
import { GET_STOCKS, DELETE_STOCK } from "./types";

export const getStocks = () => async (dispatch) => {
  const res = await axios.get("/api/stocks");
  dispatch({
    type: GET_STOCKS,
    payload: res.data,
  });
};

export const deleteStock = (id) => async (dispatch) => {
  await axios.delete(`/api/stocks/${id}`);
  dispatch({
    type: DELETE_STOCK,
    payload: id,
  });
};
