import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // ⬅️ Backend ka URL
  withCredentials: true,            // ⬅️ Cookie ke liye zaroori
});

export default instance;