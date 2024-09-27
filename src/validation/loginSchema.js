import * as yup from 'yup';
import { messages } from '../constants/validationMessages.js';

export const loginSchema = yup.object().shape({
  username: yup.string().required(messages.nomeUsuario.required),
  password: yup.string().required(messages.senha.required),
});
