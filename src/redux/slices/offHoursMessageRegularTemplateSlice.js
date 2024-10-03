// src/store/slices/optInMessageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageType: 'text',
  messageContent: 'Thank you for opting-out. In future if you ever want to connect again just send "Hello".',
  chatBoxImage: '',
};

export const offHourMessageSlice = createSlice({
  name: 'offHourMessageRegularMessage',
  initialState,
  reducers: {
    setOffHourMessageData: (state, action) => {
      state.messageType = action.payload.messageType;
      state.messageContent = action.payload.messageContent;
      state.chatBoxImage = action.payload.chatBoxImage;
    },
    resetOffHourMessageData: (state) => {
      state.messageType = 'text';
      state.messageContent = '';
      state.chatBoxImage = '';
    },
  },
});

export const { setOffHourMessageData, resetOffHourMessageData } = offHourMessageSlice.actions;

export default offHourMessageSlice.reducer;