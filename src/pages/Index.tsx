import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Search, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchTabs from '@/components/SearchTabs';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

const Index = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-hero px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Compare prices across 50+ stores
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Best Prices
              </span>
              <br />
              in Seconds
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Compare products across multiple online stores, track price history, 
              and never overpay again. Smart shopping made simple.
            </p>
          </div>

          {/* Search Interface */}
          <SearchTabs />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">50+</div>
              <div className="text-sm text-muted-foreground">Online Stores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">₹2.5L+</div>
              <div className="text-sm text-muted-foreground">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-price">100K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SmartBuy360?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make online shopping smarter with advanced comparison tools and real-time price tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
                <p className="text-muted-foreground text-sm">
                  Search by name, barcode, or image. Our AI finds the exact products you need.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Price Protection</h3>
                <p className="text-muted-foreground text-sm">
                  Track prices and get alerts when your favorite products go on sale.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-price rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
                <p className="text-muted-foreground text-sm">
                  Get real-time price comparisons across all major e-commerce platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Products</h2>
              <p className="text-muted-foreground">Popular items with the best price deals</p>
            </div>
            <Link to="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
