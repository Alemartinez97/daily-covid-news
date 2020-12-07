import React, {useState, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppNavigator from './components/AppNavigator';
import reducers from './reducers';
import {getFilters} from './utils/storage';

const initialStore = createStore(reducers);
const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    getFilters().then(filters => {
      setStore(
        createStore(reducers, {
          filter: filters,
        }),
      );
    });
  }, [true]);

  return store ? (
    <Provider store={store}>
      <AppContainer theme="light" />
    </Provider>
  ) : null;
};

console.disableYellowBox = true;

export default App;
