// templateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplateOptOut: null,
  selectedTemplateOptIn: null,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    saveOptOutTemplate: (state, action) => {
      state.selectedTemplateOptOut = action.payload;
    },
    saveOptInTemplate: (state, action) => {
      state.selectedTemplateOptIn = action.payload;
    },
  },
});

export const { saveOptInTemplate,saveOptOutTemplate } = templateSlice.actions;

export default templateSlice.reducer;
