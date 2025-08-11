import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/stores/useFavorites';

const Favorites = () => {
  const { items, remove } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center py-16">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Favorites List is Empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start adding products to your favorites to keep track of items you love and get notified about price drops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button className="bg-gradient-hero hover:bg-gradient-hero/90 text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Browse Featured Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          My Favorites
        </h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? 'product' : 'products'} saved for later
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} showComparison={true} />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => remove(product.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="mt-12 p-6 bg-muted/30 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-1">Price Drop Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get notified when items in your favorites go on sale
            </p>
          </div>
          <Button className="bg-gradient-hero hover:bg-gradient-hero/90 text-white">
            Enable Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
