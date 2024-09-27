import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, Menu, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { User } from '@/contexts/userContext';

const cores = ['#ffffff', '#e0f7fa', '#ffecb3', '#c8e6c9', '#bbdefb', '#ffccbc', '#d1c4e9', '#f0f4c3']; // Lista de cores

interface FiltroNotasProps {
  user: User | null;
  handleFiltrar: (filtro?: string | null, ehFavorito?: boolean | null, cor?: string | null) => void; 
} 

const FiltroNotas = ({ user, handleFiltrar }: FiltroNotasProps) => {
  const [filtro, setFiltro] = useState<string | null>('');
  const [ehFavorito, setEhFavorito] = useState<boolean | null>(false);
  const [clickFavorito, setClickFavorito] = useState<boolean>(false);
  const [cor, setCor] = useState<string | null>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);   

  useEffect(() => {
    if (clickFavorito)
      atualizarFiltro();
  }, [filtro, ehFavorito, cor]);
  
  const atualizarFiltro = () => {
    handleFiltrar(filtro, ehFavorito, cor);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const alterarCor = (novaCor: string) => {
    setCor(novaCor);
    handleClose();
  };

  const handleLimparFiltros = () => {
    setFiltro('');
    setEhFavorito(null);
    setCor(''); 
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', 
        mt: 2, // Add some margin-top
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Pesquisar notas"
        sx={{
          display: user ? 'flex' : 'none',
          width: { xs: '90%', sm: '50%' },
          backgroundColor: '#ffffff',
          borderRadius: 1,
        }}
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end"> 
                <IconButton>
                  <SearchIcon /> 
                </IconButton> 
              </InputAdornment>
              <IconButton
                onClick={() => {
                  setEhFavorito(!ehFavorito);
                  setClickFavorito(true);
                }}
                sx={{ color: ehFavorito ? '#fbc02d' : 'default' }}  
                aria-label="Marcar como favorito"
              >
                {ehFavorito ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
              <IconButton size="small" aria-label="Selecionar cor" onClick={handleClick}>
                {!cor ? (
                  <img src="cor.svg" alt="Selecionar cor" />
                ) : (
                  <div
                    style={{
                      backgroundColor: cor,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid #ccc',  
                    }}
                  ></div>
                )}
              </IconButton>
              <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={handleClose} 
                MenuListProps={{ style: { display: 'flex', flexDirection: 'column' } }}
              >
                {cores.map((cor, index) => (
                  <MenuItem key={index} onClick={() => alterarCor(cor)} style={{ padding: 0 }}>
                    <div
                      style={{
                        backgroundColor: cor,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        margin: '5px',
                        cursor: 'pointer',
                      }}
                    ></div>
                  </MenuItem>
                ))}
              </Menu>  
            </>
          ),
        }}
      />
      <Button variant="contained" color="secondary" onClick={handleLimparFiltros} sx={{ mt: 2 }}>
        Limpar Filtros
      </Button>
    </Box>
  );
};

export default FiltroNotas;
