import axios from 'axios';

const instance = axios.create({});
const baseUrl = 'http://localhost:4000';

export const get = url => {
  return instance.get(`${baseUrl}${url}`);
};
export const post = (url, body) => {
  return instance.post(`${baseUrl}${url}`, body);
};
export const _delete = url => {
  return instance.delete(`${baseUrl}${url}`);
};
export const put = (url,body) => {
  return instance.put(`${baseUrl}${url}`, body);
};
export default {
  get,
  post,
  put,
  _delete,
}