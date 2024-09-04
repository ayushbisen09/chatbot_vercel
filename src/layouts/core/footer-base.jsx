import React from 'react';
import { useLocation } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';

import { varAlpha } from 'src/theme/styles';

import { FooterSection } from './footer-section';

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

export function FooterBase({
  sx,
  
 

 
  
 
}) {
  const theme = useTheme();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login'; // Adjust this path if your login route is different

  return (
    <FooterSection
      sx={{
        backgroundColor: 'common.white',
        border: '1px dashed ',
        height: '40px',
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
        ...sx,

        
      }}
      
    />
  );
}
