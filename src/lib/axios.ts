import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: '', // empty means same origin, so `/api/...` works out of the box
   headers: {
      'Content-Type': 'application/json',
   },
   // You can set timeout, etc., here if you like
});

// Example interceptor: attach auth token if you use Clerk or another auth
// axiosInstance.interceptors.request.use(async config => {
//   const token = await getAuthTokenSomehow();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default axiosInstance;
