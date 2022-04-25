import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ServerPage from '../Screens/ServerPage';
import ClientPage from '../Screens/ClientPage';
import HomePage from '../Screens/HomePage';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage} />
        <Stack.Screen name="Server" component={ServerPage} />
        <Stack.Screen name="Client" component={ClientPage} />

    </Stack.Navigator>
  );
}

export default MyStack;