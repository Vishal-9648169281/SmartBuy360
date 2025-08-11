import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/stores/useFavorites';
import { useSearch } from '@/stores/useSearch';

const Header = () => {
  const navigate = useNavigate();
  const { items } = useFavorites();
  const { query, setQuery } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-hero rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                SmartBuy360
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Find Best Prices</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-background border-border focus:border-primary transition-colors"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-success text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm">
              <ShoppingCart className="w-5 h-5" />
              <span className="sr-only">Cart</span>
            </Button>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
