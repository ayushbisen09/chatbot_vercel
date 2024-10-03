// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import messageReplyReducer from './slices/messageReply';
import includedArrayReducer from './slices/contactSlice'; // Import the new reducer
import optInMessageReducer from './slices/regularMessageTemplateSlice';
import optInTemplateTypeReducer from './slices/optInMessageTemplateTypeSlice';
import optOutMessageReducer from './slices/offHoursMessageRegularTemplateSlice';
import optOutTemplateTypeReducer from './slices/optOutMessageTemplateTypeSlice';

const store = configureStore({
  reducer: {
    includedArray: includedArrayReducer,
    messageReply: messageReplyReducer, // Add the messageReply slice reducer to the store
    optInMessage: optInMessageReducer,
    optOutMessage: optOutMessageReducer,
    optInMessageTemplateType: optInTemplateTypeReducer,
    optOutMessageTemplateType: optOutTemplateTypeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
