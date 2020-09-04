import axios from 'axios';
import { port } from '../../build/config';

const serverAxios = (req) => axios.create({
  baseURL: `http://localhost:${port}`,
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
