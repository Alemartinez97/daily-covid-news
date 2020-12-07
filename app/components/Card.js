import React from 'react';
import {View, Text} from 'react-native';
import Logo from './Logo';

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  subContainer: {
    flexDirection: 'column',
  },
  logo: {
    marginRight: 10,
  },
  name: {
    color: 'white',
    fontSize: 10,
  },
  value: {
    color: 'white',
    fontSize: 16,
  },
  contrastName: {
    color: 'black',
    fontSize: 10,
  },
  contrastValue: {
    color: 'black',
    fontSize: 16,
  },
};

const Card = ({logo, name, description, contrast}) => {
  return (
    <View style={styles.container}>
      <Logo url={logo} width={40} style={styles.logo} />
      <View style={styles.subContainer}>
        <Text style={contrast ? styles.contrastValue : styles.value}>{name}</Text>
        <Text style={contrast ? styles.contrastName : styles.name}>{description}</Text>
      </View>
    </View>
  );
};
export default Card;
