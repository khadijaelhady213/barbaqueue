import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import testScreen from './screens/testScreen';
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { AppRegistry } from 'react-native';
import { initReactI18next } from 'react-i18next';
import i18n from './lenguages/lenguage';

// Initialize i18next instance with React bindings
i18n.use(initReactI18next).init();

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container} initialRouteName="testScreen">
      <Stack.Screen style={styles.container} name="testScreen" component={testScreen}  options={{ headerShown: false }}/>
        <Stack.Screen style={styles.container} name="WelcomeScreen" component={WelcomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen style={styles.container} name="RegisterScreen" component={RegisterScreen} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  // return (
  //   <View 
  //   style={{ padding:10, top:100}}>
  //   <Card 
  //   title="Barbacoa Camps el Xup" 
  //   price="100€ per persona" 
  //   image={ require("./assets/test1.jpg")}
  //   />
  // </View>
  // )
  
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});
