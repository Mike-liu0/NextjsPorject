import axios from 'axios';
import { Student } from './model/student';

export function studentInfo(page:number, pagesize:number){

    const axios = require('axios');
    var value;

       
    return axios.get<>('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                page: page,
                limit: pagesize,
              }
        }).then(function (response: any) {
            value = (response.data.data);
            return value;
            
        })
        .catch(function (error :any) {
            console.log(error);
        });
    
    
}




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
    