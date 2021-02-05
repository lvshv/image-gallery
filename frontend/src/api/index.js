import axios from 'axios';

axios.create({
  baseURL: 'https://image-gallery-mern.herokuapp.com/',
});

axios.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { axios };
