import { StuCourse } from "./StuCourse";
import { StuType } from "./StuType";

export interface Student< course = StuCourse, Type = StuType>{
    key:string;
    id: number;
    name:string | undefined;
    email:string | undefined;
    country:string | undefined;
    courses: course[] | undefined;
    type: Type | null;
    updateAt: string | undefined;
}