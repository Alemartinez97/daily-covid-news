import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
import Filters from './Filters';
import EventDetails from './EventDetails';
import LocationPicker from './LocationPicker';
import Login from './Login';
import ListFavorites from './ListFavorites';
const AppNavigator = createStackNavigator(
  {
    Filters,
    Home,
    EventDetails,
    LocationPicker,
    ListFavorites,
  },
  {
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    Login,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Login',
  },
);

// export default AppNavigator;
