import axios from 'axios'

const serverAxios = axios.create({
  baseURL: 'http://47.95.113.63/ssr'
})

const clientAxios = axios.create({
  baseURL: '/'
})

export {
  clientAxios,
  serverAxios
};
