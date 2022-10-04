// import {createStore} from 'redux';
import {rootReducer} from './rootReducer';
import {configureStore} from '@reduxjs/toolkit';

export const makeStore = () => {
  // const store = createStore(rootReducer);
  const store = configureStore({reducer: rootReducer});
  return store;
};
