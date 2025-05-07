
import React, { createContext, useState, useContext, ReactNode } from "react";

type FilterType = {
  status: string[];
  membership: string[];
  location: string[];
}

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
  filters: {
    status: [],
    membership: [],
    location: []
  },
  setFilters: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterType>({
    status: [],
    membership: [],
    location: []
  });

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
