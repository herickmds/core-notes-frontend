export const messages = {
    nomeUsuario: {
      required: 'Nome de usuário é obrigatório',
    },
    nome: {
      required: 'O nome é obrigatório',
    }, 
    email: {
      required: 'O e-mail é obrigatório',
      invalid: 'O e-mail é inválido'
    },
    senha: {
      required: 'A senha é obrigatória',
      minLength: 'A senha deve ter pelo menos 6 caracteres'
    },
    dataNascimento: {
      required: 'Data de nascimento é obrigatória',
      invalid: 'Data inválida'
    },
    date: {
      invalid: 'Data inválida'
    },
    titulo: {
      required: 'Título é obrigatório',
      minLength: 'Título deve ter pelo menos 3 caracteres'
    },
    descricao: {
      required: 'Descrição é obrigatória',
      minLength: 'Descrição deve ter pelo menos 5 caracteres'
    },
    dataPrazoLimite: {
      invalid: 'Data inválida'  
    },
    pessoa:{
      required: 'Pessoa é obrigatória',
    },
    ehConcluida: {
      invalid: 'Valor inválido para conclusão' 
    },
    notas: {
      buscarErro: 'Falha ao buscar notas',
      criarErro: 'Falha ao criar nota',
      excluirErro: 'Falha ao excluir nota',
      atualizarErro: 'Falha ao atualizar nota',
    },
    apiErrors: {
      badRequest: "Requisição inválida. Por favor, verifique os dados enviados.",
      unauthorized: "Não autorizado. Faça login para continuar.",
      forbidden: "Acesso negado. Você não tem permissão para realizar esta ação.",
      notFound: "Recurso não encontrado. Tente novamente mais tarde.",
      internalServerError: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
      unknownError: "Erro desconhecido ao realizar operação.",
      networkError: "Erro de rede: O servidor não está respondendo."
    },
  };