import axios from 'axios';

const api = axios.create({
  baseURL: 'http://candango.ngrok.io/api/candango',
});

export default api;