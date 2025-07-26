    import axios, { type AxiosInstance } from 'axios';
    import { useAuth0 } from '@auth0/auth0-react';
    import { useRef } from 'react';

    const useApi = (): AxiosInstance => {
      const { getAccessTokenSilently } = useAuth0();
      const apiRef = useRef<AxiosInstance | null>(null);

      if (!apiRef.current) {
        apiRef.current = axios.create({
          // BURAYI KENDİ API'NİZİN GERÇEK HTTP ADRESİ VE PORTU İLE GÜNCELLEYİN!
          // Ekran görüntünüzde http://localhost:5218 görünüyor.
          baseURL: 'http://localhost:5218/api', // <-- Bu satır 'http' olarak değiştirildi!
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
    