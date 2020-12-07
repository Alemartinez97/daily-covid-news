import React, {useEffect, useState, Fragment} from 'react';
import Toolbar from './Toolbar';
import {ScrollView, View} from 'react-native';

import Event from './Event';
import api from '../utils/api';

const Home = props => {
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   api
  //     .get('/data')
  //     .then(result => {
  //       setEvents(result.data.response.events);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // }, true);

  const {navigation} = props;
  const events = navigation.getParam('events');

  const onPressInfo = (event, goToImages) =>
    props.navigation.navigate('EventDetails', {
      event,
      goToImages,
    });

  return (
    <Fragment>
      <Toolbar
        onLeftElementPress={() => props.navigation.goBack()}
        leftElement="arrow-back"
        centerElement="QHH - Resultados"
      />
      <View>
        <ScrollView horizontal pagingEnabled>
          {events.map(event => (
            <Event
              key={event.schedule_id}
              event={event}
              onPressInfo={onPressInfo}
            />
          ))}
        </ScrollView>
      </View>
    </Fragment>
  );
};
export default Home;
