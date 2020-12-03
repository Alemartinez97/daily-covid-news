import axios from 'axios';
const jwt = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: `http://localhost:4000`,
  transformRequest: [function (data, headers) {
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    headers.Accept = 'application/json';
    headers['Content-type'] = 'application/json';
    return data;
  }, ...axios.defaults.transformRequest],
});

export default axiosInstance;
