import { createStore } from 'redux';

const initialState = {
  user: null,
};

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

export const setUser = user => ({
  type: 'SET_USER',
  payload: user,
});

const store = createStore(rootReducer);

export default rootReducer;
