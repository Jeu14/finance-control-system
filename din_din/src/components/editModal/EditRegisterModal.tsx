import React, { useState, useEffect } from "react";
import axios from "axios";
import "../registerModal/AddRegisterModal.css";

import "./EditRegisterModal.css";
import { Transacao } from "../../Types/types";
import { NumericFormat } from "react-number-format";
import { getItem } from "../../localStorage/localStorage";

interface EditRegisterModalProps {
  show: boolean;
  onClose: () => void;
  currentRegister: Transacao | undefined;
}

interface Categoria {
  id: number;
  descricao: string;
}

const EditRegisterModal: React.FC<EditRegisterModalProps> = ({
  show,
  onClose,
  currentRegister,
}) => {
  const [valor, setValor] = useState(currentRegister?.valor || "");
  const [categoria, setCategoria] = useState(
    currentRegister?.categoria_id || ""
  );
  const [data, setData] = useState(currentRegister?.data || "");
  const [descricao, setDescricao] = useState(currentRegister?.descricao || "");
  const [tipo, setTipo] = useState<"entrada" | "saida">(
    currentRegister?.tipo || "entrada"
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

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
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRegister = { valor, categoria, data, descricao, tipo };
    console.log(updatedRegister);
    

    try {
      const response = await axios.put(
        `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${currentRegister?.id}`,
        updatedRegister
      );
      console.log("Registro editado:", response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao editar registro:", error);
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
        <h2>Editar Registro</h2>
        <div className="transaction-type">
          <button
            style={{ backgroundColor: tipo === "entrada" ? "#3A9FF1" : "#808080" }}
            onClick={() => handleTipoClick("entrada")}
          >
            Entrada
          </button>
          <button
            style={{ backgroundColor: tipo === "saida" ? "#FF576B" : "#808080" }}
            onClick={() => handleTipoClick("saida")}
          >
            Saída
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Valor</label>
            <NumericFormat
              value={valor}
              onValueChange={(values) => {
                const { value } = values;
                setValor(value);
              }}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.descricao}>
                  {cat.descricao}
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
          <button className="submit-button" type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default EditRegisterModal;
