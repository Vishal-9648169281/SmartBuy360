import { Product } from '../stores/useFavorites';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    image: 'https://images.unsplash.com/photo-1592910073723-a7b7de3da57a?w=400',
    avgRating: 4.8,
    category: 'Electronics',
    description: 'Latest iPhone with A17 Pro chip and advanced camera system',
    prices: [
      {
        vendor: 'Amazon',
        price: 134900,
        link: 'https://amazon.in',
        deliveryEstimate: '1-2 days',
        shipping: 0
      },
      {
        vendor: 'Flipkart',
        price: 132900,
        link: 'https://flipkart.com',
        deliveryEstimate: '2-3 days',
        shipping: 0
      },
      {
        vendor: 'Croma',
        price: 135900,
        link: 'https://croma.com',
        deliveryEstimate: '3-5 days',
        shipping: 500
      }
    ]
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra 256GB Titanium Black',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    avgRating: 4.7,
    category: 'Electronics',
    description: 'Premium Android flagship with S Pen and advanced AI features',
    prices: [
      {
        vendor: 'Samsung Store',
        price: 129999,
        link: 'https://samsung.com',
        deliveryEstimate: '1-2 days',
        shipping: 0
      },
      {
        vendor: 'Amazon',
        price: 127500,
        link: 'https://amazon.in',
        deliveryEstimate: '2-3 days',
        shipping: 0
      },
      {
        vendor: 'Flipkart',
        price: 128900,
        link: 'https://flipkart.com',
        deliveryEstimate: '1-2 days',
        shipping: 0
      }
    ]
  },
  {
    id: '3',
    title: 'Apple MacBook Air M3 13-inch 8GB/256GB Space Grey',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    avgRating: 4.9,
    category: 'Laptops',
    description: 'Ultra-thin laptop with M3 chip for incredible performance',
    prices: [
      {
        vendor: 'Apple Store',
        price: 114900,
        link: 'https://apple.com',
        deliveryEstimate: '2-4 days',
        shipping: 0
      },
      {
        vendor: 'Amazon',
        price: 112900,
        link: 'https://amazon.in',
        deliveryEstimate: '1-2 days',
        shipping: 0
      },
      {
        vendor: 'Vijay Sales',
        price: 115900,
        link: 'https://vijaysales.com',
        deliveryEstimate: '3-5 days',
        shipping: 1000
      }
    ]
  },
  {
    id: '4',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    avgRating: 4.6,
    category: 'Audio',
    description: 'Premium wireless headphones with industry-leading noise cancellation',
    prices: [
      {
        vendor: 'Sony Center',
        price: 29990,
        link: 'https://sony.com',
        deliveryEstimate: '2-3 days',
        shipping: 0
      },
      {
        vendor: 'Amazon',
        price: 27999,
        link: 'https://amazon.in',
        deliveryEstimate: '1-2 days',
        shipping: 0
      },
      {
        vendor: 'Flipkart',
        price: 28500,
        link: 'https://flipkart.com',
        deliveryEstimate: '2-4 days',
        shipping: 0
      },
      {
        vendor: 'Croma',
        price: 29500,
        link: 'https://croma.com',
        deliveryEstimate: '3-5 days',
        shipping: 200
      }
    ]
  },
  {
    id: '5',
    title: 'Dell XPS 13 Plus Intel i7 16GB/512GB',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    avgRating: 4.5,
    category: 'Laptops',
    description: 'Premium ultrabook with stunning InfinityEdge display',
    prices: [
      {
        vendor: 'Dell Store',
        price: 145999,
        link: 'https://dell.com',
        deliveryEstimate: '5-7 days',
        shipping: 0
      },
      {
        vendor: 'Amazon',
        price: 142500,
        link: 'https://amazon.in',
        deliveryEstimate: '2-3 days',
        shipping: 0
      },
      {
        vendor: 'Flipkart',
        price: 144900,
        link: 'https://flipkart.com',
        deliveryEstimate: '3-5 days',
        shipping: 500
      }
    ]
  }
];

export const mockPriceHistory = {
  '1': [
    { date: '2024-01-01', price: 139900 },
    { date: '2024-01-15', price: 137900 },
    { date: '2024-02-01', price: 135900 },
    { date: '2024-02-15', price: 134900 },
    { date: '2024-03-01', price: 132900 }
  ],
  '2': [
    { date: '2024-01-01', price: 134999 },
    { date: '2024-01-15', price: 132999 },
    { date: '2024-02-01', price: 130999 },
    { date: '2024-02-15', price: 129999 },
    { date: '2024-03-01', price: 127500 }
  ]
};

export const mockReviews = [
  {
    id: '1',
    productId: '1',
    rating: 5,
    text: 'Excellent phone with amazing camera quality and performance!',
    author: 'TechReviewer',
    date: '2024-02-20',
    helpful: 45
  },
  {
    id: '2',
    productId: '1',
    rating: 4,
    text: 'Great phone but battery could be better for heavy usage.',
    author: 'MobileUser',
    date: '2024-02-18',
    helpful: 23
  },
  {
    id: '3',
    productId: '2',
    rating: 5,
    text: 'The S Pen functionality is incredible for productivity!',
    author: 'BusinessUser',
    date: '2024-02-19',
    helpful: 38
  }
];
