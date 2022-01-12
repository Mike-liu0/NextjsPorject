export interface Course {
    createAt?: string;
    updateAt?: string ;
    startTime?: string;
    key: string;
    id: number;
    name?:string;
    cover?:string;
    duration?:number;
    teacherName?:string;
    maxStudents?:number;
    star?:number;
}