// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import includedArrayReducer from './slices/contactSlice'; // Import the reducer

const store = configureStore({
  reducer: {
    includedArray: includedArrayReducer, // Add the slice reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
