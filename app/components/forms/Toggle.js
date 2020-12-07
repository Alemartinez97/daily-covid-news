import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'black',
    backgroundColor: '#ccc',
    fontSize: 15,
    marginBottom: 1,
    marginRight: 1,
  },
  selectedPill: {
    color: 'white',
    backgroundColor: '#2f2f2f',
  },
  firstPill: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  lastPill: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
};

const Toggle = ({options, onChange, value, multi}) => {
  const isSelected = id => {
    return (Array.isArray(value) ? value : [value]).includes(id);
  };
  const handleOnPress = v => {
    if (multi) {
      if (value.includes(v)) {
        onChange(value.filter(it => it !== v));
      } else {
        onChange([...value, v]);
      }
    } else {
      onChange(v);
    }
  };
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          disabled={option.disabled}
          onPress={() => handleOnPress(option.id)}>
          <Text
            style={{
              ...styles.pill,
              ...(isSelected(option.id) ? styles.selectedPill : {}),
              ...(index === 0 ? styles.firstPill : {}),
              ...(index === options.length - 1 ? styles.lastPill : {}),
            }}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Toggle;
