import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLogo } from "../components/Logoheader/LogoHeader";
import "../index.css";
import { setItem } from "../localStorage/localStorage";
import { loginUser } from "../services/authService";
import "./style.css";
import {LoginProps} from '../Types/types'



export const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [form, setForm] = useState<{ email: string; senha: string }>({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");

    if (!form.email) {
      setErro("E-mail precisa ser fornecido");
      return;
    }
    if (!form.senha) {
      setErro("Senha precisa ser fornecida");
      return;
    }

    try {
      const data = await loginUser(form.email, form.senha);
      setItem("token", data.token);
      setItem("userId", data.usuario.id);
      setItem("name", data.usuario.nome);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error: any) {
      setErro(error.message || "Usuário e/ou senha inválido(s).");
    }
  };

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="body-login-signup">
      <HeaderLogo isLoggedIn={false} />
      <main>
        <div className="texto-principal">
          <h1>
            Controle suas <strong>finanças</strong>, sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>
          <button
            onClick={() => navigate("/sign-up")}
            style={{ cursor: "pointer" }}
          >
            Cadastre-se
          </button>
        </div>
        <div className="area-login">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
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
            {erro && <span className="erroMensagem">{erro}</span>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </main>
    </div>
  );
};
