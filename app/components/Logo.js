import React from 'react';
import {Image} from 'react-native';

const styles = {
  logo: {
    overflow: 'hidden',
    backgroundColor: 'white',
  },
};

const Logo = ({url, width, style = {}}) => {
  return (
    <Image
      resizeMode="cover"
      source={{uri: url}}
      style={{width, height: width, borderRadius: width / 2, ...styles.logo, ...style}}
    />
  );
};
export default Logo;
