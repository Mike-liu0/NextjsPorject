import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag} from 'antd';
import {getTeacher} from '../../../lib/api-service';
import { Student } from '../../../lib/model/Student';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import styles from '../../../styles/cardItem.module.css';
import { CourseType } from '../../../lib/model/CourseType';

function TeacherDetails () {
    const router = useRouter()
    const { id } = router.query;
    const [teacher, setTeacher] = React.useState<Teacher>();
    
    useEffect(() => { 
        console.log(id);
        if(id !== undefined){
            fetchData(id);
        }
    }, [id]);

    async function fetchData(id?:string) {
            var stuDetail = await getTeacher(id);
            setTeacher(stuDetail.data);
    }

    if(!teacher){
        return <p>loading</p>
    }

   

   
    return <>
        <Dashboard>
            <Row>
                <Col span={12}>
                  
                    <Card title="Teacher Info" bordered={true} >
                    <style jsx global>{`
                            .ant-descriptions-item-container{
                                justify-content: center;
                            }
                            .ant-descriptions-item-label{
                                font-weight: bold;
                            }
                            .ant-descriptions-item-content{
                                justify-content: center
                            }
                                        
                    `}</style>
                        <Descriptions layout="vertical" column={2}>
                            <Descriptions.Item label="UserName">{teacher.name}</Descriptions.Item>
                            <Descriptions.Item label="Age">{teacher.age}</Descriptions.Item>
                            <Descriptions.Item label="Email">{teacher.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{teacher.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address" >
                            {teacher.address}
                            </Descriptions.Item>
                        
                        </Descriptions>
                    </Card>
                  
                </Col>
              
          
            </Row>
        </Dashboard>

       
    </>
}

export default TeacherDetails;