import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate} from 'antd';
import {getTeacher} from '../../../lib/api-service';

import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Teacher } from '../../../lib/model/Teacher';
import { TeacherSkill } from '../../../lib/model/TeacherSkill';



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

    async function fetchData(id:string | string[]) {
            
            var stuDetail = await getTeacher(id);
            setTeacher(stuDetail.data);
    }

    if(!teacher){
        return <p>loading</p>
    }

   
    const { TabPane } = Tabs;
   
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
                            <Descriptions.Item label="Country">{teacher.country}</Descriptions.Item>
                            <Descriptions.Item label="Email">{teacher.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{teacher.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address" >
                                  {teacher.profile?.address}
                            </Descriptions.Item>
                        
                        </Descriptions>
                    </Card>
                  
                </Col>
              
                <Col span={12}>
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="About" key="1">
                                <h1 className=" font-bold text-purple-400 text-xl">Information</h1>
                                <Descriptions  column={1}  >
                                    
                                    <Descriptions.Item label="Birthday" >{teacher.profile?.birthday}</Descriptions.Item>
        
                                    <Descriptions.Item label="Gender" >{teacher.profile?.gender == 1 ?"male" :"female" }</Descriptions.Item>
                                    <Descriptions.Item label="Create Time" >{teacher.profile?.createdAt}</Descriptions.Item>
                                    <Descriptions.Item label="Update Time" >{teacher.profile?.updatedAt}</Descriptions.Item>

                                </Descriptions>
                                <h1 className=" font-bold text-purple-400 text-xl">Skills</h1>
                                <Descriptions  column={1}  >
                                  {teacher.skills?.map((e:TeacherSkill)=> <Descriptions.Item label={e.name} key={e.name} ><Rate value={e.level} className="mx-8" /></Descriptions.Item>)}  
                                </Descriptions>
                                <h1 className=" font-bold text-purple-400 text-xl">Description</h1>
                                <p>{teacher.profile?.description}</p>
                            </TabPane>
                            <TabPane tab="Courses" key="2">
                                {/* <Table columns={columns} dataSource={student.courses}/> */}
                            </TabPane>
                        
                        </Tabs>
                    </Card>
                </Col>
          
            </Row>
        </Dashboard>

       
    </>
}

export default TeacherDetails;