import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, Button, Text, ScrollView, ActivityIndicator, Alert} from 'react-native';
import Toolbar from './Toolbar';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import api from '../utils/api';
import {setCategory, setFilter} from '../actions/index';
import Toggle from './forms/Toggle';
import Drawer from './Drawer';

const styles = {
  label: {
    fontSize: 20,
  },
  wrapper: {
    padding: 10,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: 'black',
    fontSize: 40,
  },
  drawerWrapper: {
    width: '100%',
  },
};

const dates = {
  Hoy: [moment().startOf('day'), moment().endOf('day')],
  'Este Finde': [
    moment()
      .day(6)
      .startOf('day'),
    moment()
      .day(7)
      .endOf('day'),
  ],
  'Esta Semana': [
    moment()
      .day(1)
      .startOf('day'),
    moment()
      .day(7)
      .endOf('day'),
  ],
  'Este Mes': [moment().startOf('month'), moment().endOf('month')],
  Todos: [moment('01/01/1999'), moment('01/01/2999')],
};

const dateOptions = Object.keys(dates).map(day => ({
  id: day,
  name: day,
  dates: `${dates[day][0].toISOString()}|${dates[day][1].toISOString()}`,
}));

const Filters = props => {
  const {location, distance, date, categories, images} = props.filter;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    api
      .get('/category')
      .then(result => {
        props.setCategory(result.data.response);
      })
      .catch(error => {
        console.log('error', error);
      });

    Geolocation.getCurrentPosition(
      position => {
        const coords = (position && position.coords) || {
          latitude: -38.0174836,
          longitude: -57.7406184,
        };
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000},
    );
  }, [api]);

  const searchEvents = () => {
    setSearching(true);
    api
      .post('/search', {
        location,
        distance,
        date: dateOptions.find(it => it.id === date).dates,
        categories,
        images,
        currentLocation:
          location === 'otra' && customLocation
            ? customLocation
            : currentLocation,
      })
      .then(result => {
        const events = result.data.response;
        setSearching(false);
        if (events.length) {
          props.navigation.navigate('Home', {events});
        } else {
          Alert.alert(
            'No hay resultados',
            'No se encontraron resultados, por favor verifica tus filtros',
            [
              {text: 'OK'},
            ],
            {cancelable: true},
          );
        }
      });
  };

  if (searching) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Toolbar
        leftElement="menu"
        centerElement="QHH"
        onLeftElementPress={() => setDrawerOpen(!drawerOpen)}
      />
      {drawerOpen ? (
        <Drawer
          onClose={() => setDrawerOpen(false)}
          onNavigate={route => props.navigation.navigate(route)}
        />
      ) : (
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Ubicacion</Text>
            <Toggle
              options={[
                {id: 'actual', name: 'Actual', disabled: !currentLocation},
                {id: 'otra', name: 'Otra'},
              ]}
              onChange={value => {
                props.setFilter('location', value);
                if (value === 'otra') {
                  props.navigation.navigate('LocationPicker', {
                    coordinates: customLocation || currentLocation,
                    onSelect: region => {
                      setCustomLocation(region);
                    },
                    onCancel: () => {
                      props.setFilter('location', 'actual');
                      setCustomLocation(false);
                    },
                  });
                }
              }}
              value={location}
            />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Distancia</Text>
            <Toggle
              options={[
                {id: 1, name: '1km'},
                {id: 2, name: '2km'},
                {id: 5, name: '5km'},
                {id: 20, name: '20km'},
                {id: 100, name: '+20km'},
              ]}
              onChange={value => {
                props.setFilter('distance', value);
              }}
              value={distance}
            />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Cuando</Text>
            <Toggle
              options={dateOptions}
              onChange={value => {
                props.setFilter('date', value);
              }}
              value={date}
            />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Gustos</Text>
            <Toggle
              options={props.categories}
              onChange={value => {
                props.setFilter('categories', value);
              }}
              value={categories}
              multi
            />
          </View>
          <View style={styles.wrapper}>
            <Button color="black" title="Buscar" onPress={searchEvents} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    filter: state.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategory: category => dispatch(setCategory(category)),
    setFilter: (filter, value) => dispatch(setFilter(filter, value)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);
