import { useState, useEffect } from "react";
import "./style.css";
import { ResumeTableProps, Transacao } from "../../Types/types";
import axios from "axios";
import { getItem } from "../../localStorage/localStorage";

export const ResumeTable = ({ transacao }: ResumeTableProps) => {
  const [entrada, setEntrada] = useState<number>(0);
  const [saida, setSaida] = useState<number>(0);
  const saldo = entrada - saida;

  const token = getItem("token");

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const response = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/extrato",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEntrada(response.data.entrada);
        setSaida(response.data.saida);
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar resumo:", error);
      }
    };  
    fetchResumo();
  }, [token]);

  useEffect(() => {
    let totalEntrada = 0;
    let totalSaida = 0;

    transacao.forEach((transacao: Transacao) => {
      if (transacao.tipo === 'entrada') {
        totalEntrada += Number(transacao.valor);
      } else if (transacao.tipo === 'saida') {
        totalSaida += Number(transacao.valor);
      }
    });

    setEntrada(Number(totalEntrada.toFixed(2)));
    setSaida(Number(totalSaida.toFixed(2)));
  }, [transacao]);

  return (
    <div className="resume">
      <div className="container-txt-h2-resume">
        <h2>Resumo</h2>
      </div>
      <table className="table-resume">
        <tbody className="tbody">
          <tr>
            <th scope="row" className="entrace-txt">
              Entradas
            </th>
            <td className="entrace">R$ {entrada.toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row" className="exit-txt">
              Saídas
            </th>
            <td className="exit">R$ {saida.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table className="table-resume">
        <tbody>
          <tr>
            <th scope="row" className="balance-txt">
              Saldo
            </th>
            <td className="balance">R$ {saldo.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
