import { useState, useEffect } from "react";

import XIcon from "../../assets/X-icon.svg";
import AddIcon from "../../assets/add-icon.svg";

import "./style.css";

import { Categoria, FilterAreaProps } from "../../Types/types";
import { fetchCategorias } from "../../services/api";

export const FilterArea: React.FC<FilterAreaProps> = ({ onApplyFilters, onClearFilters }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (categoriaDescricao: string) => {
    setSelectedFilters((prev) =>
      prev.includes(categoriaDescricao)
        ? prev.filter((item) => item !== categoriaDescricao)
        : [...prev, categoriaDescricao]
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
      <h3 className="name-categories"> Categoria</h3>
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
            {categoria.descricao}{" "}
            {selectedFilters.includes(categoria.descricao) ? (
              <img src={XIcon} alt="x icon" />
            ) : (
              <img src={AddIcon} alt="Add icon" />
            )}
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