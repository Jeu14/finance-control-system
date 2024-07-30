import "../index.css";
import "./style.css";

import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";

import { HeaderLogo } from "../components/LogoHeader";
import { registerUser } from "../services/authService";

export const Signup = () => {
  const [form, setForm] = useState<{
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");

    if (!form.nome) {
      setErro("O campo nome é obrigatório");
      return;
    }
    if (!form.email) {
      setErro("O campo email é obrigatório");
      return;
    }
    if (!form.senha) {
      setErro("O campo senha é obrigatório");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro("Digite a mesma senha nos dois campos referentes");
      return;
    }

    try {
      await registerUser(form.nome, form.email, form.senha);
      navigate("/login");
    } catch (error: any) {
      setErro(error.message || "Erro ao cadastrar usuário.");
    }
  };

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="body-login-signup">
      <HeaderLogo isLoggedIn={false} />
      <main className="signup-main-container">
        <div className="area-register">
          <h3>Cadastre-se</h3>
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={form.nome}
              onChange={handleChangeForm}
            />

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChangeForm}
            />

            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={form.senha}
              onChange={handleChangeForm}
            />

            <label htmlFor="confirmSenha">Confirmação de senha</label>
            <input
              id="confirmarSenha"
              type="password"
              value={form.confirmarSenha}
              onChange={handleChangeForm}
            />

            {erro && <span className="erroMensagem">{erro}</span>}

            <button type="submit">Cadastrar</button>

            <div className="login-navigate-button-container">
              <button
                className="login-navigate-button"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Já tem cadastro? Clique aqui!
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
