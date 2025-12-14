import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                // No refresh token, logout
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Try to refresh the token
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);

                // Update the authorization header
                originalRequest.headers['Authorization'] = `Bearer ${access}`;

                processQueue(null, access);
                isRefreshing = false;

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token is also invalid, logout
                processQueue(refreshError, null);
                isRefreshing = false;

                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
