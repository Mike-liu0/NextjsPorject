import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions } from 'antd';
import {getStudent} from '../../../lib/api-service';
import { Student } from '../../../lib/model/Student';
import Dashboard from '../../../components/dashboard';

function StudentDetails () {
    const router = useRouter()
    const { id } = router.query;
    const [student, setStudent] = React.useState<Student>();
    
    useEffect(() => { 
        console.log(id);
        if(id !== undefined){
            fetchData(id);
        }
    }, [id]);

    async function fetchData(id:string) {
            var stuDetail = await getStudent(id);
            console.log(stuDetail.data);
            setStudent(stuDetail.data);
            console.log(student);   
    }


    if(!student){
        return <p>loading</p>
    }

    return <>
        <Dashboard>
        
            
            <Card title="Student Info" bordered={false} style={{ width: 800 }}>
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">{student.name}</Descriptions.Item>
                    <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
                    <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{student.phone}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                    {student.address}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Dashboard>
    </>
}

export default StudentDetails;