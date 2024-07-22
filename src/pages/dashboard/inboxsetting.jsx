// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { Box, Card, Divider, CardHeader, FormHelperText, Avatar, Button } from '@mui/material';

// import { CONFIG } from 'src/config-global';
// import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page_header';
// import Autocomplete from '@mui/material/Autocomplete';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { useState } from 'react';
// import Chip from '@mui/material/Chip'; // Added import for Chip
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment'; // Added import for InputAdornment

// // ----------------------------------------------------------------------

// const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
//   const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']); // Initialize with default tags
//   const [tagInput, setTagInput] = useState(''); // Added state for tag input

//   const handleAddTag = () => {
//     if (tagInput.trim() !== '') {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput('');
//     }
//   };

//   return (
//     <>
//       {/* <BlankView title="Notification Preferences" /> */}
//       <DashboardContent maxWidth="xl">
//         <PageHeader
//           title="Opt-In Management"
//           Subheading="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign."
//           showButton={false}
//         />
//         <Box sx={{ mt: 4 }}>
//           {' '}
//           {/* Add margin-top and padding for spacing */}
//           <Card>
//             <CardHeader
//               title="API Campaign Opt-out"
//               // subheader="Title, short description, image..."
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                   // checked={includeTaxes}
//                   // onChange={handleChangeIncludeTaxes}
//                 />
//               }
//               label="Enable this if you don't wish to send api campaign to opted-out contacts"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//           </Card>
//         </Box>
//         <Box sx={{ mt: 4 }}>
//           {' '}
//           {/* Add margin-top and padding for spacing */}
//           <Card>
//             <CardHeader
//               title="Opt-out Settings"
//               // subheader="Title, short description, image..."
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <Stack sx={{ padding: '32px 24px 32px 24px' }}>
//               <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
//                 Tags
//               </Typography>

