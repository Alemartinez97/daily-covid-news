import React, {useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import EventImage from './EventImage';
import Toolbar from './Toolbar';
import Logo from './Logo';
import api from '../utils/api';
import {shortDate, shortTime} from '../utils/format';
import { Icon } from 'react-native-elements';
import { toast } from './Message';

const styles = {
  item: {
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  buttonsContent: {
    flexDirection: 'row',
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "black"
  },
  itemImage: {
    position: "absolute",
    width: 60,
    opacity: 0.4,
  },
  imageLogo: {
    position: "absolute",
    margin: 10,
  },
  itemContent: {
    paddingLeft: 10,
    paddingVertical: 10,
    flexGrow: 1,
  },
  itemHeader: {
    fontSize: 17,
  },
};

const ListFavorites = ({
  navigation,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get('/favorite')
      .then(result => {
        setEvents(result.data.response);
      });
  }, []);

  return (
    <Fragment>
      <Toolbar
        onLeftElementPress={() => navigation.goBack()}
        leftElement="arrow-back"
        centerElement={`QHH - Favoritos`}
      />
      <ScrollView>
        {events.map(event => (
          <View style={styles.item}>
            <View style={styles.itemImageContainer}>
              <EventImage style={styles.itemImage} url={event.background} cover />
              <Logo style={styles.imageLogo} url={event.logo} width={40} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemHeader}>{event.name}</Text>
              <Text>{`${shortDate(event.datetime)} ${shortTime(event.datetime)}`}</Text>
            </View>
            <View style={styles.buttonsContent}>
              <Icon
                size={20}
                raised
                name='remove-red-eye'
                onPress={() => {
                  navigation.navigate('EventDetails', {
                    event,
                  });
                }} />
              <Icon
                size={20}
                raised
                name='close'
                onPress={() => {
                  setEvents(events.filter(it => it.schedule_id !== event.schedule_id));
                  api._delete(`/favorite/${event.schedule_id}`).then(() => {
                    toast('Eliminado de favoritos');
                  });
                }} />
            </View>
          </View>
        ))}
      </ScrollView>
    </Fragment>
  );
};
export default ListFavorites;
