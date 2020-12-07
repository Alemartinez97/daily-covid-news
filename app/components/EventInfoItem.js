import React from 'react';
import {View, Text} from 'react-native';

const styles = {
  container: {
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  value: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
};

const EventInfoItem = ({name, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
export default EventInfoItem;
