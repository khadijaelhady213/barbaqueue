import { Text, View ,StyleSheet, Image} from 'react-native'
import React, { Component , useEffect, useState } from 'react'


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage, faHome, faSquarePlus, faUser} from '@fortawesome/free-solid-svg-icons';

import HomeScreenComponent from './HomeScreen';
import Profile from './Profile';

const HomeScreen = () => {
  return <HomeScreenComponent />
}
const AddParcelScreen = () => {
  return(
      <View style={styles.container}>
        
          <Text style={styles.text}>AddParcelScreen</Text>
      </View>
  );
}
const ChatScreen = () => {
  return(
      <View style={styles.container}>
          <Text style={styles.text}>chat</Text>
      </View>
  );
}
const UserScreen = () => {
  return <Profile/>
}

const Tab = createBottomTabNavigator();
function App (){
    return (
      <Tab.Navigator>
      <Tab.Screen 
        name='h' 
        component={HomeScreen}
        options={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} size={30} paddingTop='2%' color="#FF8300" />
          ),
        }}
      />
      <Tab.Screen 
        name='h1' 
        component={AddParcelScreen}
        options={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSquarePlus} size={30} paddingTop='2%' color="#FF8300" />
          ),
        }}
      />
      <Tab.Screen 
        name='h2' 
        component={ChatScreen}
        options={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMessage} size={30} paddingTop='2%' color="#FF8300" />
          ),
        }}
      />
      <Tab.Screen 
        name='h4' 
        component={UserScreen}
        options={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} size={30} color="#FF8300" />
          ),
        }}
      />
    </Tab.Navigator>    
       
    )
}


const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'red'

  },

});

export default App;