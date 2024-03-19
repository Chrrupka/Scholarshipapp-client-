
import axios from 'axios';

// Konfiguracja instancji axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Opcjonalnie, dodanie interceptora do dołączania tokena autoryzacyjnego do zapytań
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
