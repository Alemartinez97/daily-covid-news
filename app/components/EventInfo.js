import React from 'react';
import {View} from 'react-native';
import EventInfoItem from './EventInfoItem';
import {shortDate, shortTime} from '../utils/format'

const styles = {
  container: {
    flexDirection: 'row',
  },
};

const EventInfo = ({
  event,
  style = {},
}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <EventInfoItem name="Dia" value={shortDate(event.datetime)} />
      <EventInfoItem name="Hora" value={shortTime(event.datetime)} />
      <EventInfoItem name="KM" value={Math.floor(event.distance / 100) / 10} />
      <EventInfoItem name="Precio" value={`$${event.price}`} />
    </View>
  );
};
export default EventInfo;
