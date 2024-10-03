// src/store/slices/optInMessageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageType: 'text',
  messageContent: 'Thank you for opting-in. In future if you ever want to connect again just send "Hello".',
  chatBoxImage: '',
};

export const WellComeMessageSlice = createSlice({
  name: 'wellComeMessage',
  initialState,
  reducers: {
    setwellComeMessageMessageData: (state, action) => {
      state.messageType = action.payload.messageType;
      state.messageContent = action.payload.messageContent;
      state.chatBoxImage = action.payload.chatBoxImage;
    },
    resetwellComeMessageMessageData: (state) => {
      state.messageType = 'text';
      state.messageContent = '';
      state.chatBoxImage = '';
    },
  },
});

export const { setwellComeMessageMessageData, resetwellComeMessageMessageData } = WellComeMessageSlice.actions;

export default WellComeMessageSlice.reducer;
