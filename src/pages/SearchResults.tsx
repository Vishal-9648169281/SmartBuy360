import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { useSearch } from '@/stores/useSearch';
import { searchAPI } from '@/services/api';
import { Product } from '@/stores/useFavorites';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price');
  
  const query = searchParams.get('q') || '';
  const searchType = (searchParams.get('type') || 'name') as 'name' | 'barcode' | 'image';

  useEffect(() => {
    const performSearch = async () => {
      if (!query && searchType !== 'image') return;
      
      setIsLoading(true);
      try {
        const results = await searchAPI.searchProducts(query, searchType);
        setProducts(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, searchType]);

  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => {
          const aMin = Math.min(...a.prices.map(p => p.price));
          const bMin = Math.min(...b.prices.map(p => p.price));
          return aMin - bMin;
        });
      case 'rating':
        return sorted.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
      case 'delivery':
        return sorted.sort((a, b) => {
          const aFastest = Math.min(...a.prices.map(p => parseInt(p.deliveryEstimate.split('-')[0])));
          const bFastest = Math.min(...b.prices.map(p => parseInt(p.deliveryEstimate.split('-')[0])));
          return aFastest - bFastest;
        });
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const getSearchTitle = () => {
    if (searchType === 'image') return 'Image Search Results';
    if (searchType === 'barcode') return `Barcode Search: ${query}`;
    return `Search Results for "${query}"`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{getSearchTitle()}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{products.length} products found</span>
          {searchType === 'name' && query && (
            <Badge variant="outline">{searchType}: {query}</Badge>
          )}
          {searchType !== 'name' && (
            <Badge variant="outline">{searchType} search</Badge>
          )}
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-muted/30 rounded-xl">
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Lowest Price</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Searching for the best deals...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && products.length === 0 && query && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or using a different search method.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      )}

      {!isLoading && sortedProducts.length > 0 && (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showComparison={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
