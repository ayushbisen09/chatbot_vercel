import React from 'react';
import { toast } from 'sonner';
import { useForm, useFieldArray } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  useTheme,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

export default function Page() {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const showToast = () => {
    toast.success('Attributes Saved Successfully!');
  };
  const saveAttributes = () => {
    // Show a toast or some feedback that the text was copied
    showToast();
  };

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="User Attributes"
        Subheading="Attributes hold Dialogflow parameters' value & you can also assign them custom value from contacts page."
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="User Attributes" sx={{ mb: 3 }} />
          <Divider />
          <Box sx={{ p: 3 }}>
            <Box sx={{ mr: 6 }}>
              {!isTabletOrMobile && (
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box sx={{ mb: { xs: 2, sm: 0 }, width: '50%' }}>
                    <Typography variant="h7" sx={{ mb: 3, fontWeight: 600 }}>
                      Attribute Name
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, width: '50%' }}>
                    <Typography variant="h7" sx={{ mb: 3, fontWeight: 600 }}>
                      Attribute Description
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Stack spacing={3}>
              {fields.map((item, index) => (
                <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{ width: 1 }}
                    alignItems="center"
                  >
                    <TextField variant="outlined" fullWidth label="Attribute name" />
                    <TextField variant="outlined" fullWidth label="Attribute description" />
                    {!isTabletOrMobile && (
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => handleRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    )}
                  </Stack>
                  {isTabletOrMobile && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => handleRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Box>
                  )}
                </Stack>
              ))}
            </Stack>

            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
              sx={{ mt: 3, alignSelf: 'flex-start' }}
            >
              Add More Attribute
            </Button>

            <Box sx={{ mt: 3 }}>
              <Button onClick={saveAttributes} variant="contained" color="inherit">
                Save
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
