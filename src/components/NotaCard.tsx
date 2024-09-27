import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Card, CardContent, IconButton, TextField, Divider, Menu, MenuItem } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'; 
import CheckIcon from '@mui/icons-material/Check';
import { Nota } from '@/types/models.js';

const cores = ['#ffffff', '#e0f7fa', '#ffecb3', '#c8e6c9', '#bbdefb', '#ffccbc', '#d1c4e9', '#f0f4c3']; // Lista de cores

interface NotaCardProps {
  note: Nota;
  handleExcluir: (id: number) => void; 
  handleEditar: (id: number, note: Nota) => void;
}

const NotaCard = ({ note, handleExcluir, handleEditar }: NotaCardProps) => {
  const [titulo, setTitulo] = useState<string>(note.titulo || 'Título');
  const [descricao, setDescricao] = useState<string>(note.descricao || 'Clique ou arraste o arquivo para esta área para fazer upload');
  const [cor, setCor] = useState<string>(note.cor || '#ffffff'); // Cor padrão (branco)
  const [editando, setEditando] = useState<boolean>(false);
  const [favorito, setFavorito] = useState<boolean>(note.ehFavorito || false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);  

  const alternarEdicao = () => {
    if (editando && note?.id) {  
        handleEditar(note.id, { ...note, titulo, descricao, cor, ehFavorito: favorito });
    }
    setEditando(!editando);
  };
 
  const alterarCor = (novaCor: string) => {
    setCor(novaCor);
    if (note?.id)
      handleEditar(note.id, { ...note, cor: novaCor });
  };
 
  const alternarFavorito = () => {
    const novoFavorito = !favorito;
    setFavorito(novoFavorito);
    if (note?.id)
      handleEditar(note.id, { ...note, ehFavorito: novoFavorito });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if (editando && note?.id)
        handleEditar(note.id, { ...note, titulo, descricao, cor, ehFavorito: favorito });
      setEditando(false);
    }
  };
 
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (editando) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ maxWidth: 300, margin: '20px', backgroundColor: cor, borderRadius: '12px', position: 'relative' }}>
      <CardContent style={{ padding: '16px' }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editando ? (
            <TextField
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              style={{ marginRight: '8px' }}
            />
          ) : (
            <h3>{titulo}</h3>
          )}
          <IconButton size="small" onClick={alternarFavorito}>
            {favorito ? <StarIcon style={{ color: '#fbc02d' }} /> : <StarBorderIcon />}
          </IconButton>
        </div>
 
        <Divider style={{ margin: '10px 0' }} />
 
        {editando ? (
          <TextField
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="standard"
            fullWidth
            multiline
            rows={4}
            InputProps={{ disableUnderline: true }}
          />
        ) : (
          <p>{descricao}</p>
        )}
 
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <IconButton size="small" onClick={alternarEdicao}>
            {(!editando ? <EditIcon /> : <CheckIcon/>)}
          </IconButton>
          <IconButton size="small" aria-label="selecionar cor" onClick={handleClick}>
            <img src="cor.svg" alt="selecionar cor" />
          </IconButton>
           
          <div style={{ flexGrow: 1 }}></div>

          <IconButton size="small" onClick={() => {
            if (note?.id)
              handleExcluir(note.id)
          }}>
            <CloseIcon />
          </IconButton>
        </div>
 
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} MenuListProps={{ style: { display: 'flex', flexDirection: 'row' } }}>
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
      </CardContent>
    </Card>
  );
};

export default NotaCard;
