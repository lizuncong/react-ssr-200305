import axios from 'axios';

const serverAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

const clientAxios = axios.create({
  baseURL: '/',
});

export {
  clientAxios,
  serverAxios,
};
