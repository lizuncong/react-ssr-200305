import axios from 'axios';

const serverAxios = (req) => axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    cookie: req.get('cookie') || '',
  },
});

const clientAxios = axios.create({
  baseURL: '/',
});

export {
  clientAxios,
  serverAxios,
};
