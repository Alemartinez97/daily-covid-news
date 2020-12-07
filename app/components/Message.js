import Toast from 'react-native-root-toast';

export const toast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
  setTimeout(function() {
    Toast.hide(toast);
  }, 1000);
};