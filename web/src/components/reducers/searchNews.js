import { ADD_SEARCHNEWS } from "../constant/actions-types";

const news = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_SEARCHNEWS:
      return payload;
    default:
      return state;
  }
};
export default news;
