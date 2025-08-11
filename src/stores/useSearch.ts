import { create } from 'zustand';

export type SearchType = 'name' | 'barcode' | 'image';
export type SortBy = 'price' | 'rating' | 'delivery';

interface SearchState {
  query: string;
  searchType: SearchType;
  sortBy: SortBy;
  isLoading: boolean;
  results: any[];
  setQuery: (query: string) => void;
  setSearchType: (type: SearchType) => void;
  setSortBy: (sort: SortBy) => void;
  setLoading: (loading: boolean) => void;
  setResults: (results: any[]) => void;
  clearResults: () => void;
}

export const useSearch = create<SearchState>((set) => ({
  query: '',
  searchType: 'name',
  sortBy: 'price',
  isLoading: false,
  results: [],
  setQuery: (query) => set({ query }),
  setSearchType: (searchType) => set({ searchType }),
  setSortBy: (sortBy) => set({ sortBy }),
  setLoading: (isLoading) => set({ isLoading }),
  setResults: (results) => set({ results }),
  clearResults: () => set({ results: [] })
}));
