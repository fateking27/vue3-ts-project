import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;

const instance = axios.create({
    baseURL: VITE_BASE_URL
})

instance.interceptors.request.use(config => {
    // 配置前端发给后端的数据格式
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    // 添加 token
    config.headers.Authentication = localStorage.token;
    return config;
})

//响应拦截
instance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            location.href = '/login'
            // location.reload()
        }
        return Promise.reject(err);
    }
)

export default instance;