import { StuCourse } from "./StuCourse";
import { StuType } from "./StuType";

export interface Student< course = StuCourse, Type = StuType>{
    key: string;
    id: number;
    name: string;
    email?:string ;
    country?:string;
    courses?: course[];
    type?: Type;
    updateAt?: string ;
    age?: number ;
    phone?: string ;
    address?: string;
    interest?: string[];
    memberEndAt?: string;
    memberStartAt?: string;
    gender?:number;
    education?: string;
    description?:string;
}