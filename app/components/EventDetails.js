import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import Toolbar from './Toolbar';
import EventImage from './EventImage';
import Logo from './Logo';
import Card from './Card';

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    width,
    height,
  },
  top: {
    width,
    height: 200,
    flex: 1,
    backgroundColor: 'black',
  },
  topOver: {
    top: 0,
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
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
  description: {
    padding: 10,
  },
  image: {
    width,
    height: 200,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

const EventDetails = props => {
  let scrollViewRef = React.createRef();
  const {navigation} = props;
  const event = navigation.getParam('event');
  const goToImages = navigation.getParam('goToImages');
  
  const [y, setY] = useState(0);
  useEffect(() => {
    if (goToImages) {
      scrollViewRef.current.scrollTo(y);
    }
  }, [y]);
  return (

    <Fragment>
      <Toolbar
        onLeftElementPress={() => props.navigation.goBack()}
        leftElement="arrow-back"
        centerElement={`QHH - ${event.name}`}
      />
        
      <ScrollView ref={scrollViewRef} style={styles.container}>
        <View style={styles.top}>
          <EventImage
            style={styles.backgroundImage}
            url={event.background}
            cover
          />
          <View style={styles.topOver}>
            <Logo style={styles.logo} url={event.logo} width={70} />
            <Text style={styles.name}>{event.name}</Text>
          </View>
        </View>
        <Text style={styles.title}>Descripcion</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.title}>Evento</Text>
        <Text style={styles.description}>
          Fecha: {moment(event.datetime).format('DD/MM/YYYY')}
          {'\n'}
          Hora: {moment(event.datetime).format('HH:mm')}
        </Text>
        <Text style={styles.title}>Lugar</Text>
        <EventImage url={event.place_image} style={styles.image} />
        <EventImage url={event.place_map} style={styles.image} />
        <Text style={styles.description}>
          Nombre: {event.place_name}
          {'\n'}
          Direccion: {event.place_address}
          {'\n'}
          Telefono: {event.place_phone}
        </Text>
        <Text style={styles.description}>{event.place_description}</Text>
        {event.guests.length > 0 && (
          <Fragment>
            <Text style={styles.title}>Artistas Invitados</Text>
            {event.guests.map(guest => (
              <Card
                logo={guest.image}
                name={guest.name}
                description={guest.description}
                contrast
              />
            ))}
          </Fragment>
        )}
        {event.all_schedules.length > 0 && (
          <Fragment>
            <Text style={styles.title}>Otras Presentaciones</Text>
            {event.all_schedules.map(schedule => (
              <Card
                logo={schedule.place_image}
                name={`${moment(schedule.datetime).format(
                  'DD/MM/YYYY HH:mm',
                )} ($${schedule.price})`}
                description={schedule.place_name}
                contrast
              />
            ))}
          </Fragment>
        )}
        <Text
          style={styles.title}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setY(layout.y);
          }}>
          Imagenes
        </Text>
        {event.images.map(url => (
          <EventImage url={url} style={styles.image} cover />
        ))}
      </ScrollView>
    </Fragment>
  );
};
export default EventDetails;
