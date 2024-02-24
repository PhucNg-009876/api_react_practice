import axios from 'axios'
// create base url
const instance = axios.create({
    baseURL: 'https://reqres.in'
  });

// Add a response interceptor can thiệp việc lấy data
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ?response.data:{statusCode:response.status}; // lấy đúng data cần dùng
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });  
export default instance;  