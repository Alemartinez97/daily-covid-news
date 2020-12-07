import React from 'react';
import {ActionButton} from 'react-native-material-ui';

const styles = {
  container: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
  icon: {
    color: 'black',
  },
};

const Fab = ({icon, onPress, style}) => {
  return (
    <ActionButton
      icon={icon}
      onPress={onPress}
      style={{...styles, container: {...styles.container, ...(style || {})}}}
    />
  );
};
export default Fab;
