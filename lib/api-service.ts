

const URL = 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api';
const AxiosInstance = axios.create({
    URL,
    withCredentials: true,
    responseType: 'json',
})


AxiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getState().session.token;
    config.headers.Authorization= 'Bearer' + token;
}) 

