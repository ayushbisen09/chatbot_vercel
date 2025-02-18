import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Radio,
  Button,
  Select,
  Switch,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  RadioGroup,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { setTemplateFormatInputText } from 'src/redux/slices/carouselslice';
import { setOfferExpiring, setLimitedTimeText } from 'src/redux/slices/interactiveAllActionslice';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import PageHeader from 'src/components/page-header/page-header';

import { CarouselAlign } from './hook/carousel-align';
import AddTemplateChatBox from './components/chatbox/chat-box';
import Image1 from '../../assets/images/chatImage/imagechat.png';
import AuthenticationTemplate from './components/chatbox/authontecation';
import { TEMPLATE_LANGUAGES } from '../../assets/data/template-languages';
import InteractiveActions from './hook/add-templates-components/interactive-actions';
import LimitedTimeOfferTemplatePreview from './components/chatbox/limited-time-offer-template';

export default function AddTemplate() {
  const [isDisclaimerOn, setIsDisclaimerOn] = useState(false);
  const handleExpirationSwitchChange = (event) => {
    setIsDisclaimerOn(event.target.checked);
  };
  const [Expirationvalue, setExpirationValue] = useState('');
  const [helperText, setHelperText] = useState('The time should be between 1 to 90 minutes.');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setExpirationValue(inputValue);

    // Check if input is empty
    if (inputValue === '') {
      setHelperText('The time should be between 1 to 90 minutes.');
      setError(false); // No error if the field is empty (optional)
    } else if (inputValue < 1 || inputValue > 90) {
      setHelperText('Only values between 1 and 90 are allowed.');
      setError(true);
    } else {
      setHelperText('The time should be between 1 to 90 minutes.');
      setError(false);
    }
  };

  const [errors, setErrors] = useState({
    categorylist: false,
    templateName: false,
  });

  const [categorylist, setCategorytList] = useState('');
  const [templateName, setTemplateName] = useState('');

  const CategorylistChange = (event) => {
    setCategorytList(event.target.value);
    setErrors((prev) => ({ ...prev, categorylist: false }));
  };

  const TemplateNameChange = (event) => {
    setTemplateName(event.target.value);
    setErrors((prev) => ({ ...prev, templateName: false }));
  };

  const addTemplate = () => {
    const newErrors = {
      categorylist: categorylist.trim() === '',
      templateName: templateName.trim() === '',
    };
    setErrors(newErrors);
  };

  const dispatch = useDispatch();
  const handleSwitchChange = (event) => {
    dispatch(setOfferExpiring(event.target.checked));
  };

  const templateFormatInputText = useSelector((state) => state.template.templateFormatInputText);
  const handleTemplateFormatInputChange = (event) => {
    dispatch(setTemplateFormatInputText(event.target.value));
  };
  const [templateText, setTemplateText] = useState('');

  const handleTemplateTextChange = (event) => {
    setTemplateText(event.target.value);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [carouselMediaType, setCarouselMediaType] = useState('');
  const [headerType, setHeaderType] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [anchorEl, setAnchorEl] = useState(null);
  const [templateType, setTemplateType] = useState('');
  // const [actionType, setaActionType] = useState('none');
  const [chatBoxImage, setChatBoxImage] = useState(Image1); // Initial image
  const [chatBoxes, setChatBoxes] = useState([
    {
      id: 1,
      text: (
        <>
          <span style={{ fontWeight: '600' }}>{`Hi {{1}}! 🎧🛒`}</span> <br /> <br />
          `Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`
          <br /> <br />
          `Order Details:`
          <br />
          {`Product: {{2}}`}
          <br />
          {`Quantity: {{3}}`}
          <br />
          {`Order ID: {{4}}`}
          <br />
          {`Delivery Address: {{5}}`}
          <br />
          {`Estimated Delivery Date: {{6}}`}
        </>
      ),
      image: '/path/to/image.png',
    },
  ]);
  useEffect(() => {
    setInputText(''); // Reset the input text
    setFields([]); // Clear the dynamically rendered fields
  }, [templateType]);

  const [inputText, setInputText] = useState('');
  const [headerInput, setHeaderInput] = useState('');
  const [templateFormatInput, settemplateFormatInput] = useState('');

  const [fields, setFields] = useState([]);
  const [headerFields, setHeaderFields] = useState([]);
  const [sampleValues, setSampleValues] = useState({});

  const replacePlaceholders = (text, values) =>
    text.replace(/\{\{(\d+)\}\}/g, (match, number) => values[`{{${number}}}`] || match);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value);

    // Regex to match {{Any text}} but only add new fields if not already present
    const regex = /\{\{.*?\}\}/g;
    const matchedFields = value.match(regex);

    if (matchedFields) {
      const newFields = matchedFields.filter(
        (match) => !fields.includes(match) // Only add fields that don't already exist
      );
      if (newFields.length > 0) {
        setFields([...fields, ...newFields]);

        // Set corresponding sample values, initially empty
        const newSampleValues = newFields.reduce((acc, field, index) => {
          acc[field] = ''; // Empty value for sample fields
          return acc;
        }, {});
        setSampleValues({ ...sampleValues, ...newSampleValues });
      }
    }
  };

  const handleHeaderInputChange = (e) => {
    const { value } = e.target;
    setHeaderInput(value);

    const regex = /\{\{.*?\}\}/g;
    const matchedFields = value.match(regex);
    console.log(matchedFields, 'matchedFields in handleHeaderInputChange');

    if (matchedFields) {
        const newFields = matchedFields.filter(
            (match) => !headerFields.includes(match) // Only add fields that don't already exist
        );
        console.log(newFields, 'newFields to be added');

        if (newFields.length > 0) {
            setHeaderFields([...headerFields, ...newFields]);
        }
    }
};

