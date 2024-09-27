// src/redux/slices/templateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  templateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
};

const templateSlice = createSlice({
  name: 'texttypetemplate',
  initialState,
  reducers: {
    setTemplateFields: (state, action) => {
      state.templateFields = action.payload;
    },
    clearTemplateFields: (state) => {
      state.templateFields = [];
    },
  },
});

export const { setTemplateFields, clearTemplateFields } = templateSlice.actions;

export default templateSlice.reducer;
