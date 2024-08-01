import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddRegisterModal.css";
import { getItem } from "../../localStorage/localStorage";

interface AddRegisterModalProps {
  show: boolean;
  onClose: () => void;
}

const AddRegisterModal: React.FC<AddRegisterModalProps> = ({
  show,
  onClose,
}) => {
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState<ICategoria[]>([]);
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const token = getItem("token");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoria(response.data);
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    setCategoriaSelecionada(categoria[0]?.descricao)
  }, [categoria])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("entrou");
    
    e.preventDefault();
    const categoriaId = categoria.find(option => option.descricao === categoriaSelecionada)?.id
    const newRegister = { tipo, valor, categoria_id: categoriaId, data, descricao };

    try {
      const response = await axios.post(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        newRegister,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registro adicionado:", response);
      if (response.status === 201) {
        setTipo("entrada") 
        setCategoriaSelecionada("")
        setData("")
        setValor("")
        setDescricao("")
      }
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
              type="number"
              value={valor}
              onChange={e => setValor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select
              value={categoriaSelecionada}
              onChange={e => setCategoriaSelecionada(e.target.value)}
            >
              {categoria.map((option, index) => (
                <option key={index} value={option.descricao}>
                  {option.descricao}
                </option>
              ))}
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

interface ICategoria {
  id: string;
  descricao: string;
}

export default AddRegisterModal;
