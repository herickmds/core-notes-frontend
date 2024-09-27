import React from 'react';
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { login } from '@/services/api/auth';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from '../validation/loginSchema.js'; 
import { useUser } from '@/contexts/userContext';

const Login = () => {
  const router = useRouter();
  const { triggerTokenChange } = useUser();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data : any) => {
    
    try {
      const jwt = await login(data.username, data.password);
      localStorage.setItem('token', jwt);
      triggerTokenChange();
      router.push('/');
    } catch (error) {
      localStorage.removeItem('token');
      triggerTokenChange();
      toast.error('Falha ao autenticar. Verifique seu usuário e senha.'); 
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome de usuário"
            autoComplete="username"
            autoFocus
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#6200EA' }}
          >
            Entrar
          </Button>
          <Link href="/register" variant="body2">
            {"Não tem uma conta? Registre-se"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
