import { StuCourse } from "./StuCourse";
import { StuType } from "./StuType";

export interface Student< course = StuCourse, Type = StuType>{
    id: number;
    name:string;
    email:string;
    country:string;
    courses: course[];
    type: Type;
    updateAt: string;
}