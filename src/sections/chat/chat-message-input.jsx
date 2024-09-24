// import EmojiPicker from 'emoji-picker-react';
// import { useDispatch, useSelector } from 'react-redux';
// import React, { useRef, useMemo, useState, useCallback } from 'react';

// import { Box, Button, Popper, InputBase, IconButton, ClickAwayListener } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { uuidv4 } from 'src/utils/uuidv4';
// import { fSub, today } from 'src/utils/format-time';

// import { sendMessage, createConversation } from 'src/actions/chat';
// import {
//   setIsVisible,
//   setReplyText,
//   setImageUrlInReply,
//   setImageVisibilityInReply,
//   setOriginalImageVisibility,
// } from 'src/redux/slices/messageReply';

// import { Iconify } from 'src/components/iconify';
// import { ChooseTemaplte } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

// import { useMockedUser } from 'src/auth/hooks';

// import { AttachFileDialog } from './hooks/attach-file-dailog';
// import { QuickRepliesDialog } from './hooks/quick-replies-dailog';

// export function ChatMessageInput({
//   disabled,
//   recipients,
//   onAddRecipients,
//   selectedConversationId,
// }) {
//   const imageVisibilityInReply = useSelector((state) => state.messageReply.imageVisibilityInReply);
//   const router = useRouter();
//   const { user } = useMockedUser();
//   const fileRef = useRef(null);
//   const emojiButtonRef = useRef(null);
//   const [message, setMessage] = useState('');
//   const [dialogType, setDialogType] = useState(null);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [icon, setIcon] = useState('fluent:resize-large-24-regular');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleOpenDialog = useCallback((type) => {
//     setDialogType(type);
//   }, []);

//   const handleCloseDialog = useCallback(() => {
//     setDialogType(null);
//   }, []);

//   const handleToggleEmojiPicker = () => {
//     setShowEmojiPicker((prev) => !prev);
//   };

//   const handleCloseEmojiPicker = () => {
//     setShowEmojiPicker(false);
//   };

//   const handleSelectEmoji = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//   };

//   const myContact = useMemo(
//     () => ({
//       id: `${user?.id}`,
//       role: `${user?.role}`,
//       email: `${user?.email}`,
//       address: `${user?.address}`,
//       name: `${user?.displayName}`,
//       lastActivity: today(),
//       avatarUrl: `${user?.photoURL}`,
//       phoneNumber: `${user?.phoneNumber}`,
//       status: 'online',
//     }),
//     [user]
//   );

//   const messageData = useMemo(
//     () => ({
//       id: uuidv4(),
//       attachments: [],
//       body: message,
//       contentType: 'text',
//       createdAt: fSub({ minutes: 1 }),
//       senderId: myContact.id,
//     }),
//     [message, myContact.id]
//   );

//   const conversationData = useMemo(
//     () => ({
//       id: uuidv4(),
//       messages: [messageData],
//       participants: [...recipients, myContact],
//       type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
//       unreadCount: 0,
//     }),
//     [messageData, myContact, recipients]
//   );

//   const handleAttach = useCallback(() => {
//     handleOpenDialog('attach');
//   }, [handleOpenDialog]);

//   const handleChangeMessage = useCallback(
//     (event) => {
//       const inputValue = event.target.value;
//       setMessage(inputValue);

//       if (inputValue.endsWith('/')) {
//         handleOpenDialog('quick-replies');
//       }
//     },
//     [handleOpenDialog]
//   );

//   const handleKeyDown = useCallback((event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault();
//       setMessage((prevMessage) => `${prevMessage}\n`);
//     }
//   }, []);

//   const handleSendMessage = useCallback(async () => {
//     try {
//       if (message.trim()) {
//         if (selectedConversationId) {
//           await sendMessage(selectedConversationId, messageData);
//         } else {
//           const res = await createConversation(conversationData);
//           router.push(`${paths.dashboard.inbox}?id=${res.conversation.id}`);
//           onAddRecipients([]);
//         }
//         setMessage('');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]);

//   const toggleBold = useCallback(() => setIsBold((prev) => !prev), []);
//   const toggleItalic = useCallback(() => setIsItalic((prev) => !prev), []);
//   const toggleStrikethrough = useCallback(() => setIsStrikethrough((prev) => !prev), []);

//   const handleExpandToggle = useCallback(() => {
//     setIsExpanded((prev) => !prev);
//     setIcon((prev) =>
//       prev === 'fluent:resize-large-24-regular'
//         ? 'fluent:resize-small-24-regular'
//         : 'fluent:resize-large-24-regular'
//     );
//   }, []);

