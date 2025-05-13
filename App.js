import RegisterScreen from "./screens/RegisterScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import NavbarScreen from "./screens/NavbarScreen";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { initReactI18next } from "react-i18next";
import i18n from "./lenguages/lenguage";
import 'react-native-gesture-handler';
import Profile from "./screens/Profile";
import ParcelDetailsScreen from "./screens/ParcelDetailsScreen";

//esconder los errores que devuelve el carrusel a pesar de que funcione a la perfección
import { LogBox } from 'react-native';
import ParcelsAvailableScreen from "./screens/ParcelsAvailableScreen";
import ListingDetailsScreen from "./screens/ListingDetailsScreen";
import ViewLoginScreen from "./screens/LoginScreen";
import ListingDetailsScreenRefactored from "./screens/ListingDetailsScreen";
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
]);

// Initialize i18next instance with React bindings
i18n.use(initReactI18next).init();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        style={styles.container}
        initialRouteName="ParcelsAvailableScreen"
      >
        {/* DONE */}
        <Stack.Screen
          style={styles.container}
          name="NavbarScreen"
          component={NavbarScreen}
          options={{ headerShown: false }}
        />
        {/* DONE */}
        <Stack.Screen
          style={styles.container}
          name="ViewLoginScreen"
          component={ViewLoginScreen}
          options={{ headerShown: false }}
        />

        {/* FIX IT */}
        <Stack.Screen
          style={styles.container}
          name="ParcelDetailsScreen"
          component={ParcelDetailsScreen}
          options={{ headerShown: false }}
        />

        {/* DONE */}
        <Stack.Screen
          style={styles.container}
          name="ListingDetailsScreen"
          component={ListingDetailsScreen}
          options={{ headerShown: false }}
        />

        {/* DONE */}
        <Stack.Screen
          style={styles.container}
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        {/* FIX IT */}
        <Stack.Screen
          style={styles.container}
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        {/* DONE */}
        <Stack.Screen
          style={styles.container}
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* FIX IT */}
        <Stack.Screen
          style={styles.container}
          name="ParcelsAvailableScreen"
          component={ParcelsAvailableScreen}
          options={{ headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});
