import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wellComeTemplateType: "", // This will hold the fields entered in TextTemplateTypeDialog
  wellComeTemplateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
  wellComeFileTemplateFields: [], // This will hold the fields entered in FileTemplateTypeDialog
  wellComeUploadedFile: null, // This will hold the uploaded file for file template
  wellComeAudioUrl: null, // This will hold the uploaded audio file URL
  wellComeAudioBodyFields: [], // This will hold the fields entered in AudioTemplateTypeDialog
  wellComeAudioFileName: '', // This will store the name of the audio file
  wellComeVideoUrl: null, // This will hold the video file URL
  wellComeVideoBodyFields: [], // This will hold the fields entered in VideoTemplateTypeDialog
  wellComeVideoFileName: '', // This will store the name of the video file
  wellComeImageUrl: null, // Image URL for image template
  wellComeImageBodyFields: [], // Image template fields
  wellComeImageFileName: '', // Image file name
  chosen:'',
  imageUrl:''
};

const wellComeMessageTemplateTypeSlice = createSlice({
  name: 'wellComeMessageTemplateType',
  initialState,
  reducers: {
    wellComeSetTemplateType: (state, action) => {
      state.wellComeMessageTemplateType = action.payload;
    },
    wellComeSetTemplateFields: (state, action) => {
      state.wellComeMessageTemplateFields = action.payload;
    },
    wellComeClearTemplateFields: (state) => {
      state.wellComeMessageTemplateFields = [];
    },
    // File template related actions
    wellComeSetFileTemplateFields: (state, action) => {
      state.wellComeMessageFileTemplateFields = action.payload;
    },
    wellComeClearFileTemplateFields: (state) => {
      state.wellComeMessageFileTemplateFields = [];
    },
    wellComeSetUploadedFile: (state, action) => {
      state.wellComeMessageUploadedFile = action.payload;
    },
    wellComeClearUploadedFile: (state) => {
      state.wellComeMessageUploadedFile = null;
    },
    // Audio template related actions
    wellComeSetAudioData: (state, action) => {
      state.wellComeMessageAudioUrl = action.payload.audioUrl;
      state.wellComeMessageAudioBodyFields = action.payload.bodyFields;
      state.wellComeMessageAudioFileName = action.payload.fileName;
    },
    wellComeClearAudioData: (state) => {
      state.wellComeMessageAudioUrl = null;
      state.wellComeMessageAudioBodyFields = [];
      state.wellComeMessageAudioFileName = '';
    },
    // Video template related actions
    wellComeSetVideoData: (state, action) => {
      state.wellComeMessageVideoUrl = action.payload.videoUrl;
      state.wellComeMessageVideoBodyFields = action.payload.bodyFields;
      state.wellComeMessageVideoFileName = action.payload.fileName;
    },
    wellComeClearVideoData: (state) => {
      state.wellComeMessageVideoUrl = null;
      state.wellComeMessageVideoBodyFields = [];
      state.wellComeMessageVideoFileName = '';
    },
    // Image template related actions
    wellComeSetImageData: (state, action) => {
      state.wellComeMessageImageUrl = action.payload.imageUrl;
      state.wellComeMessageImageBodyFields = action.payload.bodyFields;
      state.imageFileName = action.payload.fileName;
    },
    wellComeClearImageData: (state) => {
      state.wellComeMessageImageUrl = null;
      state.wellComeMessageImageBodyFields = [];
      state.imageFileName = '';
    },
    wellComeSetChosen :(state,action)=>{
      state.chosen=action.payload;
    },
    // setImageUrl:(state,action)=>{
    //   if()
    //   state.imageUrl=
    // }
  },
});

export const {
  wellComeSetTemplateFields,
  wellComeClearTemplateFields,
  wellComeSetFileTemplateFields,
  wellComeClearFileTemplateFields,
  wellComeSetUploadedFile,
  wellComeClearUploadedFile,
  wellComeSetAudioData,
  wellComeSetVideoData,
  wellComeClearVideoData,
  wellComeSetImageData,
  wellComeClearImageData,
  wellComeSetTemplateType,
  wellComeSetChosen
} = wellComeMessageTemplateTypeSlice.actions;

export default wellComeMessageTemplateTypeSlice.reducer;

