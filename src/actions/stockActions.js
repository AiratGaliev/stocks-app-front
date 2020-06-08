import axios from "axios";
import { GET_STOCKS } from "./types";

export const getStocks = () => async (dispatch) => {
  const res = await axios.get("/api/stocks");
  dispatch({
    type: GET_STOCKS,
    payload: res.data._embedded.stocks,
  });
};
