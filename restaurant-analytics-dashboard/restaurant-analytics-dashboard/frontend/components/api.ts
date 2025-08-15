import axios from 'axios';
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api' });
export async function fetchRestaurants(params: any){ const res = await api.get('/restaurants',{ params }); return res.data; }
export async function fetchRestaurantMetrics(id: number, params: any){ const res = await api.get(`/restaurants/${id}/metrics`,{ params }); return res.data; }
export async function fetchTopRestaurants(params: any){ const res = await api.get('/analytics/top-restaurants',{ params }); return res.data; }
