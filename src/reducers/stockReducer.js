import { GET_STOCKS, DELETE_STOCK } from "../actions/types";

const initialState = {
  stocks: [],
  stock: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload,
      };
    case DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter((stock) => stock.id !== action.payload),
      };
    default:
      return state;
  }
}
