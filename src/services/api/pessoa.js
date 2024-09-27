import axiosInstance from '../config/axiosConfig';

export async function buscarPessoas() {
  try {
    const resposta = await axiosInstance.get('/pessoas');
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function buscarPessoaPorId(id) {
  try {
    const resposta = await axiosInstance.get(`/pessoas/${id}`);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function criarPessoa(pessoa) {
  try {
    const resposta = await axiosInstance.post('/pessoas', pessoa);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function atualizarPessoa(id, pessoa) {
  try {
    const resposta = await axiosInstance.put(`/pessoas/${id}`, pessoa);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function excluirPessoa(id) {
  try {
    await axiosInstance.delete(`/pessoas/${id}`);
  } catch (erro) { 
    throw erro;
  }
}
