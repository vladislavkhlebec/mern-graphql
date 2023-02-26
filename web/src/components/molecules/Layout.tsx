import NoteIcon from '@mui/icons-material/Note';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  minHeight: '100vh'
}));

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <NoteIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Notes App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Container>
  );
};
