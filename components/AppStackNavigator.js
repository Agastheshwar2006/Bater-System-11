import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LendCameraScreen from '../screens/LendCameraScreen';
import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  LendCameraList : {
    screen : LendCameraScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'LendCameraList'
  }
);