//               <Autocomplete
//                 multiple
//                 freeSolo
//                 options={[]}
//                 value={tags}
//                 onChange={(event, newValue) => setTags(newValue)}
//                 inputValue={tagInput}
//                 onInputChange={(event, newInputValue) => {
//                   setTagInput(newInputValue);
//                 }}
//                 onKeyDown={(event) => {
//                   if (event.key === 'Enter' && tagInput.trim()) {
//                     setTags([...tags, tagInput.trim()]);
//                     setTagInput('');
//                     event.preventDefault();
//                   }
//                 }}
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => (
//                     <Chip
//                       variant="soft"
//                       color="info"
//                       size="small"
//                       label={option}
//                       {...getTagProps({ index })}
//                     />
//                   ))
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     onClick={handleAddTag}
//                     {...params}
//                     variant="outlined"
//                     size="large"
//                     // label="Tags" // Added label
//                     helperText="Enter opt-out keywords"
//                     placeholder="+ Add a tag"
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <InputAdornment position="Start">
//                           {/* <IconButton  size="medium">
//                       <AddIcon style={{ fontSize: 16 }} />
//                     </IconButton> */}
//                           {/* <Typography sx={{ fontSize: 12 }}>Add a tag</Typography> */}
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiAutocomplete-inputRoot': {
//                         minHeight: 'auto',
//                         display: 'flex', // Ensures input and adornment stay aligned
//                         alignItems: 'center', // Aligns items vertically in the input
//                         justifyContent: 'start',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Divider sx={{ ml: 3, mr: 3, borderStyle: 'dashed' }} />
//             <CardHeader
//               title={
//                 <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600'}}>
//                   Opt-out Response
//                 </Typography>
//               }
//               // subheader="Title, short description, image..."
//             />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                   // checked={includeTaxes}
//                   // onChange={handleChangeIncludeTaxes}
//                 />
//               }
//               label="Setup a response message for opt-out user keywords"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//             <Card sx={{ ml: 3, mr: 3, width: '25%', border: '1px solid #919EAB33', mb: 4 }}>
//               <CardHeader
//                 sx={{ mb: 2 }}
//                 avatar={<Avatar aria-label="profile picture">MC</Avatar>}
//                 title={
//                   <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
//                     Mireya Conner
//                   </Typography>
//                 }
//                 subheader={
//                   <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
//                     Online
//                   </Typography>
//                 }
//               />
//               <Divider />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   pr: 2,
//                   pt: 3,
//                   display: 'flex',
//                   color: '#919EAB',
//                   justifyContent: 'end',
//                 }}
//               >
//                 4:02 PM
//               </Typography>
//               <Box
//                 sx={{
//                   pt: 2,
//                   pr: 2,
//                   pl: 2,
//                   pb: 2,
//                   backgroundColor: '#CCF4FE',
//                   borderRadius: '8px',
//                   m: 2,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="text.primary"
//                   sx={{ fontSize: 14, fontWeight: '500' }}
//                 >
//                   Hey,
//                   <br />
//                   {
//                     ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
//                   }
//                 </Typography>
//               </Box>
//             </Card>
//             <Button sx={{ ml: 3, mb: 3 }} variant="contained" color="inherit">
//               Configure
//             </Button>
//           </Card>
//         </Box>
//       </DashboardContent>
//     </>
//   );
// }

// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { Box, Card, Divider, CardHeader, FormHelperText, Avatar, Button } from '@mui/material';

// import { CONFIG } from 'src/config-global';
// import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page_header';
// import Autocomplete from '@mui/material/Autocomplete';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { useState } from 'react';
// import Chip from '@mui/material/Chip';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
//   const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
//   const [tagInput, setTagInput] = useState('');

//   const handleAddTag = () => {
//     if (tagInput.trim() !== '') {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput('');
//     }
//   };

//   return (

//       <DashboardContent maxWidth="xl">
//         <PageHeader
//           title="Opt-In Management"
//           Subheading="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign."
//           showButton={false}
//         />
//         <Box sx={{ mt: 4 }}>
//           <Card>
//             <CardHeader
//               title="API Campaign Opt-out"
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                 />
//               }
//               label="Enable this if you don't wish to send api campaign to opted-out contacts"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//           </Card>
//         </Box>
//         <Box sx={{ mt: 4 }}>
//           <Card>
//             <CardHeader
//               title="Opt-out Settings"
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <Stack sx={{ padding: '32px 24px 32px 24px' }}>
//               <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
//               Opt-Out Keywords:
//               </Typography>

//               <Autocomplete
//                 multiple
//                 freeSolo
//                 options={[]}
//                 value={tags}
//                 onChange={(event, newValue) => setTags(newValue)}
//                 inputValue={tagInput}
//                 onInputChange={(event, newInputValue) => {
//                   setTagInput(newInputValue);
//                 }}
//                 onKeyDown={(event) => {
//                   if (event.key === 'Enter' && tagInput.trim()) {
//                     setTags([...tags, tagInput.trim()]);
//                     setTagInput('');
//                     event.preventDefault();
//                   }
//                 }}
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => (
//                     <Chip
//                       variant="soft"
//                       color="info"
//                       size="small"
//                       label={option}
//                       {...getTagProps({ index })}
//                     />
//                   ))
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     onClick={handleAddTag}
//                     {...params}
//                     variant="outlined"
//                     size="large"
//                     helperText="Enter opt-out keywords"
//                     placeholder="+ Add a tag"
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <InputAdornment position="Start"/>
//                         // </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiAutocomplete-inputRoot': {
//                         minHeight: 'auto',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'start',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Divider sx={{ ml: 3, mr: 3, borderStyle: 'dashed' }} />
//             <CardHeader
//               title={
//                 <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600'}}>
//                   Opt-out Response
//                 </Typography>
//               }
//             />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                 />
//               }
//               label="Setup a response message for opt-out user keywords"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//             <Card sx={{
//               ml: { xs: 1, sm: 2, md: 3 },
//               mr: { xs: 1, sm: 2, md: 3 },
//               border: '1px solid #919EAB33',
//               mb: 4,
//               width: {
//                 xs: '90%',
//                 sm: '70%',
//                 md: '50%',
//                 lg: '25%',
//               },
//               maxWidth: '500px',
//             }}>
//               <CardHeader
//                 sx={{ mb: 2 }}
//                 avatar={<Avatar aria-label="profile picture">MC</Avatar>}
//                 title={
//                   <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
//                     Mireya Conner
//                   </Typography>
//                 }
//                 subheader={
//                   <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
//                     Online
//                   </Typography>
//                 }
//               />
//               <Divider />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   pr: 2,
//                   pt: 3,
//                   display: 'flex',
//                   color: '#919EAB',
//                   justifyContent: 'end',
//                 }}
//               >
//                 4:02 PM
//               </Typography>
//               <Box
//                 sx={{
//                   pt: 2,
//                   pr: 2,
//                   pl: 2,
//                   pb: 2,
//                   backgroundColor: '#CCF4FE',
//                   borderRadius: '8px',
//                   m: 2,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="text.primary"
//                   sx={{ fontSize: 14, fontWeight: '500' }}
//                 >
//                   Hey,
//                   <br />
//                   {' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '}
//                 </Typography>
//               </Box>
//             </Card>
//             <Button sx={{ ml: 3, mb: 3 }} variant="contained" color="inherit">
//               Configure
//             </Button>
//           </Card>
//         </Box>
//       </DashboardContent>

//   );
// }

// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { Box, Card, Divider, CardHeader, FormHelperText, Avatar, Button } from '@mui/material';

// import { CONFIG } from 'src/config-global';
// import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page_header';
// import Autocomplete from '@mui/material/Autocomplete';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { useState } from 'react';
// import Chip from '@mui/material/Chip';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
//   const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
//   const [tagInput, setTagInput] = useState('');

//   const handleAddTag = () => {
//     if (tagInput.trim() !== '') {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput('');
//     }
//   };

//   return (
//       <DashboardContent maxWidth="xl">
//         <PageHeader
//           title="Opt-In Management"
//           Subheading="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign."
//           showButton={false}
//         />
//         <Box sx={{ mt: 4 }}>
//           <Card>
//             <CardHeader
//               title="API Campaign Opt-out"
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                 />
//               }
//               label="Enable this if you don't wish to send api campaign to opted-out contacts"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//           </Card>
//         </Box>
//         <Box sx={{ mt: 4 }}>
//           <Card>
//             <CardHeader
//               title="Opt-out Settings"
//               sx={{ mb: 3 }}
//             />
//             <Divider />
//             <Stack sx={{ padding: '32px 24px 32px 24px' }}>
//               <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
//                 Tags
//               </Typography>

//               <Autocomplete
//                 multiple
//                 freeSolo
//                 options={[]}
//                 value={tags}
//                 onChange={(event, newValue) => setTags(newValue)}
//                 inputValue={tagInput}
//                 onInputChange={(event, newInputValue) => {
//                   setTagInput(newInputValue);
//                 }}
//                 onKeyDown={(event) => {
//                   if (event.key === 'Enter' && tagInput.trim()) {
//                     setTags([...tags, tagInput.trim()]);
//                     setTagInput('');
//                     event.preventDefault();
//                   }
//                 }}
//                 renderTags={(value, getTagProps) =>
//                   value.map((option, index) => (
//                     <Chip
//                       variant="soft"
//                       color="info"
//                       size="small"
//                       label={option}
//                       {...getTagProps({ index })}
//                     />
//                   ))
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     onClick={handleAddTag}
//                     {...params}
//                     variant="outlined"
//                     size="large"
//                     helperText="Enter opt-out keywords"
//                     placeholder="+ Add a tag"
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <InputAdornment position="Start"/>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiAutocomplete-inputRoot': {
//                         minHeight: 'auto',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'start',
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Divider sx={{ ml: 3, mr: 3, borderStyle: 'dashed' }} />
//             <CardHeader
//               title={
//                 <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600'}}>
//                   Opt-out Response
//                 </Typography>
//               }
//             />
//             <FormControlLabel
//               control={
//                 <Switch
//                   id="toggle-taxes"
//                 />
//               }
//               label="Setup a response message for opt-out user keywords"
//               sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
//             />
//             <Card sx={{
//               ml: { xs: 2, sm: 3 },
//               mr: { xs: 2, sm: 3 },
//               border: '1px solid #919EAB33',
//               mb: 4,
//               width: 'clamp(280px, 100% - 32px, 500px)',
//               maxWidth: '100%',
//             }}>
//               <CardHeader
//                 sx={{ mb: 2 }}
//                 avatar={<Avatar aria-label="profile picture">MC</Avatar>}
//                 title={
//                   <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
//                     Mireya Conner
//                   </Typography>
//                 }
//                 subheader={
//                   <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
//                     Online
//                   </Typography>
//                 }
//               />
//               <Divider />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   pr: 2,
//                   pt: 3,
//                   display: 'flex',
//                   color: '#919EAB',
//                   justifyContent: 'end',
//                 }}
//               >
//                 4:02 PM
//               </Typography>
//               <Box
//                 sx={{
//                   pt: 2,
//                   pr: 2,
//                   pl: 2,
//                   pb: 2,
//                   backgroundColor: '#CCF4FE',
//                   borderRadius: '8px',
//                   m: 2,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="text.primary"
//                   sx={{ fontSize: 14, fontWeight: '500' }}
//                 >
//                   Hey,
//                   <br />
//                   {' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '}
//                 </Typography>
//               </Box>
//             </Card>
//             <Button sx={{ ml: 3, mb: 3 }} variant="contained" color="inherit">
//               Configure
//             </Button>
//           </Card>
//         </Box>
//       </DashboardContent>
//   );
// }

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Divider, CardHeader, FormHelperText, Avatar, Button } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page_header';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Inbox Settings"
        Subheading="You can customize Auto Resolving capability for users intervened for more than 24 Hours."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Auto Resolve Chats" sx={{ mb: 3 }} />
          <Divider />
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Disable auto resolve intervened chats."
            sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
          />
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Messages Settings" sx={{ mb: 3 }} />
          <Divider />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Welcome Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during working hours."
            />
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <CardHeader
                sx={{ mb: 2 }}
                avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                title={
                  <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                    Mireya Conner
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                    Online
                  </Typography>
                }
              />
              <Divider />
              <Typography
                variant="caption"
                sx={{
                  pr: 2,
                  pt: 3,
                  display: 'flex',
                  color: '#919EAB',
                  justifyContent: 'end',
                }}
              >
                4:02 PM
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#CCF4FE',
                  borderRadius: '8px',
                  m: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: '500' }}
                >
                  Hey,
                  <br />
                  {
                    ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                  }
                </Typography>
              </Box>
            </Card>
            <Button sx={{ mt: 3 }} variant="contained" color="inherit">
              Configure
            </Button>
          </Box>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Off Hours Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during off hours."
            />
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <CardHeader
                sx={{ mb: 2 }}
                avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                title={
                  <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                    Mireya Conner
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                    Online
                  </Typography>
                }
              />
              <Divider />
              <Typography
                variant="caption"
                sx={{
                  pr: 2,
                  pt: 3,
                  display: 'flex',
                  color: '#919EAB',
                  justifyContent: 'end',
                }}
              >
                4:02 PM
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#CCF4FE',
                  borderRadius: '8px',
                  m: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: '500' }}
                >
                  Hey,
                  <br />
                  {
                    ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                  }
                </Typography>
              </Box>
            </Card>
            <Button sx={{ mt: 3 }} variant="contained" color="inherit">
              Configure
            </Button>
          </Box>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Working Hours" sx={{ mb: 3 }} />
          <Divider />
          <Stack sx={{ padding: '32px 24px 32px 24px' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
              Opt-Out Keywords:
            </Typography>

            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags}
              onChange={(event, newValue) => setTags(newValue)}
              inputValue={tagInput}
              onInputChange={(event, newInputValue) => {
                setTagInput(newInputValue);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && tagInput.trim()) {
                  setTags([...tags, tagInput.trim()]);
                  setTagInput('');
                  event.preventDefault();
                }
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="soft"
                    color="info"
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  onClick={handleAddTag}
                  {...params}
                  variant="outlined"
                  size="large"
                  helperText="Enter opt-out keywords"
                  placeholder="+ Add a tag"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <InputAdornment position="Start" />,
                  }}
                  sx={{
                    '& .MuiAutocomplete-inputRoot': {
                      minHeight: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
        </Card>
      </Box>
    </DashboardContent>
  );
}
