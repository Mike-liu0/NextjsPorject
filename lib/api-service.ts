import axios from 'axios';
import { API_URL } from '../config/config';
import { AES } from "crypto-js";
import { TeacherSkill } from './model/TeacherSkill';
import { Course, CourseSchedule } from './model/Course';


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

export function LogoutAPI(){
    const axios = require('axios'); 
    return axios.post(API_URL + 'logout', {}, {
           headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(function (response: any) {
            console.log(response);
            return response;
        }).catch(function (error :any) {
            return error;
        });
}


////////Student API Related

export function studentInfo(query:string, page:number, pagesize?:number){
    const axios = require('axios');
    return axios.get(API_URL + 'students',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                query:query,
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


// export function searchStudentInfo(query:string, page:number, pagesize:number){
//     const axios = require('axios');
//     return axios.get(API_URL + 'students',{
//             headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
//             params: {
//                 query:query,
//                 page: page,
//                 limit: pagesize,
//               }
//         }).then(function (response: any) {
//             var studentValue = (response.data.data.students);
//             var totalValue = (response.data.data.total);
//             return {students: studentValue, total:totalValue};
            
//         })
//         // .catch(function (error:any) {
//         //     // handle error
//         //     console.log(error);
            
//         // }).then(function () {
//         //     return null;
//         // });
        
    
    
// }

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
    const axios = require('axios');
    return axios.get(API_URL + 'students/'+id,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            // params: {
            //     id:id,
            //     }
        }).then(function (response: any) {
            // console.log(response.data);
            return response.data;
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
    
    return axios.put(API_URL + 'students',{
        id: id,
        name: name,
        email: email,
        country: country,
        type: type,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('edit student info');
            console.log(response);
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        });
}



////////Teacher API Related

export function TeacherInfo(query:string, page?:number, pagesize?:number){
    const axios = require('axios');
    return axios.get(API_URL + 'teachers',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                query:query,
                page: page,
                limit: pagesize,
              }
        }).then(function (response: any) {
            var listValue = (response.data.data.teachers);
            var totalValue = (response.data.data.total);
            return {data: listValue, total:totalValue};
            
        })
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
            
        // }).then(function () {
        //     return null;
        // });
        
    
    
}



export function getTeacher(id: string | string[]){
    const axios = require('axios');
    return axios.get(API_URL + 'teachers/'+id,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            // params: {
            //     id:id,
            //     }
        }).then(function (response: any) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error:any) {
            // handle error
            console.log(error);
        })
}

export function addNewTeacher(name: string, email: string, country: string, phone:string, skills:TeacherSkill[]){
    const axios = require('axios');
    
    return axios.post(API_URL + 'teachers',{
        name: name,
        email: email,
        country: country,
        phone: phone,
        skills: skills,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('add new student');
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        });
}

export function editTeacher(id:string,name: string, email: string, country: string, phone:string, skills:TeacherSkill[]){
    const axios = require('axios');
    
    return axios.put(API_URL + 'teachers',{
        id: id,
        name: name,
        email: email,
        country: country,
        phone: phone, 
        skills: skills,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        });
}


export function deleteTeacher(id: string){
    console.log(id);
    const axios = require('axios');
    return axios.delete(API_URL + 'teachers/'+ id,{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        
        }).then(function (response: any) {
            console.log('delete student' + id);
            return response;
        })
}


// Courses API


export function CourseInfo( page:number, pagesize?:number){
    const axios = require('axios');
    return axios.get(API_URL + 'courses',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                page: page,
                limit: pagesize,
              }
        }).then(function (response: any) {
            var listValue = (response.data.data.courses);
            var totalValue = (response.data.data.total);
            return {data: listValue, total:totalValue};
        })
     
    
    
}

export function getCourse(id: string | string[]){
    const axios = require('axios');
    return axios.get(API_URL + 'courses/detail',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
                id:id,
                }
        }).then(function (response: any) {
            console.log(response.data);
            return response.data;
        })
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
        // }).then(function () {
        
        // });
}
export function getCourseTypes(){
    const axios = require('axios');
    return axios.get(API_URL + 'courses/type',{
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
           
        }).then(function (response: any) {
            return response.data.data;
        })
        // .catch(function (error:any) {
        //     // handle error
        //     console.log(error);
        // }).then(function () {
        
        // });
}



export function addNewCourse(course: Course){
    const axios = require('axios');
    return axios.post(API_URL + 'courses',{
        name: course.name,
        uid: course.uid,
        detail: course.detail,
        startTime: course.startTime,
        price: course.price,
        maxStudents: course.maxStudents,
        duration: course.duration,
        durationUnit: 1,
        cover: course.cover,
        teacherId: course.teacherId,
        type: course.type,
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('add new Course');
            console.log(response);
            return response.data;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        });
}



export function editCourse(course: Course){
    const axios = require('axios');
    
    return axios.post(API_URL + 'courses',{
        name: course.name,
        uid: course.uid,
        detail: course.detail,
        startTime: course.startTime,
        price: course.price,
        maxStudents: course.maxStudents,
        duration: course.duration,
        durationUnit: 1,
        cover: course.cover,
        teacherId: course.teacherId,
        type: {name: course.type},
      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('edit  Course');
            return response;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        }).then(function () {
        
        });
}


export function addCourseSchedule(schedule: CourseSchedule){
    const axios = require('axios');
    return axios.put(API_URL + 'courses/schedule',{
        scheduleId:schedule.scheduleId,
        courseId: schedule.courseId,
        current: schedule.current,
        status: schedule.status,
        chapters: schedule.chapters,
        classTime: schedule.classTime,

      },{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            console.log('add schedule');
            return response.data;
        }).catch(function (error:any) {
            // handle error
            console.log(error);
        });
}

