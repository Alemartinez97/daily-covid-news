import { ADD_SEARCHNEWS } from "../constant/actions-types";

const searchNews = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_SEARCHNEWS:
      return [...state, payload];
    default:
      return state;
  }
};
export default searchNews;
