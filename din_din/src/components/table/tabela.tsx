import "../../index.css";
import "./style.css";

import EditIcon from "../../assets/icons-8-editar-3.svg";
import TrashIcon from "../../assets/icons-8-lixo-1.svg";
import Triangulo from "../../assets/triangulo.svg";
import axios from "axios";
import { getItem } from "../../localStorage/localStorage";
import { ICategoria, TabelaProps, Transacao } from "../../Types/types";
import { useEffect, useState } from "react";
import { EditRegisterModal } from "../editModal/EditRegisterModal";
import { ConfirmDeletePopup } from "../confirmdeletepopup/ConfirmDeletePopup";

export const Tabela = ({
  transacao,
  setTransacao,
  setEditRegister,
  setCurrentRegister,
}: TabelaProps) => {
  const token = getItem("token");
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditRegister] = useState<Transacao | undefined>(undefined);
  const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null);
  const [isAscending, setIsAscending] = useState(true);

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

  const getCategoriaDescricao = (categoriaId: number) => {
    const categoria = categorias.find(cat => Number(cat.id) === categoriaId);
    return categoria ? categoria.descricao : "Desconhecida";
  };

  const handleData = (data: string) => {
    const date = new Date(data).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
    return date;
  };

  const handleGetDay = (data: string) => {
    const daysOfWeek = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];
    const date = new Date(data);
    const day = date.getDay();
    return daysOfWeek[day];
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(
        `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransacao(transacao.filter(transacao => transacao.id !== id));
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  const handleEditRegister = (id: number) => {
    const registro = transacao.find(transacao => transacao.id === id);
    if (registro) {
      setCurrentRegister(registro);
      setEditRegister(true);
    }
  };

  const fetchTransacoes = async () => {
    try {
      const response = await axios.get(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransacao(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const handleSort = () => {
    const sortedTransacao = [...transacao].sort((a, b) => {
      const dateA = new Date(a.data).getTime();
      const dateB = new Date(b.data).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setIsAscending(!isAscending);
    setTransacao(sortedTransacao);
  };

  return (
    <div className="container-table">
      <table className="transation-table">
        <thead className="titles-container">
          <tr className="title-container-text">
            <th scope="col" className="data-th-txt" onClick={handleSort}>
              Data
              <img
                src={Triangulo}
                alt="ícone reorganizar por data"
                className={isAscending ? "rotate-up" : "rotate-down"}
              />
            </th>
            <th>Dia da Semana</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list-container">
          {transacao.map(transacao => (
            <tr key={transacao.id} className="list-item">
              <td>
                <p className="Data-item">{handleData(transacao.data)}</p>
              </td>
              <td>
                <p>{handleGetDay(transacao.data)}</p>
              </td>
              <td className="table-description">
                <p>{transacao.descricao}</p>
              </td>
              <td className="table-category">
                <p>{getCategoriaDescricao(transacao.categoria_id)}</p>
              </td>
              <td
                className="col-value"
                style={{
                  color: transacao.tipo === "saida" ? "#FA8C10" : "#7B61FF",
                }}
              >
                <p>R$ {transacao.valor}</p>
              </td>
              <td className="edit-icon">
                <p>
                  <img
                    src={EditIcon}
                    alt="ícone de editar"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditRegister(transacao.id)}
                  />
                  <img
                    src={TrashIcon}
                    alt="ícone de deletar"
                    style={{ marginLeft: "13px", cursor: "pointer" }}
                    onClick={() => setShowDeletePopup(transacao.id)}
                  />
                  {showDeletePopup === transacao.id && (
                    <ConfirmDeletePopup
                      onConfirm={() => {
                        handleDeleteItem(transacao.id);
                        setShowDeletePopup(null);
                      }}
                      onCancel={() => setShowDeletePopup(null)}
                    />
                  )}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && currentEditRegister && (
        <EditRegisterModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            setShowEditModal(false);
            fetchTransacoes();
          }}
          currentRegister={currentEditRegister}
        />
      )}
    </div>
  );
};