import axios from 'axios';
import { API_URL } from '../config/config';
import { AES } from "crypto-js";


export function LoginAPI(username: string, password:string, role:string){
    const axios = require('axios'); 
    return axios.post(API_URL + 'login', {
            email: username,
            password: AES.encrypt(password, 'cms').toString(),
            role: role
        }).then(function (response: any) {
            return response.data;
        }).catch(function (error :any) {
            return error;
        });
}


export function studentInfo(page:number, pagesize:number){

    const axios = require('axios');

       
    return axios.get(API_URL + 'students',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                page: page,
                limit: pagesize,
              }
        }).then(function (response: any) {
            var studentValue = (response.data.data.students);
            var totalValue = (response.data.data.total);
            return {students: studentValue, total:totalValue};
            
        })
        
    
    
}



    