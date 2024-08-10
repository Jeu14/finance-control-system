import './style.css';
import FilterIcon from '../../assets/icons-8-filtro-481.svg';
import React from 'react';
import { FilterButtonProps } from '../../Types/types';



export const FilterButton: React.FC<FilterButtonProps> = ({ toggleFilters }) => {
  return (
    <div className='filter-button' onClick={toggleFilters}>
      <img src={FilterIcon} alt="filtro" />
      <strong>Filtrar</strong>
    </div>
  );
};