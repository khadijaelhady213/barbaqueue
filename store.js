import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir acciones
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Definir acciones creadoras
export const login = (user) => ({ type: LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });

// Estado inicial
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Reductor
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn'], // Solo persiste la clave isLoggedIn
};

// Crear persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
