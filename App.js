import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import NavBar from './screens/NavBar';
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { AppRegistry } from 'react-native';
import { initReactI18next } from 'react-i18next';
import i18n from './lenguages/lenguage';
import MapScreen from './screens/Profile';
import UserScreen from './screens/UserScreen';
import Profile from './screens/Profile';
import AddParcelScreen from './screens/AddParcelScreen';
import GetImages from './screens/GetImages'
// Initialize i18next instance with React bindings
i18n.use(initReactI18next).init();

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container} initialRouteName="WelcomeScreen">
        <Stack.Screen style={styles.container} name="NavBar" component={NavBar}  options={{ headerShown: false }}/>
        <Stack.Screen style={styles.container} name="WelcomeScreen" component={WelcomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen style={styles.container} name="Profile" component={Profile}  options={{ headerShown: false }}/>
        <Stack.Screen style={styles.container} name="RegisterScreen" component={RegisterScreen} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );

  
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});
