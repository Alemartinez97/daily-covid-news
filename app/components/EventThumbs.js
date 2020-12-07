import React, { Fragment } from 'react';
import EventImage from './EventImage';
import {Dimensions, TouchableOpacity, Text, View} from 'react-native';

const {width} = Dimensions.get('window');

const styles = {
  container: {
    width: '100%',
    height: 80,
    flexDirection: "row",
  },
  image: {
    width: width / 3,
    height: 80,
    padding: 2,
  },
  viewMore: {
    width: width / 3,
    height: 80,
    position: "absolute",
    top: 0,
    right: 0,
  },
  viewMoreBg: {
    width: width / 3,
    height: 80,
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.4,
  },
  viewMoreText: {
    color: "white",
    textAlign: "center",
    paddingTop: 30,
    fontSize: 20,
  },
};

const EventThumbs = ({event, onPress}) => {
  const urls = event.images.filter((it, i) => it && i < 3);
  const diff = event.images.length - urls.length;
  return (
    <View style={styles.container}>
      {urls.map(url => (
        <EventImage key={url} url={url} style={styles.image} cover />
      ))}
      {diff > 0 && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.viewMore}
        >
          <View style={styles.viewMoreBg} />
          <Text
            style={styles.viewMoreText}>
            {diff} Mas
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default EventThumbs;
