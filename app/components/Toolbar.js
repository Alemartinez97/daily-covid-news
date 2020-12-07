import React from 'react';
import {Toolbar as MuiToolbar} from 'react-native-material-ui';
import {primaryBack, primaryFore} from '../utils/theme';

const style = {
  container: {backgroundColor: primaryBack, color: primaryFore},
};

const Toolbar = props => {
  return <MuiToolbar style={style} {...props} />;
};

export default Toolbar;
