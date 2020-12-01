import { SET_SEARCHNEWS } from "../constant/actions-types";

const search = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCHNEWS:
      return payload;
    default:
      return state;
  }
};
export default search;
