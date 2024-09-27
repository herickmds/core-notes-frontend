import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { register as registerUser } from '@/services/api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSchema } from '@/validation/registerSchema';

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      toast.success('Registro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      toast.error('Falha ao registrar. Tente novamente.'); 
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Paper elevation={3} sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            autoComplete="name"
            autoFocus
            {...register('nome')}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nomeUsuario"
            label="Nome de usuário"
            autoComplete="username"
            {...register('nomeUsuario')}
            error={!!errors.nomeUsuario}
            helperText={errors.nomeUsuario?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="senha"
            label="Senha"
            type="password"
            autoComplete="current-password"
            {...register('senha')}
            error={!!errors.senha}
            helperText={errors.senha?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dataNascimento"
            label="Data de nascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dataNascimento')}
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#6200EA'}} 
          >
            Registrar
          </Button>
          <Link href="/login" variant="body2">
            {"Já possui uma conta? Entre aqui"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