const handleTemplateFormatChange = (e) => {
  const { value } = e.target;
  settemplateFormatInput(value);

  const regex = /\{\{.*?\}\}/g;
  const matchedFields = value.match(regex);
  console.log(matchedFields, 'matchedFields in handleHeaderInputChange');

  if (matchedFields) {
      const newFields = matchedFields.filter(
          (match) => !headerFields.includes(match) // Only add fields that don't already exist
      );
      console.log(newFields, 'newFields to be added');

      if (newFields.length > 0) {
          setHeaderFields([...headerFields, ...newFields]);
      }
  }
};


  const handleSampleValueChange = (e, field) => {
    const updatedValues = {
      ...sampleValues,
      [field]: e.target.value,
    };
    setSampleValues(updatedValues);

    // Update chatBox content with replaced values
    setChatBoxes((prevChatBoxes) =>
      prevChatBoxes.map((box) => ({
        ...box,
        text: replacePlaceholders(
          `Hi {{1}}! 🎧🛒\n\nCongratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌\n\nOrder Details:\nProduct: {{2}}\nQuantity: {{3}}\nOrder ID: {{4}}\nDelivery Address: {{5}}\nEstimated Delivery Date: {{6}}`,
          updatedValues
        ),
      }))
    );
  };

  // Removed key handling for Enter and ',' as per the request
  const handleKeyPress = (e) => {
    // Optional: you can handle some other key-specific behavior if required
  };

  const handleHeaderKeyPress = (e) => {
    // Optional: you can handle some other key-specific behavior if required
  };

  const CATEGORYLISTS = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Authentication', label: 'Authentication' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeLanguage = useCallback((event) => {
    setSelectedLanguage(event.target.value);
  }, []);

  const handleTemplateTypeChange = (event) => {
    const selectedType = event.target.value;
    setTemplateType(selectedType);

    // Change ChatBox image based on selected template type
    switch (selectedType) {
      case 'video':
        setChatBoxImage('../../assets/images/chatImage/video.png');
        break;
      case 'document':
        setChatBoxImage('../../assets/images/chatImage/document.png');
        break;
      case 'location':
        setChatBoxImage('../../assets/images/chatImage/location.png');
        break;
      case 'limited_time_offer':
        setChatBoxImage('../../assets/images/chatImage/limitedtimeoffer.png');
        break;
      case 'text':
        setChatBoxImage('');
        break;
      default:
        setChatBoxImage(Image1);
    }
  };

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
      callToAction1Urls: [{ label: '', url: '' }],
      callToAction2PhoneNumbers: [{ label: '', phoneNumber: '' }],
      couponCodes: [{ code: '', description: '' }],
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleDelete = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleCarouselMediaTypeChange = (event) => {
    setCarouselMediaType(event.target.value);
  };

  const isTemplateFormat = (input) => {
    const regex = /^\{\{.*\}\}$/;
    return regex.test(input);
  };

  const options = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'document', label: 'Document' },
    { value: 'location', label: 'Location' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'limited_time_offer', label: 'Limited Time Offer' },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="New Template"
          Subheading="Create new template as per your needs."
          link_added="#"
        />
      </Box>
      <Box
        sx={{ mt: '24px', flexWrap: { xs: 'wrap', sm: 'nowrap', md: 'nowrap' } }}
        gap={3}
        display="flex"
      >
        <Card sx={{ width: { md: '90%', xs: '100%', sm: '90%', width: '1097.11px' } }}>
          <CardHeader title="Add New Template" sx={{ mb: 3 }} />
          <Divider />
          <FormControlLabel
            control={
              <TextField
                sx={{ width: '100%' }}
                id="select-currency-label-x"
                variant="outlined"
                select
                fullWidth
                label="Select Template Category"
                InputLabelProps={{ htmlFor: 'outlined-select-currency-label' }}
                inputProps={{ id: 'outlined-select-currency-label' }}
                value={categorylist}
                onChange={CategorylistChange}
                error={errors.categorylist}
                helperText={
                  errors.categorylist
                    ? 'Template Category is required for add new template.'
                    : 'Select template category.'
                }
              >
                {CATEGORYLISTS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            }
            sx={{ width: '100%', padding: '24px 24px 20px 24px', mr: 0, ml: 0 }}
          />
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit}>
              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Template Name"
                    value={templateName}
                    onChange={TemplateNameChange}
                    error={errors.templateName}
                    helperText={
                      errors.templateName
                        ? 'Template name is required for add new template.'
                        : 'Enter the name of the template.'
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter the name of the template."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              style={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                sx={{ width: '100%', padding: '00px 24px 24px 24px', mr: 0, ml: 0 }}
              />

              <FormControlLabel
                control={
                  <TextField
                    sx={{ width: '100%' }}
                    id="select-language-label"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select Language (Required)"
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                    onClick={handleClick}
                    helperText="Select the language for the template."
                    InputLabelProps={{ htmlFor: 'outlined-select-language-label' }}
                    inputProps={{ id: 'outlined-select-language-label' }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 400,
                            width: '20ch',
                          },
                        },
                      },
                    }}
                  >
                    {TEMPLATE_LANGUAGES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}>
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Template Type
                </Typography>

                <RadioGroup
                  sx={{ mt: '12px' }}
                  row
                  value={categorylist === 'Authentication' ? 'text' : templateType}
                  onChange={handleTemplateTypeChange}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      disabled={
                        (categorylist === 'Authentication' && option.value !== 'text') ||
                        !categorylist
                      }
                    />
                  ))}
                </RadioGroup>

                {(categorylist === 'Marketing' || categorylist === 'Utility') && (
                  <Box>
                    {templateType === 'text' && (
                      <Box sx={{ width: '100%', mr: 0, ml: 0 }}>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Header (optional)"
                          helperText="You're allowed a maximum of 60 characters."
                          value={headerInput}
                          disabled={isTemplateFormat(headerInput)}
                          onChange={handleHeaderInputChange}
                          onKeyPress={handleHeaderKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{ fontSize: '16px' }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={templateFormatInput}
                          onChange={handleTemplateFormatChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Footer"
                          helperText="You're allowed a maximum of 60 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <Box sx={{ width: '100%', mr: 0, ml: 0 }}>
                          {headerFields.map((field, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                              <TextField
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                label={`Field ${index + 1}`}
                                helperText="Specify the parameter to be replaced. These values can be changed at the time of sending"
                                value={field}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="Specify the parameter to be replaced. These values can be changed at the time of sending"
                                        arrow
                                        placement="top"
                                        sx={{ fontSize: '16px' }}
                                      >
                                        <Iconify
                                          icon="material-symbols:info-outline"
                                          style={{ width: 20, height: 20 }}
                                        />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ marginBottom: '8px' }}
                              />
                              <TextField
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                label={`Sample Value ${index + 1}`}
                                helperText="Enter a sample value for this parameter."
                                value={sampleValues[field] || ''}
                                onChange={(e) => handleSampleValueChange(e, field)}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="Enter sample value for this field parameter."
                                        arrow
                                        placement="top"
                                        sx={{ fontSize: '16px' }}
                                      >
                                        <Iconify
                                          icon="material-symbols:info-outline"
                                          style={{ width: 20, height: 20 }}
                                        />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                    {templateType === 'image' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={inputText}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Footer"
                          helperText="You're allowed a maximum of 60 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                    {templateType === 'video' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={inputText}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Footer"
                          helperText="You're allowed a maximum of 60 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                    {templateType === 'document' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={inputText}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Footer"
                          helperText="You're allowed a maximum of 60 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                    {templateType === 'location' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={inputText}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Template Footer"
                          helperText="You're allowed a maximum of 60 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 60 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                    {templateType === 'carousel' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                        <FormControlLabel
                          control={
                            <TextField
                              fullWidth
                              type="text"
                              margin="dense"
                              variant="outlined"
                              label="Card 1 Body"
                              helperText="You're allowed a maximum of 160 characters."
                            />
                          }
                          sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                        />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                          <InputLabel id="carousel-select-label">Carousel Media Type</InputLabel>
                          <Select
                            labelId="carousel-select-label"
                            id="carousel-select"
                            value={carouselMediaType}
                            label="Carousel Media Type"
                            onChange={handleCarouselMediaTypeChange}
                          >
                            <MenuItem value="type1">Image</MenuItem>
                            <MenuItem value="type2">Video</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          value={templateFormatInputText}
                          onChange={handleTemplateFormatInputChange}
                          onKeyPress={handleKeyPress}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                    {templateType === 'limited_time_offer' && (
                      <>
                        <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />

                        <FormControl fullWidth sx={{ mt: 3 }}>
                          <InputLabel id="carousel-select-label">Header Type</InputLabel>
                          <Select
                            labelId="header-select-label"
                            id="header-select"
                            value={headerType}
                            label="Header Type"
                            onChange={(e) => setHeaderType(e.target.value)}
                          >
                            <MenuItem value="type1">Image</MenuItem>
                            <MenuItem value="type2">Video</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          sx={{ mt: 3 }}
                          fullWidth
                          type="text"
                          margin="dense"
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Template Format"
                          helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                          onChange={handleTemplateTextChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
                                >
                                  <Iconify
                                    icon="material-symbols:info-outline"
                                    style={{ width: 20, height: 20 }}
                                  />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormControlLabel
                          control={
                            <TextField
                              fullWidth
                              type="text"
                              margin="dense"
                              variant="outlined"
                              label="Limited Time Offer Text"
                              helperText="You're allowed a maximum of 16 characters."
                              onChange={(e) => dispatch(setLimitedTimeText(e.target.value))}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title="You're allowed a maximum of 16 characters."
                                      arrow
                                      placement="top"
                                      sx={{
                                        fontSize: '16px',
                                      }}
                                    >
                                      <Iconify
                                        icon="material-symbols:info-outline"
                                        style={{ width: 20, height: 20 }}
                                      />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          }
                          sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                        />

                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ padding: '16px 0px 0px 0px' }}
                        >
                          <FormControlLabel
                            control={<Switch onChange={handleSwitchChange} />}
                            label="Offer Expires"
                            sx={{ marginRight: '0px' }}
                          />
                          <Tooltip
                            title="Turn on the toggle to make this an expiring offer. You can choose the expiration date when sending it to the user."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
                          >
                            <IconButton>
                              <Iconify
                                icon="material-symbols:info-outline"
                                style={{ width: 20, height: 20 }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </>
                    )}
                  </Box>
                )}
              </Box>

              {categorylist === 'Authentication' && (
                <Box sx={{ width: '100%', px: 3 }}>
                  <Divider sx={{ borderStyle: 'dashed', mb: '24px' }} />
                  <Typography mb={1} sx={{ fontSize: '14px', fontWeight: '600' }}>
                    Sample Values
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      helperText="Specify the parameter to be replaced. These values can be changed at the time of sending"
                      defaultValue="{{1}}" // Set the default value
                      InputProps={{
                        readOnly: true, // Keep the field read-only
                        disabled: true, // Disable the field enti

                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Specify the parameter to be replaced. These values can be changed at the time of sending "
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
                            >
                              <Iconify
                                icon="material-symbols:info-outline"
                                style={{ width: 20, height: 20 }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        marginBottom: '8px',
                        mt: 0,
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      helperText="Enter a sample value for this parameter."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter sample value for this field paramerter."
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
                            >
                              <Iconify
                                icon="material-symbols:info-outline"
                                style={{ width: 20, height: 20 }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mt: 0 }}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Expiration Warning"
                    placeholder="Enter Numeric value between 1 to 90"
                    value={Expirationvalue}
                    onChange={handleChange}
                    helperText={helperText}
                    error={error}
                    type="number"
                    InputProps={{
                      inputProps: { min: 1, max: 90 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter time between 1 to 90 mins."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              style={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mt: 0, mb: 2 }}
                  />
                  <Box display="flex" alignItems="center" mb={3}>
                    <FormControlLabel
                      value="text"
                      control={
                        <Switch checked={isDisclaimerOn} onChange={handleExpirationSwitchChange} />
                      }
                      label="Add Security Disclaimer"
                    />
                    <Tooltip
                      title="Turn on the switch to include the security recommendation message"
                      arrow
                      placement="top"
                    >
                      <Iconify
                        icon="material-symbols:info-outline"
                        style={{ width: 20, height: 20 }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              )}

              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px' }}>
                <InteractiveActions
                  isLimitedTimeOfferActive={templateType === 'limited_time_offer'}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Button onClick={addTemplate} variant="contained" size="medium" color="primary">
                  Submit
                </Button>
                <Button onClick={handleCancel} variant="outlined" size="medium" color="inherit">
                  Cancel
                </Button>
              </Box>
            </Form>
          </FormProvider>
        </Card>

        {categorylist === 'Authentication' ? (
          // Show Authentication Card when category list is set to "Authentication"
          <Box>
            <AuthenticationTemplate
              coverSrc={templateType !== 'text' ? chatBoxImage : undefined}
              showImage={templateType !== 'text'}
              text={
                <>
                  <span style={{ fontWeight: '600' }}>
                    {replacePlaceholders(`{{1}} is your verification code.`, sampleValues)}
                  </span>
                  <br />
                  {isDisclaimerOn && (
                    <Typography mt={1} fontWeight={600} fontSize="14px">
                      For your security, do not share this code.
                    </Typography>
                  )}
                  {Expirationvalue && Expirationvalue >= 1 && Expirationvalue <= 90 && (
                    <Typography fontWeight={600} fontSize="14px" mt={1}>
                      This code expires in {Expirationvalue} minute(s).
                    </Typography>
                  )}
                </>
              }
              showLinks
              showCoupon
              showCall
            />
          </Box>
        ) : templateType === 'carousel' ? (
          // Show CarouselAlign component when templateType is "carousel"
          <Box>
            <CarouselAlign />
          </Box>
        ) : templateType === 'limited_time_offer' ? (
          // Show Limited Time Offer Template
          <Box>
            <LimitedTimeOfferTemplatePreview
              coverSrc={
                headerType === 'type1'
                  ? Image1
                  : headerType === 'type2'
                    ? '../../assets/images/chatImage/video.png'
                    : '../../assets/images/chatImage/limitedtimeoffer.png'
              }
              showImage={headerType !== 'text'}
              text={templateText} // Use the state here
              showLinks
            />
          </Box>
        ) : (
          // Show AddTemplateChatBox for other template types
          <Box>
            <AddTemplateChatBox
              coverSrc={templateType !== 'text' ? chatBoxImage : undefined}
              showImage={templateType !== 'text'}
              text={
                <>
                  <span style={{ fontWeight: '600' }}>
                    {replacePlaceholders(`Hi {{1}}! 🎧🛒`, sampleValues)}
                  </span>
                  <br /> <br />
                  {replacePlaceholders(
                    `Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`,
                    sampleValues
                  )}
                  <br /> <br />
                  {replacePlaceholders(`Order Details:`, sampleValues)} <br />
                  {replacePlaceholders(`Product: {{2}}`, sampleValues)} <br />
                  {replacePlaceholders(`Quantity: {{3}}`, sampleValues)} <br />
                  {replacePlaceholders(`Order ID: {{4}}`, sampleValues)} <br />
                  {replacePlaceholders(`Delivery Address: {{5}}`, sampleValues)} <br />
                  {replacePlaceholders(`Estimated Delivery Date: {{6}}`, sampleValues)}
                </>
              }
              showLinks
              showVisit
            />
          </Box>
        )}
      </Box>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        title="Discard Template"
        content="If you discard this template, all changes will be lost. You can save it as a draft to modify later."
        action={
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Save to Draft
          </Button>
        }
      />
    </DashboardContent>
  );
}
