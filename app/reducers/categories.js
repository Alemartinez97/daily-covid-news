import {SET_CATEGORY} from '../constant/action-types';

const categories = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_CATEGORY:
      return payload.categories;
    default:
      return state;
  }
};
export default categories;
