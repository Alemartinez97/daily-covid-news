import { createStore, combineReducers} from "redux";

import news from "../reducers/news";
import searchnews from "../reducers/searchNews";

const reducers = combineReducers({ news,searchnews });

const store = createStore(
    reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
