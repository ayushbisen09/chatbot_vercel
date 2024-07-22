import React, { useState } from 'react';
import { Button, Box, Typography, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { varAlpha } from 'src/theme/styles';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ placeholder, error, disabled, sx, onFileUpload, ...other }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    disabled,
    accept: 'text/csv',
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <Box
      {...getRootProps()}
      sx={{
        padding: '20px 0px 20px 0px',
        width: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        border: (theme) => `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        ...(isDragActive && { opacity: 0.72 }),
        ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
        ...(hasError && {
          color: 'error.main',
          borderColor: 'grey',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        }),
        '&:hover': { opacity: 0.72 },
        ...sx,
      }}
    >
      <InputLabel htmlFor="contained-button-file">
        <input
          {...getInputProps()}
          accept="text/csv"
          style={{ display: 'none' }}
          id="contained-button-file"
        />
        <Button size="large" variant="" component="span" startIcon={<CloudUploadIcon />}>
          {placeholder || 'Upload CSV File'}
        </Button>
      </InputLabel>
      {selectedFile && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
