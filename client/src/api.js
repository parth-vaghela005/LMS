import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1/auth' });
export const initiatePurchase = (data) => API.post('/initiate', data);
export const simulatePaymentWithCard = (data) => API.post('/simulate-payment-with-card', data);
