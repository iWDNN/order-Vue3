import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.124.45.246:8080',
});

function registerUser(userData) {
  return instance.post('users', userData);
}

export { registerUser };