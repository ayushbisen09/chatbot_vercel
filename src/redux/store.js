// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import messageReplyReducer from './slices/messageReply';
import includedArrayReducer from './slices/contactSlice'; // Import the new reducer
import optOutMessageReducer from './slices/optOutRegularMessageSlice';
import optInMessageReducer from './slices/regularMessageTemplateSlice';
import optInTemplateTypeReducer from './slices/optInMessageTemplateTypeSlice';
import optOutTemplateTypeReducer from './slices/optOutMessageTemplateTypeSlice';
import wellComeMessageReducer from './slices/wellComeMessageRegularTemplateSlice';
import offHourMessageTemplateTypeReducer from './slices/offHourMessageTemplateTypeSlice';
import wellComeMessageTemplateTypeReducer from './slices/wellcomeMessageTemplateTypeSlice';
import offHourMessageRegularMessageReducer from './slices/offHoursMessageRegularTemplateSlice';

const store = configureStore({
  reducer: {
    includedArray: includedArrayReducer,
    messageReply: messageReplyReducer, // Add the messageReply slice reducer to the store
    optInMessage: optInMessageReducer,
    optOutMessage: optOutMessageReducer,
    optInMessageTemplateType: optInTemplateTypeReducer,
    optOutMessageTemplateType: optOutTemplateTypeReducer,

    wellComeMessageRegularMessage: wellComeMessageReducer,

    offHourMessageRegularMessage: offHourMessageRegularMessageReducer,

    wellComeMessageTemplateType: wellComeMessageTemplateTypeReducer,

    offHourMessageTemplateType: offHourMessageTemplateTypeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
