import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps} from 'antd';
import {getCourse} from '../../../lib/api-service';

import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled} from '@ant-design/icons'



function CourseDetails () {
    const router = useRouter()
    const { id } = router.query;
    const [course, setCourse] = React.useState<Course>();
    const { Panel } = Collapse;
    const { Step } = Steps;

    
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

    function showTime(time:string) : any{
        const classTime = course?.schedule?.classTime?.map<String[]>(e => e.split(" ")).find(e => {
            if(e[0] === time){
                return true;
            }
            return false;
        })
        return classTime ? classTime[1] : '';
    }
   
    return <>
        <Dashboard>
            <Breadcrumb style={{marginBottom: 20}}>
                <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Course</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>All courses</Breadcrumb.Item>
                <Breadcrumb.Item>Detail</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col span={12}>
                  
                <Card
                        cover={<Image src={course.cover} alt='CourseCover' style={{height:300}} />}
                        actions={[
                           <div key='Price'> <p style={{color: 'purple', fontSize: 20, marginBottom:0}}>{course.sales?.price}</p>Price</div>,
                           <div key='Batches'> <p style={{color: 'purple', fontSize: 20 , marginBottom:0}}>{course.sales?.batches}</p>Batches</div>,
                           <div key='Students'> <p style={{color: 'purple', fontSize: 20, marginBottom:0}}>{course.sales?.studentAmount}</p>Students</div>,
                           <div key='Earings'> <p style={{color: 'purple', fontSize: 20, marginBottom:0}}>{course.sales?.earnings}</p>Earings</div>,
                           
                           
                          ]}
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
                    <div>
                        <h1 style={{fontSize: 20, color:'purple'}}>Couse Detail</h1>
                    </div>
                    <div>
                        <h5>Create Time</h5>
                    </div>
                    <div>
                        <p>{course.createAt}</p>
                    </div>
                    <div>
                        <h5>Start Time</h5>
                    </div>
                    <div>
                        <p>{course.startTime}</p>
                    </div>
                    <div>
                        
                        <Badge color={'orange'} dot={true} offset={[5, 5]}>
                         <h5>Status</h5>
                        </Badge>
                    </div>
                    <div>
                           <Steps current={ course.schedule?.chapters?.findIndex((item) => item.id === course.schedule?.current)} size={'small'} style={{paddingRight:'60px'}}>
                           {course.schedule?.chapters?.map(e=>{
                               
                                return(
                                    <Step key={e.id} title={e.name} />
                                )
                           
                            })}
                         
                        
                            </Steps>
                    </div>
                       
                    <div>
                        <h5>Course Code</h5>
                    </div>
                    <div>
                        <p>{course.uid}</p>
                    </div>
                    <div>
                        <h5>Class Time</h5>
                    </div>
                    <div>
                        <Descriptions layout="vertical" size="small" bordered>
                            <Descriptions.Item label="Sunday" span={0.15}>{showTime("Sunday")}</Descriptions.Item>
                            <Descriptions.Item label="Monday" span={0.15}>{showTime("Monday")}</Descriptions.Item>
                            <Descriptions.Item label="Tuesday" span={0.15}>{showTime("Tuesday")}</Descriptions.Item>
                            <Descriptions.Item label="Wednesday"span={0.15}>{showTime("Wednesday")}</Descriptions.Item>
                            <Descriptions.Item label="Thursday"span={0.15}>{showTime("Thursday")}</Descriptions.Item>
                            <Descriptions.Item label="Friday"span={0.15}>{showTime("Friday")}</Descriptions.Item>
                            <Descriptions.Item label="Saturday"span={0.15}>{showTime("Saturday")}</Descriptions.Item>
                           
                        </Descriptions>
                    </div>
                    <div>
                        <h5>Category</h5>
                    </div>
                    <div>
                       {course.type?.map(e => <Tag color='processing' key={e.id}>{e.name} </Tag>)}
                    </div>
                    <div>
                        <h5>Description</h5>
                    </div>
                    <div>
                        <p>{course.detail}</p>
                    </div>
                    <div>
                        <h5>Chapter</h5>
                    </div>
                    <div>
                    <Collapse >
                        {course.schedule?.chapters?.map(e=>{
                            
                            return(
                                <Panel header={e.name} key={e.id}>
                                <p>{e.content}</p>
                              </Panel>
                            )
                           
                        })}
                        
                        
                    </Collapse>
                    </div>

                 
                    
                          
                       

                    </Card>
                    
                        
                </Col>
          
            </Row>
        </Dashboard>

       
    </>
}

export default CourseDetails;