import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';

import Card from './screens/Card';
export default function App() {
  // return <WelcomeScreen/>;
  return (
    <View 
    style={{ padding:10, top:100}}>
    <Card 
    title="Barbacoa Camps el Xup" 
    price="100€ per persona" 
    image={ require("./assets/test1.jpg")}
    />
  </View>
  )
  
}

