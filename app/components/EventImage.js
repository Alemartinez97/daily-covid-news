import React from 'react';
import {Image, Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

const EventImage = ({url, cover, style = {}}) => {
  return (
    <View style={{width, height: '100%', ...style}}>
      <Image
        resizeMode={cover ? 'cover' : 'contain'}
        source={{uri: url}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};
export default EventImage;