//   const textStyle = useMemo(
//     () => ({
//       fontWeight: isBold ? 'bold' : 'normal',
//       fontStyle: isItalic ? 'italic' : 'normal',
//       textDecoration: isStrikethrough ? 'line-through' : 'none',
//     }),
//     [isBold, isItalic, isStrikethrough]
//   );
//   const isVisible = useSelector((state) => state.messageReply.isVisible);
//   const dispatch = useDispatch();
//   const closeReply = () => {
//     dispatch(setIsVisible(false));
//     dispatch(setReplyText(''));
//     dispatch(setImageUrlInReply(''));
//     dispatch(setImageVisibilityInReply(false));
//     dispatch(setOriginalImageVisibility());
//   };
//   const replyText = useSelector((state) => state.messageReply.originalReplyText);
//   const imageUrlInReply = useSelector((state) => state.messageReply.imageUrlInReply);
//   const originalImageVisibilty = useSelector((state) => state.messageReply.originalImageVisibilty);

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: 'background.paper',
//           p: 1,
//           mb: 2,
//           width: '100%',
//           transition: 'all 0.3s ease',
//           minHeight: isExpanded ? '220px' : '120px',
//           maxHeight: isExpanded ? '220px' : '120px',
//           flexShrink: 0,
//           borderTop: (theme) => `solid 1px ${theme.vars.palette.divider}`,
//           overflowY: 'auto',
//         }}
//       >
//         <Box>
//           {isVisible && (
//             <Box sx={{ display: 'flex', mb: 1 }}>
//               <Box
//                 sx={{
//                   background: '#CCF4FE',
//                   width: '100%',
//                   display: 'flex',
//                   borderRadius: 1.5,
//                   borderLeft: 6,
//                 }}
//               >
//                 <Box sx={{ width: '100%', p: 2, display: 'flex', alignItems: 'center' }}>
//                   {replyText}
//                 </Box>
//                 <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//                   {originalImageVisibilty && (
//                     <Box
//                       component="img"
//                       alt="attachment"
//                       src={imageUrlInReply}
//                       sx={{
//                         width: 50,
//                         height: 50,
//                         borderRadius: 0.5,
//                         objectFit: 'cover',
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Box>
//               <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
//                 <IconButton onClick={closeReply}>
//                   <Iconify width={24} icon="ic:round-close" sx={{ color: 'text.secondary' }} />
//                 </IconButton>
//               </Box>
//             </Box>
//           )}
//         </Box>
//         <Box sx={{ display: 'flex' }}>
//           <Box sx={{ width: '100%' }}>
//             <InputBase
//               fullWidth
//               name="chat-message"
//               id="chat-message-input"
//               value={message}
//               onChange={handleChangeMessage}
//               onKeyDown={handleKeyDown}
//               placeholder='Type " / " for Quick Replies'
//               disabled={disabled}
//               multiline
//               inputProps={{ style: textStyle }}
//             />
//           </Box>
//           <Box>
//             <IconButton onClick={handleExpandToggle} disabled={disabled}>
//               <Iconify icon={icon} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
//         <Box>
//           <IconButton ref={emojiButtonRef} onClick={handleToggleEmojiPicker} disabled={disabled}>
//             <Iconify icon="eva:smiling-face-fill" />
//           </IconButton>
//           <Popper
//             open={showEmojiPicker}
//             anchorEl={emojiButtonRef.current}
//             placement="top-start"
//             modifiers={[
//               {
//                 name: 'offset',
//                 options: {
//                   offset: [0, 10],
//                 },
//               },
//             ]}
//           >
//             <ClickAwayListener onClickAway={handleCloseEmojiPicker}>
//               <Box>
//                 <EmojiPicker onEmojiClick={handleSelectEmoji} />
//               </Box>
//             </ClickAwayListener>
//           </Popper>
//           <IconButton
//             onClick={toggleBold}
//             sx={{ color: isBold ? '#078DEE' : 'secondary' }}
//             disabled={disabled}
//           >
//             <Iconify icon="heroicons:bold" />
//           </IconButton>
//           <IconButton
//             onClick={toggleItalic}
//             sx={{ color: isItalic ? '#078DEE' : 'secondary' }}
//             disabled={disabled}
//           >
//             <Iconify icon="majesticons:italic-line" />
//           </IconButton>
//           <IconButton
//             onClick={toggleStrikethrough}
//             sx={{ color: isStrikethrough ? '#078DEE' : 'secondary' }}
//             disabled={disabled}
//           >
//             <Iconify icon="mi:strikethrough" />
//           </IconButton>
//           <IconButton onClick={handleAttach} disabled={disabled}>
//             <Iconify icon="eva:attach-2-fill" />
//           </IconButton>
//           <IconButton onClick={() => handleOpenDialog('quick-replies')} disabled={disabled}>
//             <Iconify icon="fa6-solid:reply" />
//           </IconButton>
//           <IconButton onClick={() => handleOpenDialog('template')} disabled={disabled}>
//             <Iconify icon="fluent:mail-template-24-filled" />
//           </IconButton>
//         </Box>
//         <Box>
//           <Button
//             onClick={handleSendMessage}
//             variant="contained"
//             color="primary"
//             endIcon={<Iconify icon="ic:round-send" style={{ width: 18, height: 18 }} />}
//             disabled={disabled}
//             sx={{ mb: 0.5 }}
//           >
//             Send
//           </Button>
//         </Box>
//       </Box>

