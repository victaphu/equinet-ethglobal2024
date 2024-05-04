import { useState } from 'react';

const useHorseFilters = (initialHorses: any) => {
  const [filteredHorses, setFilteredHorses] = useState(initialHorses);

  const applyFilters = (filters: any) => {
    let filtered = initialHorses;
    if (filters.price) {
      filtered = filtered.filter((horse: any) => horse.pricePerShare >= filters.price.min && horse.pricePerShare <= filters.price.max);
    }
    if (filters.location) {
      filtered = filtered.filter((horse: any) => horse.location === filters.location);
    }
    if (filters.sire) {
      filtered = filtered.filter((horse: any) => horse.sire === filters.sire);
    }
    if (filters.trainer) {
      filtered = filtered.filter((horse: any) => horse.trainer === filters.trainer);
    }
    if (filters.syndicator) {
      filtered = filtered.filter((horse: any) => horse.syndicator === filters.syndicator);
    }
    if (filters.sex) {
      filtered = filtered.filter((horse: any) => horse.sex === filters.sex);
    }
    setFilteredHorses(filtered);
  };

  const resetFilters = () => {
    setFilteredHorses(initialHorses);
  };

  return { filteredHorses, applyFilters, resetFilters };
};

export default useHorseFilters;
