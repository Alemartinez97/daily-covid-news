import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import api from '../utils/api';
import {storeIdToken, getIdToken, setUser} from '../utils/storage';
import {Text, View, ActivityIndicator} from 'react-native';

const styles = {
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    padding: 20,
    textAlign: "center",
  },
  button: {
    width: 240,
    height: 48,
  },
};

const Login = ({navigation}) => {
  const [userState, setUserState] = useState({
    loggedIn: false,
    checking: true,
  });

  useEffect(() => {
    // first check if user is signed in
    getIdToken()
      .then(idToken => {
        if (idToken) {
          navigation.navigate('Filters');
          return null;
        } else {
          setUserState({
            checking: false,
            loggedIn: false,
          });
        }
      })
      .catch(e => {
        setUserState({
          checking: false,
          loggedIn: false,
        });
      });
  }, []);

  if (userState.checking || userState.loggedIn) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '412697329068-gjcug9nn8g9uq01agmk9k81mu5psmepp.apps.googleusercontent.com',
        offlineAccess: false,
        hostedDomain: '',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await api.post('/login/', {idToken: userInfo.idToken});
      if (res && res.data) {
        await storeIdToken(userInfo.idToken);
        await setUser(res.data.response);
        navigation.navigate('App');
      } else {
        alert('Error al validar ingreso');
      }
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Por favor concede permisos a la aplication para poder ingresar');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Error al intentar ingresar');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(
          'Esta aplicacion require play services, pero no esta disponible o esta desactualziada',
        );
      } else {
        alert(error);
        alert('Error al intentar ingresar');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.info}>
        Ingresa a la aplicacion con tu cuenta de Google para una experiencia mas personalizada
      </Text>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};
export default Login;
