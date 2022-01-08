import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import search from './search';
import results from './results';

const store = configureStore({
  reducer: { search, results },
  middleware: [thunk],
  devTools: true
})

export default store;
export * from './search';
export * from './results';
