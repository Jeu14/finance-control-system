import React, { useState, useEffect } from "react";
import axios from "axios";

import "./EditUserModal.css";
import { getItem } from "../../localStorage/localStorage";
import { EditUserModalProps } from "../../Types/types";

export const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onClose,
  onNameUpdate,
}) => {
  const token = getItem("token");
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [confirmarSenha, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/usuario",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    const updatedUser = { nome, email, senha };

    try {
      const response = await axios.put(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/usuario",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuário atualizado:", response.data);
      onNameUpdate(nome);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirme a Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="edit-user-button">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};


