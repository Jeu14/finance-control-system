import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddRegisterModal.css";

interface AddRegisterModalProps {
  show: boolean;
  onClose: () => void;
}

const AddRegisterModal: React.FC<AddRegisterModalProps> = ({
  show,
  onClose,
}) => {
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria');
        setCategoria(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRegister = { valor, categoria, data, descricao };

    try {
      const response = await axios.post(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacoes",
        newRegister
      );
      console.log("Registro adicionado:", response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar registro:", error);
    }
  };

  const handleTipoClick = (tipo: "entrada" | "saida") => {
    setTipo(tipo);
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
        <h2>Adicionar Registro</h2>
        <div className="transaction-type">
          <button
            style={{
              backgroundColor: tipo === "entrada" ? "#3A9FF1" : "#808080",
            }}
            onClick={() => handleTipoClick("entrada")}
          >
            Entrada
          </button>
          <button
            style={{
              backgroundColor: tipo === "saida" ? "#FF576B" : "#808080",
            }}
            onClick={() => handleTipoClick("saida")}
          >
            Saída
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Valor</label>
            <input
              type="text"
              value={valor}
              onChange={e => setValor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </div>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegisterModal;
