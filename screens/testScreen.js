import { Text, View ,StyleSheet, Image} from 'react-native'
import React, { Component , useEffect, useState } from 'react'


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage, faHome, faSquarePlus, faUser} from '@fortawesome/free-solid-svg-icons';


//const 
// const HomeScreen = () => {
//   const [datosUsuario, setdatosUsuario] = useState("");
  

//   fetch('http://192.168.1.53:3000/users')
//   .then(response => response.json())
//   .then(data => {
//     // Process the received data
//     setdatosUsuario(JSON.stringify(data))
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error("***",error);
//   });
  
//   return(
//     <View style={styles.container}>
//   <Text style={styles.text}>{JSON.parse(datosUsuario)[1].name}</Text>
// </View>
//   );
// }
import HomeScreenComponent from './HomeScreen';
import UserScreenComponent from './UserScreen'

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
  return <UserScreenComponent/>
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