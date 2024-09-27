import * as yup from 'yup';
import { messages } from '../constants/validationMessages';

export const registerSchema = yup.object().shape({
  nome: yup.string().required(messages.nome.required),
  nomeUsuario: yup.string().required(messages.nomeUsuario.required),
  email: yup.string().required(messages.email.required).email(messages.email.invalid),
  senha: yup.string().required(messages.senha.required).min(6, messages.senha.minLength),
  dataNascimento: yup.date().required(messages.dataNascimento).nullable().transform((value, originalValue) => originalValue === '' ? null : value)
});
 