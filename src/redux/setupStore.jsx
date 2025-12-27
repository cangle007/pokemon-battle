import { configureStore } from '@reduxjs/toolkit';
import reducer from '../redux/reducers/reducer';

const rootReducer = {
  main: reducer,
};

export const setupStore = () => configureStore({ reducer: rootReducer });
