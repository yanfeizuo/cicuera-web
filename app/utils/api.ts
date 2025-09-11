import { API_BASE_URL, JWT_TOKEN } from "../constants";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}
export const fetchWithAuth = (url: string, options: FetchOptions = {}) => {
  const token = localStorage.getItem(JWT_TOKEN);
  
  const headers: HeadersInit = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(`${API_BASE_URL}/${url}`, {
    ...options,
    headers
  });
}