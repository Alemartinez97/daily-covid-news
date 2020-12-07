import React, {useState} from 'react';
import {View, Button} from 'react-native';
import MapView from 'react-native-maps';
import Toolbar from './Toolbar';
import { Icon } from 'react-native-elements'

const styles = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
  marker: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ({navigation}) => {
  const coordinates = navigation.getParam('coordinates');
  const onSelect = navigation.getParam('onSelect');
  const onCancel = navigation.getParam('onCancel');
  const initialRegion = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.02,
  };
  const [region, setRegion] = useState(initialRegion);
  return (
    <View style={styles.container}>
      <Toolbar
        onLeftElementPress={() => {
          onCancel();
          navigation.goBack();
        }}
        leftElement="arrow-back"
        centerElement={`QHH - Selecciona Ubicacion`}
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={region => {
          setRegion(region);
        }}
      />
      <View style={styles.marker} pointerEvents="none">
        <Icon name="room" size={40} />
      </View>
      <Button
        title="Seleccionar"
        onPress={() => {
          onSelect(region);
          navigation.goBack();
        }}
      />
    </View>
  );
};
