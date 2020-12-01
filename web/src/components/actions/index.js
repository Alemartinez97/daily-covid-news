import { SET_SEARCHNEWS, ADD_NEWS } from "../constant/actions-types";

export const addNews = (payload) => {
  return { type: ADD_NEWS, payload };
};
export const setSearchNews = (payload) => {
  return { type: SET_SEARCHNEWS, payload };
};
