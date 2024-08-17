/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';

// Create the Filter Context
const FilterContext = createContext();

// Create the Filter Provider Component
// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        brand: '',
        category: '',
        priceRange: '',
        sortOption: '',
        searchTerm: ''
    });

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook to use the Filter Context
// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => useContext(FilterContext);
