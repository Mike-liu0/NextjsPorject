import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate} from 'antd';
import {getCourse} from '../../../lib/api-service';

import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled} from '@ant-design/icons'



function CourseDetails () {
    const router = useRouter()
    const { id } = router.query;
    const [course, setCourse] = React.useState<Course>();
    
    useEffect(() => { 
        if(id !== undefined){
            fetchData(id);
        }
    }, [id]);

    async function fetchData(id:string | string[]) {
            
        let detail = await getCourse(id);
        setCourse(detail.data);
    }
    if(!course){
        return <p>loading</p>
    }

   
    return <>
        <Dashboard>
            <Row>
                <Col span={12}>
                  
                <Card
                        cover={<img src={course.cover} style={{height:300}} />}
                        >
                        <p style={{fontWeight:'bold'}}>{course.name}</p>
                        <div style={{display: 'flex', alignContent:'center', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                            <div>{course.startTime}</div>
                            <div><HeartFilled style={{color:'red'}} /> {course.star}</div>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                            <div>Duration: </div>
                            <div style={{fontWeight:'bold'}}>{course.duration} years</div>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                            <div>Teacher: </div>
                            <div style={{fontWeight:'bold'}}>{course.maxStudents}</div>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                            <div>Teacher: </div>
                            <div style={{fontWeight:'bold', color:'Blue'}}>{course.teacherName}</div>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                            <div>  Student Limit:</div>
                            <div style={{fontWeight:'bold'}}>{course.maxStudents}</div>
                        </div>
                        
                        
                        </Card>
                  
                </Col>
              
                <Col span={12}>
                    <Card>
                       
                    </Card>
                </Col>
          
            </Row>
        </Dashboard>

       
    </>
}

export default CourseDetails;