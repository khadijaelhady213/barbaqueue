import { StatusBar } from 'expo-status-bar';
import { Text, View, } from 'react-native';
import axios from 'axios';


import Card from './screens/Card';
import { useEffect, useState } from 'react';
// import ListingDetailsScreen from './screens/ListingDetailsScreen';
// import MessagesScreen from './screens/MessagesScreen';
import WelcomeScreen from './screens/WelcomeScreen';
export default function App() {
  
   return <WelcomeScreen/>;
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

