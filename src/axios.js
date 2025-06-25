import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-dnfrozenfoods.kassa-pay.com'
});

export default axiosInstance;
