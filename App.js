import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import MyStack from './Routes/StackNavigator'


export default function App(){
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}