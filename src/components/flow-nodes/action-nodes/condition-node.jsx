import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Stack,
  Select,
  Button,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ConditionNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    // Clear the attribute when changing the condition
    setSelectedAttribute('');
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        backgroundColor: '#F4F6F8',
        border: '1px solid transparent',
        '&:hover': {
          border: '1px solid #078DEE', // Change this to your desired border color
          borderRadius: '16px',
        },
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">Condition</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondry' }} />
            </IconButton>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondry' }}
              />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />
      <Card
        sx={{
          boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
          px: 1.5,
          pt: 3.5,
          pb: 2.5,
          borderRadius: '12px',
          border: '1px solid transparent',
          '&:hover': {
            border: '1px solid #919EAb', // Change this to your desired border color
            borderRadius: '16px',
          },
        }}
        {...other}
      >
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <InputLabel id="condition-select-label">Select Condition</InputLabel>
          <Select
            labelId="condition-select-label"
            id="condition-select"
            value={selectedCondition}
            label="Select Condition"
            onChange={handleConditionChange}
          >
            <MenuItem value="Equal">Equal</MenuItem>
            <MenuItem value="Exists">Exists</MenuItem>
            <MenuItem value="Time In">Time In</MenuItem>
            <MenuItem value="Date In">Date In</MenuItem>
          </Select>
        </FormControl>

        {/* Conditionally render the Select Attribute field based on selected condition */}
        {selectedCondition !== 'Time In' && selectedCondition !== 'Date In' && (
          <FormControl fullWidth size="large" sx={{ mb: 3 }}>
            <InputLabel id="attribute-select-label">Select Attribute</InputLabel>
            <Select
              labelId="attribute-select-label"
              id="attribute-select"
              value={selectedAttribute}
              label="Select Attribute"
              onChange={handleAttributeChange}
            >
              <MenuItem value="Latitude">Latitude</MenuItem>
              <MenuItem value="Longitude">Longitude</MenuItem>
              <MenuItem value="City">City</MenuItem>
              <MenuItem value="Now">Now</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Current Times">Current Times</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'Time In' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }} // Ensure the label stays visible
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }} // Ensure the label stays visible
            />
            <TextField label="Attribute Value" variant="outlined" fullWidth />
          </Stack>
        )}

        {selectedCondition === 'Date In' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }} // Ensure the label stays visible
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }} // Ensure the label stays visible
            />
            <TextField label="Attribute Value" variant="outlined" fullWidth />
          </Stack>
        )}

        {selectedCondition !== 'Exists' &&
          selectedCondition !== 'Time In' &&
          selectedCondition !== 'Date In' && (
            <TextField label="Attribute Value" variant="outlined" fullWidth sx={{ mb: 3 }} />
          )}

        <Stack spacing={3} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="success" size="large" fullWidth>
              True
            </Button>

            <Iconify width={24} icon="solar:add-circle-bold" />
          </Box>
        </Stack>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="error" size="large" fullWidth>
              False
            </Button>

            <Iconify width={24} icon="solar:add-circle-bold" />
          </Box>
        </Stack>
      </Card>
    </Card>
  );
}
