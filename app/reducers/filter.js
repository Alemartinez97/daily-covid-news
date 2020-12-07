import {SET_FILTER} from '../constant/action-types';
import {setFilter} from '../utils/storage';

export const initialState = {
  location: 'actual',
  distance: 5,
  date: 'Todos',
  categories: [],
  images: [],
};

const filter = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_FILTER:
      const {filter, value} = payload;
      setFilter(filter, value);
      return {...state, [filter]: value};

    default:
      return state;
  }
};
export default filter;
