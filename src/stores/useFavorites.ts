import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  image: string;
  avgRating: number;
  prices: Array<{
    vendor: string;
    price: number;
    link: string;
    deliveryEstimate: string;
    shipping?: number;
  }>;
  category?: string;
  description?: string;
}

interface FavoritesState {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggle: (product: Product) => void;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  items: JSON.parse(localStorage.getItem('smartbuy360-favorites') || '[]'),
  add: (product) => {
    set((state) => {
      const newItems = state.items.some(item => item.id === product.id) 
        ? state.items 
        : [...state.items, product];
      localStorage.setItem('smartbuy360-favorites', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  remove: (id) => {
    set((state) => {
      const newItems = state.items.filter(item => item.id !== id);
      localStorage.setItem('smartbuy360-favorites', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  isFavorite: (id) => get().items.some(item => item.id === id),
  toggle: (product) => {
    const { isFavorite, add, remove } = get();
    if (isFavorite(product.id)) {
      remove(product.id);
    } else {
      add(product);
    }
  }
}));
