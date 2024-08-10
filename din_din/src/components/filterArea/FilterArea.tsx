import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItem } from "../../localStorage/localStorage";

export const FilterArea = ({ onApplyFilters, onClearFilters }) => {
  const [categorias, setCategorias] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const token = getItem("token");
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
  }, []);

  const handleCheckboxChange = (categoria) => {
    setSelectedFilters((prev) =>
      prev.includes(categoria)
        ? prev.filter((item) => item !== categoria)
        : [...prev, categoria]
    );
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onClearFilters(); 
  };

  return (
    <div className="filter-modal">
      <h3 className="name-categories">Filtros por Categoria</h3>
      <div className="box-categories">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`each-category ${
              selectedFilters.includes(categoria.descricao)
                ? "selected-category"
                : ""
            }`}
            onClick={() => handleCheckboxChange(categoria.descricao)}
          >
            {categoria.descricao}
          </div>
        ))}
      </div>
      <div className="container-btn-filters">
        <button className="btn-filters btn-clean" onClick={clearFilters}>
          Limpar Filtros
        </button>
        <button className="btn-filters btn-apply" onClick={applyFilters}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};