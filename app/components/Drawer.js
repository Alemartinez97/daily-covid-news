import React, {useEffect, useState} from 'react';
import {Drawer, Avatar} from 'react-native-material-ui';
import {GoogleSignin} from '@react-native-community/google-signin';
import {clearIdToken, getUser} from '../utils/storage';
import { BackHandler } from 'react-native';

export default ({ onNavigate, onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(u => setUser(u));
  }, []);

  const backButtonHandler = () => {
    onClose();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, []);

  const userSafe = userProp => {
    if (user) {
      return String(user[userProp] || ' ');
    }
    return ' ';
  };

  const getUserInitials = () => {
    if (user) {
      return String(user.name || ' ')
        .split(' ')
        .map(it => (it.length ? it[0] : ' '))
        .join('');
    }
    return ' ';
  };

  const signOut = async () => {
    GoogleSignin.configure({
      webClientId:
        '412697329068-gjcug9nn8g9uq01agmk9k81mu5psmepp.apps.googleusercontent.com',
      offlineAccess: false,
      hostedDomain: '',
    });
    try {
      await clearIdToken();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    onNavigate('Login');
  };

  return (
    <Drawer>
      <Drawer.Header>
        <Drawer.Header.Account
          avatar={<Avatar text={getUserInitials()} />}
          footer={{
            dense: true,
            centerElement: {
              primaryText: userSafe('name'),
              secondaryText: userSafe('email'),
            },
          }}
        />
      </Drawer.Header>
      <Drawer.Section
        divider
        items={[
          {
            icon: 'star-border',
            value: 'Favoritos',
            onPress: () => {
              onNavigate('ListFavorites');
              setTimeout(() => {
                onClose();
              }, 1000);
            },
          },

        ]}
      />

      <Drawer.Section
        title="Personal"
        items={[
          {
            icon: 'close',
            value: 'Cerrar Sesion',
            onPress: () => signOut(),
          },
        ]}
      />
    </Drawer>
  );
};
