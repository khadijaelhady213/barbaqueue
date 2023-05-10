import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';

import Card from './screens/Card';
import ListingDetailsScreen from './screens/ListingDetailsScreen';

import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';


export default function App() {
   return <RegisterScreen/>;
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

