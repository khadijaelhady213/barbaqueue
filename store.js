<<<<<<< HEAD
import { createStore } from 'redux';

=======
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";

// Actions of redux
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Actions
export const login = (user) => ({ type: LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });

// Initial states
>>>>>>> 462b68508ed23b97c6c51d394136ddfb3dd0ea1d
const initialState = {
  user: null,
};

<<<<<<< HEAD
=======
// Reducer
>>>>>>> 462b68508ed23b97c6c51d394136ddfb3dd0ea1d
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

<<<<<<< HEAD
export const setUser = user => ({
  type: 'SET_USER',
  payload: user,
});

const store = createStore(rootReducer);
=======
// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["isLoggedIn"], // Solo persiste la clave isLoggedIn
};

// Crear persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
>>>>>>> 462b68508ed23b97c6c51d394136ddfb3dd0ea1d

export default rootReducer;