//       <AttachFileDialog open={dialogType === 'attach'} onClose={handleCloseDialog} />
//       <QuickRepliesDialog open={dialogType === 'quick-replies'} onClose={handleCloseDialog} />
//       <ChooseTemaplte open={dialogType === 'template'} onClose={handleCloseDialog} />
//     </>
//   );
// }

import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useMemo, useState, useCallback } from 'react';

import {
  Box,
  Button,
  Popper,
  InputBase,
  IconButton,
  ClickAwayListener,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uuidv4 } from 'src/utils/uuidv4';
import { fSub, today } from 'src/utils/format-time';

import { sendMessage, createConversation } from 'src/actions/chat';
import {
  setIsVisible,
  setReplyText,
  setImageUrlInReply,
  setImageVisibilityInReply,
  setOriginalImageVisibility,
} from 'src/redux/slices/messageReply';

import { Iconify } from 'src/components/iconify';
import { ChooseTemaplte } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

import { useMockedUser } from 'src/auth/hooks';

import { AttachFileDialog } from './hooks/attach-file-dailog';
import { QuickRepliesDialog } from './hooks/quick-replies-dailog';

export function ChatMessageInput({
  disabled,
  recipients,
  onAddRecipients,
  selectedConversationId,
}) {
  const imageVisibilityInReply = useSelector((state) => state.messageReply.imageVisibilityInReply);
  const router = useRouter();
  const { user } = useMockedUser();
  const fileRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const [message, setMessage] = useState('');
  const [dialogType, setDialogType] = useState(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState('fluent:resize-large-24-regular');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleOpenDialog = useCallback((type) => {
    setDialogType(type);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogType(null);
  }, []);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  const handleSelectEmoji = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: today(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: attachedFile ? [attachedFile] : [],
      body: message,
      contentType: 'text',
      createdAt: fSub({ minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id, attachedFile]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    handleOpenDialog('attach');
  }, [handleOpenDialog]);

  const handleChangeMessage = useCallback(
    (event) => {
      const inputValue = event.target.value;
      setMessage(inputValue);

      if (inputValue.endsWith('/')) {
        handleOpenDialog('quick-replies');
      }
    },
    [handleOpenDialog]
  );

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setMessage((prevMessage) => `${prevMessage}\n`);
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    try {
      if (message.trim() || attachedFile) {
        if (selectedConversationId) {
          await sendMessage(selectedConversationId, messageData);
        } else {
          const res = await createConversation(conversationData);
          router.push(`${paths.dashboard.inbox}?id=${res.conversation.id}`);
          onAddRecipients([]);
        }
        setMessage('');
        setAttachedFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    conversationData,
    message,
    messageData,
    onAddRecipients,
    router,
    selectedConversationId,
    attachedFile,
  ]);

  const toggleBold = useCallback(() => setIsBold((prev) => !prev), []);
  const toggleItalic = useCallback(() => setIsItalic((prev) => !prev), []);
  const toggleStrikethrough = useCallback(() => setIsStrikethrough((prev) => !prev), []);

  const handleExpandToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
    setIcon((prev) =>
      prev === 'fluent:resize-large-24-regular'
        ? 'fluent:resize-small-24-regular'
        : 'fluent:resize-large-24-regular'
    );
  }, []);

  const textStyle = useMemo(
    () => ({
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isStrikethrough ? 'line-through' : 'none',
    }),
    [isBold, isItalic, isStrikethrough]
  );

  const isVisible = useSelector((state) => state.messageReply.isVisible);
  const dispatch = useDispatch();
  const closeReply = () => {
    dispatch(setIsVisible(false));
    dispatch(setReplyText(''));
    dispatch(setImageUrlInReply(''));
    dispatch(setImageVisibilityInReply(false));
    dispatch(setOriginalImageVisibility());
  };
  const replyText = useSelector((state) => state.messageReply.originalReplyText);
  const imageUrlInReply = useSelector((state) => state.messageReply.imageUrlInReply);
  const originalImageVisibilty = useSelector((state) => state.messageReply.originalImageVisibilty);

  const handleFileAttached = useCallback((file) => {
    setAttachedFile(file);
  }, []);


  const handleFileDelete = () => {
    setAttachedFile(null); // This will remove the uploaded file
  };



  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: 1,
          mb: 2,
          width: '100%',
          transition: 'all 0.3s ease',
          minHeight: isExpanded ? '220px' : '120px',
          maxHeight: isExpanded ? '220px' : '120px',
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.vars.palette.divider}`,
          overflowY: 'auto',
        }}
      >
        <Box>
          {isVisible && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Box
                sx={{
                  background: '#CCF4FE',
                  width: '100%',
                  display: 'flex',
                  borderRadius: 1.5,
                  borderLeft: 6,
                }}
              >
                <Box sx={{ width: '100%', p: 2, display: 'flex', alignItems: 'center' }}>
                  {replyText}
                </Box>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  {originalImageVisibilty && (
                    <Box
                      component="img"
                      alt="attachment"
                      src={imageUrlInReply}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 0.5,
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={closeReply}>
                  <Iconify width={24} icon="ic:round-close" sx={{ color: 'text.secondary' }} />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <InputBase
              fullWidth
              name="chat-message"
              id="chat-message-input"
              value={message}
              onChange={handleChangeMessage}
              onKeyDown={handleKeyDown}
              placeholder='Type " / " for Quick Replies'
              disabled={disabled}
              multiline
              inputProps={{ style: textStyle }}
            />
          </Box>
          <Box>
            <IconButton onClick={handleExpandToggle} disabled={disabled}>
              <Iconify icon={icon} />
            </IconButton>
          </Box>
        </Box>
        {attachedFile && (
          <Box sx={{ display: 'flex', my: 2 }}>
            <Box
              sx={{
                background: '#CCF4FE',
                width: '300px',
                height: 100,
                display: 'flex',
                borderRadius: 1.5,
                borderLeft: 6,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {attachedFile.name}
              </Box>
            </Box>
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleFileDelete}>
                <Iconify width={24} icon="ic:round-close" sx={{ color: 'text.secondary' }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <IconButton ref={emojiButtonRef} onClick={handleToggleEmojiPicker} disabled={disabled}>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
          <Popper
            open={showEmojiPicker}
            anchorEl={emojiButtonRef.current}
            placement="top-start"
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={handleCloseEmojiPicker}>
              <Box>
                <EmojiPicker onEmojiClick={handleSelectEmoji} />
              </Box>
            </ClickAwayListener>
          </Popper>
          <IconButton
            onClick={toggleBold}
            sx={{ color: isBold ? '#078DEE' : 'secondary' }}
            disabled={disabled}
          >
            <Iconify icon="heroicons:bold" />
          </IconButton>
          <IconButton
            onClick={toggleItalic}
            sx={{ color: isItalic ? '#078DEE' : 'secondary' }}
            disabled={disabled}
          >
            <Iconify icon="majesticons:italic-line" />
          </IconButton>
          <IconButton
            onClick={toggleStrikethrough}
            sx={{ color: isStrikethrough ? '#078DEE' : 'secondary' }}
            disabled={disabled}
          >
            <Iconify icon="mi:strikethrough" />
          </IconButton>
          <IconButton onClick={handleAttach} disabled={disabled}>
            <Iconify icon="eva:attach-2-fill" />
          </IconButton>
          <IconButton onClick={() => handleOpenDialog('quick-replies')} disabled={disabled}>
            <Iconify icon="fa6-solid:reply" />
          </IconButton>
          <IconButton onClick={() => handleOpenDialog('template')} disabled={disabled}>
            <Iconify icon="fluent:mail-template-24-filled" />
          </IconButton>
        </Box>
        <Box>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="ic:round-send" style={{ width: 18, height: 18 }} />}
            disabled={disabled || (!message.trim() && !attachedFile)}
            sx={{ mb: 0.5 }}
          >
            Send
          </Button>
        </Box>
      </Box>

      <AttachFileDialog
        open={dialogType === 'attach'}
        onClose={handleCloseDialog}
        onFileAttached={handleFileAttached}
      />
      <QuickRepliesDialog open={dialogType === 'quick-replies'} onClose={handleCloseDialog} />
      <ChooseTemaplte open={dialogType === 'template'} onClose={handleCloseDialog} />
    </>
  );
}
