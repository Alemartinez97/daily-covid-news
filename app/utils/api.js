import axios from 'axios';
import {getUser} from './storage';

const instance = axios.create({});
const baseUrl = 'http://api.q-hay.com';

instance.interceptors.request.use(async (config) => {
  const user = await getUser();
  if(user){
    config.headers['USER_TOKEN'] = user.token;
  }
  return config;
});

export const get = url => {
  return instance.get(`${baseUrl}/admin${url}`);
};
export const post = (url, body) => {
  return instance.post(`${baseUrl}/admin${url}`, body);
};
export const _delete = url => {
  return instance.delete(`${baseUrl}/admin${url}`);
};
export default {
  get,
  post,
  _delete,
};
