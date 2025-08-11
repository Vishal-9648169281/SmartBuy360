import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Truck, ExternalLink, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/stores/useFavorites';
import { useFavorites } from '@/stores/useFavorites';

interface ProductCardProps {
  product: Product;
  showComparison?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showComparison = true }) => {
  const { toggle, isFavorite } = useFavorites();
  
  const bestPrice = Math.min(...product.prices.map(p => p.price));
  const bestPriceVendor = product.prices.find(p => p.price === bestPrice);
  const priceRange = product.prices.length > 1 ? 
    Math.max(...product.prices.map(p => p.price)) - bestPrice : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDelivery = (estimate: string) => {
    return estimate.replace(/(\d+)-(\d+) days/, '$1-$2 days');
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card hover:shadow-card-hover transition-all duration-300 border-border/50">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite(product.id) ? 'fill-current text-red-500' : 'text-muted-foreground'
              }`}
            />
          </Button>

          {/* Best Price Badge */}
          {priceRange > 1000 && (
            <Badge className="absolute top-2 left-2 bg-success hover:bg-success/90 text-white">
              <TrendingDown className="w-3 h-3 mr-1" />
              Save ₹{priceRange.toLocaleString()}
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title & Rating */}
          <div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            {product.avgRating && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-current text-yellow-500" />
                <span className="text-xs text-muted-foreground">
                  {product.avgRating} ({Math.floor(Math.random() * 1000) + 100} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-price">
                {formatPrice(bestPrice)}
              </span>
              {product.prices.length > 1 && (
                <span className="text-xs text-muted-foreground">
                  from {product.prices.length} stores
                </span>
              )}
            </div>

            {/* Best Vendor Info */}
            {bestPriceVendor && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="w-3 h-3" />
                  <span>{formatDelivery(bestPriceVendor.deliveryEstimate)}</span>
                </div>
                <span className="text-brand font-medium">{bestPriceVendor.vendor}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {showComparison ? (
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full text-xs h-8">
                  Compare Prices
                </Button>
              </Link>
            ) : (
              <Button variant="outline" className="flex-1 text-xs h-8">
                View Details
              </Button>
            )}
            
            {bestPriceVendor && (
              <Button 
                asChild
                className="flex-1 bg-gradient-hero hover:bg-gradient-hero/90 text-white text-xs h-8"
              >
                <a 
                  href={bestPriceVendor.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  Buy Now
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
