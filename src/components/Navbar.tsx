import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FolderIcon from '@mui/icons-material/Folder';
import { IconButton, Menu, MenuItem, Typography, AppBar, Toolbar, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useUser } from '@/contexts/userContext';
import { useRouter } from 'next/router';
import { logout } from '../services/api/auth';
import FiltroNotas from './FiltroNotas';
import { useNotas } from '@/hooks/useNotas';

const Navbar = () => {
  const { user, loading, triggerTokenChange } = useUser(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    triggerTokenChange();
    handleClose();
    router.push('/login');
  };

  
  return (
    <AppBar position="static" color="default" elevation={4} sx={{ backgroundColor: '#f8f8f8', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src="logo.png" alt="logo" />
        </IconButton>
 
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
          CoreNotes
        </Typography>   
        {/* <FiltroNotas user={user} handleFiltrar={handleFiltrar}/> */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ color: '#6200ea', fontSize: '1.5rem', marginLeft: 'auto' }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Typography textAlign="center">{loading ? "Carregando..." : user?.nomeUsuario || "Usuário não encontrado"}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center" style={{ color: 'inherit', textDecoration: 'none' }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
