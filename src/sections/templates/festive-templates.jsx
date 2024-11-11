import React, { useState } from 'react';

import {
  Box,
  Button,
  Tooltip,
  MenuItem,
  MenuList,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  paginationClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import ChatBox from 'src/components/chat-box/chat-box';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function FestiveTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with festive-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes1.png',
      text: `Hi {{1}}! 🌈 Happy Holi! May the colors of joy, happiness, and positivity fill your life. 🥳`,
      title: 'Holi Greetings',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes2.png',
      text: `Hi {{1}}! 🎆 Happy Diwali! May this festival of lights bring joy and prosperity to your life. 🪔`,
      title: 'Diwali Wishes',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes3.png',
      text: `Hi {{1}}! 🎉 Happy Navratri! May the divine blessings of Maa Durga be with you always. 🌺`,
      title: 'Navratri Blessings',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes4.png',
      text: `Hi {{1}}! 🙏 Happy Ganesh Chaturthi! May Lord Ganesha bring you happiness, wisdom, and prosperity. 🐘`,
      title: 'Ganesh Chaturthi',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes5.png',
      text: `Hi {{1}}! 🤗 Happy Raksha Bandhan! May the bond of love and protection between siblings grow stronger. 🎁`,
      title: 'Raksha Bandhan',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes6.png',
      text: `Hi {{1}}! 🤗 Happy Raksha Bandhan! May the bond of love and protection between siblings grow stronger. 🎁`,
      title: 'Raksha Bandhan Special',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes5.png',
      text: `Hi {{1}}! 🎆 Happy Diwali! May this festival of lights bring joy and prosperity to your life. 🪔`,
      title: 'Diwali Celebrations',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes4.png',
      text: `Hi {{1}}! 🕉️ Celebrate Ganesh Chaturthi with devotion and joy. May Lord Ganesha bless you and your family! 🏵️`,
      title: 'Ganesh Devotion',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes6.png',
      text: `Hi {{1}}! 🤗 Happy Raksha Bandhan! May the bond of love and protection between siblings grow stronger. 🎁`,
      title: 'Sibling Love',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes3.png',
      text: `Hi {{1}}! ✨ May Maa Durga's blessings brighten up your life this Navratri. 🕯️`,
      title: 'Navratri Blessings Continued',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes2.png',
      text: `Hi {{1}}! 🎆 Happy Diwali! May this festival of lights bring joy and prosperity to your life. 🪔`,
      title: 'Diwali Lights',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes1.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes6.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmed Again',
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes5.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Details Repeated',
    },
  ];

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Festive Messages</Typography>
      <Box display="flex" justifyContent="space-between">
      <Tooltip title="Click here to search the template by name" arrow placement='top'>
        <TextField
          placeholder="Search templates..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2.5 }}
        />
        </Tooltip>
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold' }}
        >
          Sort by:
          <Box
            component="span"
            sx={{ ml: 0.5, fontWeight: 'fontWeightBold', textTransform: 'capitalize' }}
          />
        </Button>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
        >
          <MenuList>
            <MenuItem>Latest</MenuItem>
            <MenuItem>Popular</MenuItem>
            <MenuItem>Oldest</MenuItem>
          </MenuList>
        </CustomPopover>
      </Box>

      <Box
        sx={{ mt: '24px' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {displayedChatBoxes.map((chatBox, index) => (
          <ChatBox
            key={index}
            coverSrc={chatBox.coverSrc}
            showImage
            text={<>{chatBox.text}</>}
            showLinks
            showVisit
            title={chatBox.title} // Pass title prop
            showOnline={false} // Do not show online status
            showAvatar={false} // Do not show avatar
            showTimestamp={false} // Do not show timestamp
            
          />
        ))}
       
      </Box>

      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        sx={{
          mt: { xs: 5, md: 8 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      />
    </Box>
  );
}
