import axios from 'axios';
import { Student } from './model/student';

export function studentInfo(){
    // const URL = 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api';
    // const AxiosInstance = axios.create({
    //     URL,
    //     withCredentials: true,
    //     responseType: 'json',
    // })
    
    // AxiosInstance.interceptors.request.use(function(config: any){
    //     const token = localStorage.getState().session.token;
    //     config.headers.Authorization= 'Bearer' + token;
    // }) 
    
    const axios = require('axios');
    var value : Student[];
       
    axios.get<Student[]>('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=10',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            // console.log(response);
            value = (response.data.data.students);
            console.log(value);
            return value;
        })
        .catch(function (error :any) {
            console.log(error);
        });
    
    
}

