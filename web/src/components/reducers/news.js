import {
  ADD_NEWS,
} from "../constant/actions-types";

const news = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEWS:
      return payload;
    default:
      return state;
  }
};
export default news;
