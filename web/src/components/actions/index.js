import { ADD_SEARCHNEWS, ADD_NEWS } from "../constant/actions-types";

export const addNews = (payload) => {
  return { type: ADD_NEWS, payload };
};
export const addSearchNews = (payload) => {
  return { type: ADD_SEARCHNEWS, payload };
};
