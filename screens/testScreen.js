import { Text, View ,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage, faHome, faSquarePlus, faUser} from '@fortawesome/free-solid-svg-icons';


const HomeScreen = () => {
  return(
    <View style={styles.container}>
    <Text style={styles.text}>Home</Text>
</View>
  );
}
const AdScreen = () => {
  return(
      <View style={styles.container}>
          <Text style={styles.text}>ad</Text>
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
  return(
      <View style={styles.container}>
          <Text style={styles.text}>user</Text>
      </View>
  );
}
const Tab = createBottomTabNavigator();
function App (){
    return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}> 
        <Tab.Screen 
            name='h' 
            component={HomeScreen}
            
            options={{ 
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faHome} size={30} paddingTop='2%' color="#FF8300" />
                ),
                
            }}
            
        />
         <Tab.Screen 
            name='h1' 
            component={AdScreen}
            options={{ 
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faSquarePlus} size={30} paddingTop='2%' color="#FF8300" />
                ),
            }}
        />
         <Tab.Screen 
            name='h2' 
            component={ChatScreen}
            options={{ 
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faMessage} size={30} paddingTop='2%' color="#FF8300" />
                ),
            }}
        />
        <Tab.Screen 
            name='h4' 
            component={UserScreen}
            options={{ 
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faUser} size={30}  color="#FF8300" />
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
    content:{
        backgroundColor:'yellow',
     
       
    },

   });

   export default App;