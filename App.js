import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import NavBar from './screens/NavBar';

const Stack = createStackNavigator();

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <Stack.Screen name="NavBar" component={NavBar} />
        ) : (
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
