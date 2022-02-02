import { CourseSales } from "./CourseSales";
import { CourseType } from "./CourseType";

export interface Course<sales = CourseSales, courseType = CourseType, courseSchedule = CourseSchedule> {
    createAt?: string;
    updateAt?: string ;
    startTime?: string;
    key: string;
    id: number;
    uid?: string;
    name?:string;
    cover?:string;
    duration?:number;
    teacherName?:string;
    maxStudents?:number;
    star?:number;
    price?:number;
    sales?: sales;
    detail?:string;
    type?:courseType[];
    schedule?: courseSchedule;
    teacherId: number;

}


export interface CourseSchedule<chapter = CourseChapter, time = classTime>{
    chapters?: chapter[];
    classTime?: string[] | time[];
    current?: number;
    status?: number;
    scheduleId?: number;
    courseId?: number;
}
export interface CourseChapter {
    content: string;
    createdAt: string;
    id: number;
    name: string;
    order: number;
}

export interface classTime {
    Week: String;
    Time: String;
}
