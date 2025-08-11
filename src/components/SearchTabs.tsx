import React, { useRef, useState } from 'react';
import { Search, Scan, ImageIcon, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch, SearchType } from '@/stores/useSearch';
import { searchAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const SearchTabs = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { query, searchType, setQuery, setSearchType, setLoading, setResults } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchAPI.searchProducts(query, searchType);
      setResults(results);
      navigate(`/search?q=${encodeURIComponent(query)}&type=${searchType}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    try {
      const results = await searchAPI.uploadImage(file);
      setResults(results);
      navigate('/search?type=image');
    } catch (error) {
      console.error('Image search error:', error);
    } finally {
      setIsImageUploading(false);
    }
  };

  const tabs = [
    {
      id: 'name' as SearchType,
      label: 'Product Name',
      icon: Search,
      placeholder: 'Search by product name or brand...',
    },
    {
      id: 'barcode' as SearchType,
      label: 'Barcode',
      icon: Scan,
      placeholder: 'Enter barcode number...',
    },
    {
      id: 'image' as SearchType,
      label: 'Image Search',
      icon: ImageIcon,
      placeholder: 'Upload product image...',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex rounded-t-2xl bg-gradient-card border border-border overflow-hidden shadow-card">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSearchType(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 ${
                searchType === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Content */}
      <div className="bg-card rounded-b-2xl border border-t-0 border-border p-6 shadow-card">
        {searchType === 'image' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Upload Product Image</h3>
                  <p className="text-muted-foreground mt-1">
                    Take a photo or upload an image to find similar products
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isImageUploading}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isImageUploading ? 'Processing...' : 'Choose File'}
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {React.createElement(tabs.find(t => t.id === searchType)?.icon || Search, { className: 'w-5 h-5' })}
              </div>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tabs.find(t => t.id === searchType)?.placeholder}
                className="pl-12 pr-32 h-14 text-lg bg-background border-border focus:border-primary transition-colors"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-hero hover:bg-gradient-hero/90 text-white px-6"
                disabled={!query.trim()}
              >
                Search
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchTabs;
