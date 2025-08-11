import React from 'react';

interface DataPoint {
  date: string;
  price: number;
}

interface SimpleChartProps {
  data: DataPoint[];
  className?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ data, className = '' }) => {
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-40 text-muted-foreground ${className}`}>
        No price history available
      </div>
    );
  }

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="h-40 relative bg-muted/30 rounded-lg p-4">
        <div className="absolute inset-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 text-xs text-muted-foreground">
            {formatPrice(maxPrice)}
          </div>
          <div className="absolute left-0 bottom-0 text-xs text-muted-foreground">
            {formatPrice(minPrice)}
          </div>
          
          {/* Chart line */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              points={data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = priceRange === 0 ? 50 : ((maxPrice - point.price) / priceRange) * 100;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = priceRange === 0 ? 50 : ((maxPrice - point.price) / priceRange) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="hsl(var(--primary))"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{new Date(data[0].date).toLocaleDateString()}</span>
        <span>{new Date(data[data.length - 1].date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default SimpleChart;
