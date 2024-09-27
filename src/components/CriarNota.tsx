import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Card, CardContent, IconButton, TextField, Divider } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Nota } from '@/types/models.js';
import { useUser } from '@/contexts/userContext';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';

interface CriarNotaProps {
  addNote: (nota: Nota) => void;
} 
const CriarNota = ({ addNote }: CriarNotaProps ) => {
  // Estados para armazenar o título e a descrição
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>(''); 
  const [favorito, setFavorito] = useState<boolean>(false);
  const { user } = useUser();

  // Função para salvar a nota
  const handleSave = () => {
    if (!user) {
      console.error('Usuário não encontrado!');
      return;
    }

    // Adicionar lógica de salvamento, como enviar dados para um servidor
    const novaNota: Nota = {
      titulo: title,
      descricao: description,
      ehFavorito: favorito,
      cor: '#ffffff', // Definindo uma cor padrão
      pessoaId: user.id 
    };  
    addNote(novaNota); // Chamando a função addNote para adicionar a nova nota
    setTitle(''); // Limpando os campos após salvar
    setDescription('');
    setFavorito(false);
  };

  // Função para lidar com o evento de tecla pressionada no campo de descrição
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita a quebra de linha no campo de texto
      handleSave();
    }
  };

  // Função para lidar com mudanças nos campos de entrada
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleFavoriteChange = () => {
    setFavorito(!favorito);
  };
  return (
    <Card style={{ maxWidth: 700, maxHeight: 230, margin: '20px auto', padding: 0, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
      <CardContent style={{ padding: '10px 16px' }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Título"
            variant="standard"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            InputProps={{ disableUnderline: true }}
            style={{ marginRight: '8px', fontWeight: 'bold' }}
          />
          <IconButton size="small" onClick={handleFavoriteChange}>
            {favorito ? <StarIcon style={{ color: '#fbc02d' }} /> : <StarBorderIcon />}
          </IconButton>
        </div> 
        <Divider style={{ margin: '10px 0' }} /> 
        <TextField
          placeholder="Criar nota..."
          variant="standard"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          onKeyDown={handleKeyDown}
          InputProps={{ disableUnderline: true }}
        />
       <div style={{ display: 'flex', justifyContent: 'flex-end', right: 10 }}>
        <IconButton size="small" onClick={() => handleSave()}>
          <CheckIcon />
        </IconButton>
      </div>
      </CardContent>
    </Card>
  );
};

export default CriarNota;

