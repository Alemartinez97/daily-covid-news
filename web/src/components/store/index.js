import { createStore, combineReducers} from "redux";

import news from "../reducers/news";
import search from "../reducers/search";

const reducers = combineReducers({ news,search });

const store = createStore(
    reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
