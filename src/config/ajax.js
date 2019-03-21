import axios from 'axios';
import api from './config';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = api[process.env.NODE_ENV].host;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
//请求拦截去
axios.interceptors.request.use(
    config => {  // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
  
  
  //http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log(response)
        return response&&response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;