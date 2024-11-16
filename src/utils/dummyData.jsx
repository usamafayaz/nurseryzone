// src/utils/dummyData.js
export const DUMMY_PLANTS = [
  {
    id: '1',
    name: 'Rose Plant',
    season: 'Spring',
    type: 'Flower',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    stock: 50,
  },
  {
    id: '2',
    name: 'Snake Plant',
    season: 'All Season',
    type: 'Indoor',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    stock: 30,
  },
  // Add more dummy plants...
];

export const DUMMY_ORDERS = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    date: '2024-03-15',
    total: 89.97,
    status: 'Pending',
    items: [
      {plantId: '1', quantity: 2, price: 29.99},
      {plantId: '2', quantity: 1, price: 19.99},
    ],
  },
  // Add more dummy orders...
];

export const DUMMY_REVIEWS = [
  {
    id: 'REV001',
    customerName: 'Jane Smith',
    plantId: '1',
    plantName: 'Rose Plant',
    rating: 5,
    comment: 'Beautiful and healthy plant!',
    date: '2024-03-10',
  },
  // Add more dummy reviews...
];

export const DUMMY_CUSTOMERS = [
  {
    id: 'CUS001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    joinDate: '2024-01-15',
    orderCount: 5,
  },
  // Add more dummy customers...
];
