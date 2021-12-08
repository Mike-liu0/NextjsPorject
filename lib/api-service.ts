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
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
            
        // }).then(function () {
        //     return null;
        // });
        
    
    
}

export function addNewStudent(name: string, email: string, country: string, type: number){
    console.log(name);
    console.log(email);
    console.log(country);
    console.log(type);
    const axios = require('axios');
    
    return axios.post(API_URL + 'students',{
        name: name,
        email: email,
        country: country,
        type: type,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('add new student');
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        }).then(function () {
        
        });
}

export function deleteStudent(id: string){
    console.log(id);
    const axios = require('axios');
    return axios.delete(API_URL + 'students/'+ id,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        
        }).then(function (response: any) {
            console.log('delete student' + id);
            return response;
        })
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
        // }).then(function () {
        
        // });
}

export function getStudent(id: string){
    console.log(id);
    const axios = require('axios');
    return axios.get(API_URL + 'students/'+id,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            // params: {
            //     id:id,
            //     }
        }).then(function (response: any) {
            console.log('delete student' + id);
            return response;
        })
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
        // }).then(function () {
        
        // });
}

export function editStudent(id:string, name: string, email: string, country: string, type: number){
    console.log(id);
    console.log(name);
    console.log(email);
    console.log(country);
    console.log(type);
    const axios = require('axios');
    
    return axios.post(API_URL + 'students',{
        id: id,
        name: name,
        email: email,
        country: country,
        type: type,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('add new student');
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        }).then(function () {
        
        });
}