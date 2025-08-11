import axios from 'axios';
import { mockProducts, mockPriceHistory, mockReviews } from '../data/mockData';
import { Product } from '../stores/useFavorites';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 10000
});

// Mock delay to simulate real API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchAPI = {
  async searchProducts(query: string, type: 'name' | 'barcode' | 'image' = 'name'): Promise<Product[]> {
    await delay(800); // Simulate API delay
    
    if (type === 'name') {
      return mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (type === 'barcode') {
      // Simulate barcode search - return random products
      return mockProducts.slice(0, 2);
    }
    
    if (type === 'image') {
      // Simulate image search - return products from similar category
      return mockProducts.slice(0, 3);
    }
    
    return [];
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(500);
    return mockProducts.find(product => product.id === id) || null;
  },

  async getPriceHistory(id: string) {
    await delay(400);
    return mockPriceHistory[id as keyof typeof mockPriceHistory] || [];
  },

  async getReviews(productId: string) {
    await delay(300);
    return mockReviews.filter(review => review.productId === productId);
  },

  async submitReview(review: {
    productId: string;
    rating: number;
    text: string;
    author: string;
  }) {
    await delay(500);
    // In a real app, this would submit to the backend
    return { success: true, id: Date.now().toString() };
  },

  async uploadImage(file: File): Promise<Product[]> {
    await delay(1200); // Longer delay for image processing
    // Simulate image recognition returning similar products
    return mockProducts.slice(0, 3);
  }
};

export default api;
