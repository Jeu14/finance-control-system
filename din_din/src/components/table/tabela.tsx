import '../../index.css';
import EditIcon from '../../assets/icons-8-editar-3.svg';
import TrashIcon from '../../assets/icons-8-lixo-1.svg';
import Triangulo from '../../assets/triangulo.svg';
import axios from 'axios';
import { getItem } from '../../localStorage/localStorage';
import { ICategoria, TabelaProps } from '../../Types/types';
import { useEffect, useState } from 'react';

export const Tabela = ({ transacao, setTransacao, setEditRegister, setCurrentRegister }: TabelaProps) => {
  const token = getItem("token");
  const [categorias, setCategorias] = useState<ICategoria[]>([])

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token]);

  const getCategoriaDescricao = (categoriaId: any) => {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.descricao : 'Desconhecida';
  };

  const handleData = (data: string) => {
    const date = new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return date;
  };

  const handleGetDay = (data: string) => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'sábado', 'Domingo'];
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
      setTransacao(transacao.filter((transacao) => transacao.id !== id));
      
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  const handleEditRegister = (id: number) => {
    setEditRegister(true);
    setCurrentRegister(transacao.find((transacao) => transacao.id === id));
  };

  return (
    <div className='container-table'>
      <table>
        <thead>
          <tr>
            <th scope='col' className='data-th-txt'>
              Data
              <img src={Triangulo} alt='icone reorganizar por data' />
            </th>
            <th>Dia da Semana</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transacao.map((transacao) => (
            <tr key={transacao.id}>
              <td>{handleData(transacao.data)}</td>
              <td>{handleGetDay(transacao.data)}</td>
              <td className='table-description'>{transacao.descricao}</td>
              <td className='table-category'>{getCategoriaDescricao(transacao.categoria_id)}</td>
              <td className='col-value' style={{ color: transacao.tipo === 'saida' ? '#FA8C10' : '#7B61FF' }}>
                R$ {transacao.valor}
              </td>
              <td className='edit-icon'>
                <img src={EditIcon} alt="ícone de editar" style={{ cursor: 'pointer' }} onClick={() => handleEditRegister(transacao.id)} />
                <img src={TrashIcon} alt="ícone de deletar" style={{ marginLeft: '13px', cursor: 'pointer' }} onClick={() => handleDeleteItem(transacao.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};