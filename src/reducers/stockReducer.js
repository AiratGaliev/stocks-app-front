import { GET_STOCKS } from "../actions/types";

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
    default:
      return state;
  }
}
