import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regularMessageType: 'text',  // default type
    regularMessageContent: 'Thank you for opting-out. In future if you ever want to connect again just send "Hello".',
  };
  
  const regularMessageSlice = createSlice({
    name: 'regularMessage',
    initialState,
    reducers: {
      saveRegularMessage: (state, action) => {
        const { messageType, messageContent } = action.payload;
        state.regularMessageType = messageType;
        state.regularMessageContent = messageContent;
      },
    },
  });
  
  export const { saveRegularMessage } = regularMessageSlice.actions;
  export default regularMessageSlice.reducer;
  