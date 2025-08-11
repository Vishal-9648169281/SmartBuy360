import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Truck, ExternalLink, TrendingDown, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/stores/useFavorites';
import { useFavorites } from '@/stores/useFavorites';
import { searchAPI } from '@/services/api';
import SimpleChart from '@/components/SimpleChart';

const ProductCompare = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<Array<{ date: string; price: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggle, isFavorite } = useFavorites();

  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const [productData, historyData] = await Promise.all([
          searchAPI.getProduct(id),
          searchAPI.getPriceHistory(id)
        ]);
        
        setProduct(productData);
        setPriceHistory(historyData);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const bestPrice = Math.min(...product.prices.map(p => p.price));
  const bestDeal = product.prices.find(p => p.price === bestPrice);
  const avgPrice = product.prices.reduce((sum, p) => sum + p.price, 0) / product.prices.length;
  const savings = Math.max(...product.prices.map(p => p.price)) - bestPrice;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link to="/search">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image & Info */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toggle(product)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite(product.id) ? 'fill-current text-red-500' : ''
                }`}
              />
            </Button>
          </div>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground text-sm">
                  {product.description || 'No description available'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <Badge variant="outline">{product.category || 'Electronics'}</Badge>
              </div>

              {product.avgRating && (
                <div>
                  <h4 className="font-medium mb-2">Customer Rating</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.avgRating)
                              ? 'fill-current text-yellow-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{product.avgRating}/5</span>
                    <span className="text-sm text-muted-foreground">
                      ({Math.floor(Math.random() * 1000) + 100} reviews)
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Price Comparison */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-price">{formatPrice(bestPrice)}</div>
              {savings > 1000 && (
                <Badge className="bg-success hover:bg-success/90 text-white">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Save ₹{savings.toLocaleString()}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Best price from {product.prices.length} stores
            </p>
          </div>

          {/* Price Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Price Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.prices
                .sort((a, b) => a.price - b.price)
                .map((price, index) => (
                  <div
                    key={price.vendor}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      index === 0 ? 'border-success bg-success/5' : 'border-border'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{price.vendor}</span>
                        {index === 0 && (
                          <Badge className="bg-success hover:bg-success/90 text-white text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Best Price
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="w-4 h-4" />
                        <span>{price.deliveryEstimate}</span>
                        {price.shipping && price.shipping > 0 && (
                          <span>+ ₹{price.shipping} shipping</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatPrice(price.price)}
                        </div>
                        {price.shipping && price.shipping > 0 && (
                          <div className="text-xs text-muted-foreground">
                            Total: {formatPrice(price.price + price.shipping)}
                          </div>
                        )}
                      </div>
                      
                      <Button asChild className="bg-gradient-hero hover:bg-gradient-hero/90 text-white">
                        <a 
                          href={price.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          Buy Now
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Price History */}
          {priceHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart data={priceHistory} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCompare;
