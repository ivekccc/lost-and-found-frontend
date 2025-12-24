import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // prilagodi po potrebi

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor za auth token i logove
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // ...
    return config;
  },
  (error) => {
    // ...
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

http.interceptors.response.use(
  (response) => {
    // ...
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    // Ako je token istekao i imamo refresh token, pokušaj refresh
    if ((status === 401 || status === 403) && !originalRequest._retry && localStorage.getItem('refreshToken')) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        })
        .then((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return http(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(API_BASE_URL + '/auth/refresh', { refreshToken });
        localStorage.setItem('authToken', res.data.accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
        http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
        processQueue(null, res.data.accessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
        return http(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    // ...
    return Promise.reject(error);
  }
);

export default http;
