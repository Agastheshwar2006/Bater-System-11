import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import CameraRequestScreen from '../screens/CameraRequestScreen';


export const AppTabNavigator = createBottomTabNavigator({
  LendCameras : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Lend Cameras",
    }
  },
  CameraRequest: {
    screen: CameraRequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Camera Request",
    }
  }
});
