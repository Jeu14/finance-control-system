import axios from 'axios';
import { LoginError } from '../Types/types';


const API_URL = 'https://din-din-api-production.up.railway.app';

export const loginUser = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;
  } catch (error) {
    const loginError = error as LoginError;
    throw (loginError.message || "Erro de login")
  }
};

export const registerUser = async (nome: string, email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/usuario`, { nome, email, senha })
    return response.data
  } catch (error) {
    const loginError = error as LoginError;
    throw (loginError.message || "Erro ao cadastrar o usuário")
  }
};

