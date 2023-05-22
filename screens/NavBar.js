import { Text, View ,StyleSheet, Image} from 'react-native'
import React, { Component , useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage, faHome, faSquarePlus, faUser} from '@fortawesome/free-solid-svg-icons';
import HomeScreenComponent from './HomeScreen';
import AddParcelScreenComponent from './AddParcelScreen'
import Profile from './Profile';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const HomeScreen = () => {
  return <HomeScreenComponent />
}
const AddParcelScreen = () => {
  return <AddParcelScreenComponent/>
}
const ChatScreen = () => {
  return(
      <View style={styles.container}>
          <Text style={styles.text}>chat</Text>
      </View>
  );
}

const UserScreen = ({ user }) => {
  
  return <Profile user={user} />; //llamar a la pantalla del usuario enviandole el objeto con la info del usuario
};

const Tab = createBottomTabNavigator();
function App (){

  const route = useRoute();
  const { user } = route.params 
  console.log("el user es: "+user.name)

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
        initialParams={{ user }} //eviar el objeto con la info del usuario a la constante que llama al persil del usuario actual
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