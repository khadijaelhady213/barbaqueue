import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NavbarScreen from "./screens/NavbarScreen";
import Profile from "./screens/Profile";

const Stack = createStackNavigator();

// Routes of the application
function StackRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="NavbarScreen" component={NavbarScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Load data from local storage
function LoadDataFromStorage() {}

// Init application Routes
const App = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};

// Init the presistent store of application from redux
export default () => {
  return <App />;
};
