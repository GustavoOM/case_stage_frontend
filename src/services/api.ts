import axios from 'axios';

const api = axios.create({
    baseURL: 'https://case-stage-backend.onrender.com',
});

export default api;