import { axios } from './index.js';

export const registration = async (email, password, confirmPassword) => {
  const { data } = await axios.post('/register', {
    email,
    password,
    confirmPassword,
  });
  localStorage.setItem('token', data.token);
  return data;
};

export const login = async (email, password) => {
  const { data } = await axios.post('/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return data;
};

export const getMe = async () => {
  const { data } = await axios.get('/auth');
  return data;
};

export const getPhotos = async () => {
  const { data } = await axios.get('/photos');

  return data;
};
export const uploadPhotos = async image => {
  const { data } = await axios.post('/upload', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
