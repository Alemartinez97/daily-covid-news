import React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {toast} from './Message';
import EventInfo from './EventInfo';
import EventImage from './EventImage';
import EventThumbs from './EventThumbs';
import Logo from './Logo';
import Card from './Card';
import Fab from './Fab';
import api from '../utils/api';

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: 'black',
    flex: 1,
    width,
    height,
  },
  top: {
    flex: 1,
  },
  topOver: {
    top: 0,
    position: 'absolute',
    height: '100%',
  },
  backgroundImage: {
    opacity: 0.3,
  },
  logo: {
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  bottom: {
    height: 160,
  },
  controls: {
    backgroundColor: 'green',
  },
  topContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    width,
    marginBottom: 10,
  },
  favorite: {
    bottom: 50,
    width: 40,
    height: 40,
  },
};

const Event = ({event, onPressInfo}) => {
  const [favorite, setFavorite] = useState(event.favorite);
  const guest = event.guests ? event.guests[0] : null;

  const handleAddFavorite = id => {
    if (favorite) {
      api._delete(`/favorite/${id}`).then(result => {
        setFavorite(0);
        toast('Eliminado de favoritos');
      });
    } else {
      api
        .post('/favorite', {
          event_schedule_id: id,
        })
        .then(result => {
          setFavorite(1);
          toast('Añadido a favoritos');
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <EventImage
          style={styles.backgroundImage}
          url={event.background}
          cover
        />
        <View style={styles.topOver}>
          <View style={styles.topContainer}>
            <Logo style={styles.logo} url={event.logo} width={70} />
            <Text style={styles.name}>{event.name}</Text>
            <EventInfo event={event} />
          </View>
          <View style={styles.cardsContainer}>
            <Fab
              style={styles.favorite}
              icon={favorite ? 'star' : 'star-border'}
              onPress={() => {
                handleAddFavorite(event.schedule_id);
              }}
            />
            <Card
              logo={event.place_image}
              name={event.place_name}
              description={event.place_address}
            />
            {guest && (
              <Card
                logo={guest.image}
                name={guest.name}
                description="Artista invitado"
              />
            )}
          </View>

          <Fab
            style={styles.fab}
            icon="more-horiz"
            onPress={() => {
              onPressInfo(event);
            }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <EventThumbs
          event={event}
          onPress={() => {
            onPressInfo(event, true);
          }}
        />
      </View>
    </View>
  );
};
export default Event;
