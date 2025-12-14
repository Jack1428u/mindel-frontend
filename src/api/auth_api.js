import api from './config'

export const login = (username, password) => {
    return api.post('/token/', { username, password });
}

export const register = (userData) => {
    return api.post('/register/', userData);
}
