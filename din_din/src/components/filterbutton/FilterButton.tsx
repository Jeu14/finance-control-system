import './style.css';
import FilterIcon from '../../assets/icons-8-filtro-481.svg';

export const FilterButton = ({ toggleFilters }) => {
  return (
    <div className='filter-button' onClick={toggleFilters}>
      <img src={FilterIcon} alt="filtro" />
      <strong>Filtrar</strong>
    </div>
  );
};