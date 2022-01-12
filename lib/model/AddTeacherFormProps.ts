import { TeacherSkill } from "./TeacherSkill";

export interface AddTeacherFormProps <skill = TeacherSkill>{
    name:string;
    email: string;
    country: string;
    phone:string;
    skills: skill[];
}