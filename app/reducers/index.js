import {combineReducers} from 'redux';

import categories from '../reducers/categories';
import filter from './filter';

export default combineReducers({
  categories,
  filter,
});
