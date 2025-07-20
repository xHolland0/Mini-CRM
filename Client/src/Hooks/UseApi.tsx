import axios, { type AxiosInstance } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useRef } from 'react';

/**
 * API çağrıları için Access Token'ı otomatik olarak ekleyen özel bir hook.
 * Axios'u yapılandırır ve her isteğe Authorization başlığını ekler.
 * useRef kullanarak Axios instance'ının her render'da yeniden oluşturulmasını engeller.
 */
const useApi = (): AxiosInstance => {
  const { getAccessTokenSilently } = useAuth0();

  // Axios instance'ını bir useRef içinde saklayarak her render'da yeniden oluşmasını engelliyoruz.
  // Bu, useEffect'in bağımlılık dizisindeki 'api' referansının sabit kalmasını sağlar.
  const apiRef = useRef<AxiosInstance | null>(null);

  if (!apiRef.current) {
    apiRef.current = axios.create({
      baseURL: 'http://localhost:5218/api', // <--API URL
    });

    apiRef.current.interceptors.request.use(async (config) => {
      try {
        const token = await getAccessTokenSilently();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error('API çağrısı için Access Token alınamadı:', error);
        return Promise.reject(error);
      }
    });
  }

  return apiRef.current;
};

export default useApi;
