import {
  GET_STOCKS,
  GET_STOCK,
  POST_STOCK,
  PATCH_STOCK,
  DELETE_STOCK,
  OPEN_MODAL,
} from "../actions/types";

const initialState = {
  stocks: [],
  stock: {},
  open: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload,
      };
    case GET_STOCK:
      return {
        ...state,
        stock: action.payload,
      };
    case POST_STOCK:
      return {
        ...state,
        stocks: [...state.stocks, action.payload],
      };
    case PATCH_STOCK:
      return {
        ...state,
        stock: action.payload,
        stocks: state.stocks.map((stock) =>
          stock.id === action.payload.id ? action.payload : stock
        ),
      };
    case DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter((stock) => stock.id !== action.payload),
      };
    case OPEN_MODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
}
