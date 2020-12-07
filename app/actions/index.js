import {SET_CATEGORY, SET_FILTER} from '../constant/action-types';

export const setCategory = payload => {
  return {type: SET_CATEGORY, payload};
};
export const setFilter = (filter, value) => {
  return {type: SET_FILTER, payload: {filter, value}};
};
