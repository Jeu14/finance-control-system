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