import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItem } from "../../localStorage/localStorage";
import { Categoria, FilterAreaProps } from "../../Types/types";
import XIcon from "../../assets/X-icon.svg";
import AddIcon from "../../assets/add-icon.svg";

export const FilterArea: React.FC<FilterAreaProps> = ({ onApplyFilters, onClearFilters }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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