// apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // your base URL here
  headers: {
    'Content-Type': 'application/json',
    // any other headers can go here
  },
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token'); // fetch your token from localStorage
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
