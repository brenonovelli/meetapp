import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

// Android studio http://10.0.2.2
// GenyMotion http://10.0.3.2
// USB Ip da Rede
