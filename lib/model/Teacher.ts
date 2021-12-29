import { TeacherSkill } from "./TeacherSkill";


export interface Teacher<skill = TeacherSkill>{
    key: string;
    id: number;
    name?:string;
    email?:string ;
    country?:string;
    createAt?: string;
    updateAt?: string ;
    phone?: string ;
    courseAmount?: number;
    profileId?:number;
    skills ?: skill[];
}