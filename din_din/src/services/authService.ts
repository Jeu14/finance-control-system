import axios from 'axios';





const API_URL = 'https://desafio-backend-03-dindin.pedagogico.cubos.academy';

export const loginUser = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || 'Erro desconhecido';
  }
};

export const registerUser = async (nome: string, email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/usuario`, { nome, email, senha })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao cadastrar usuário')
  }
}


// Função para obter transações
export const getTransacoes = () => {
  return axios.get('/transacoes');
};

// Função para criar uma nova transação
export const createTransacao = (transacao: Transacao) => {
  return axios.post('/transacoes', transacao);
};

// Função para atualizar uma transação existente
export const updateTransacao = (id: number, transacao: Partial<Transacao>) => {
  return axios.put(`/transacoes/${id}`, transacao);
};

// Função para excluir uma transação
export const deleteTransacao = (id: number) => {
  return axios.delete(`/transacoes/${id}`);
};

// Função para obter categorias
export const getCategorias = () => {
  return axios.get('/categorias');
};

// Função para obter detalhes de uma transação
export const getTransacao = (id: number) => {
  return axios.get(`/transacoes/${id}`);
};