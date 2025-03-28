import axios from "axios";
import { getItem } from "../localStorage/localStorage";

const apiUrl = "https://din-din-api-production.up.railway.app";

export const fetchCategorias = async () => {
  const token = getItem("token");
  const response = await axios.get(`${apiUrl}/categoria`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addRegister = async (newRegister: any) => {
  const token = getItem("token");
  await axios.post(`${apiUrl}/transacao`, newRegister, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRegister = async (id: number, updatedRegister: any) => {
  const token = getItem("token");
  await axios.put(`${apiUrl}/transacao/${id}`, updatedRegister, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchExtract = async () => {
  const token = getItem("token");
  const response = await axios.get(`${apiUrl}/transacao/extrato`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTransacao = async (id: number) => {
  const token = getItem("token");
  await axios.delete(`${apiUrl}/transacao/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchTransacoes = async () => {
  const token = getItem("token");
  const response = await axios.get(`${apiUrl}/transacao`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUser = async () => {
  const token = getItem("token");
  const response = await axios.get(`${apiUrl}/usuario`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (updatedUser: any) => {
  const token = getItem("token");
  await axios.put(`${apiUrl}/usuario`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchHomeTransacoes = async (filters: string[] = []) => {
  const token = getItem("token");
  const response = await axios.get(`${apiUrl}/transacao`, {
    params: filters.length > 0 ? { filtro: filters } : {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
