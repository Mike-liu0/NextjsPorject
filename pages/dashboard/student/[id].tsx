import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag} from 'antd';
import {getStudent} from '../../../lib/api-service';
import { Student } from '../../../lib/model/Student';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import styles from '../../../styles/cardItem.module.css';
import { CourseType } from '../../../lib/model/CourseType';

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

    async function fetchData(id?:string) {
            var stuDetail = await getStudent(id);
            setStudent(stuDetail.data);
    }


    console.log(student)

    if(!student){
        return <p>loading</p>
    }

    const { TabPane } = Tabs;
    
    function swtichTab(key:number) {
    console.log(key);
    }

    const columns = [
        {
          title: 'No',
          dataIndex: 'courseId',
          key: 'courseId',
          render : (text:any, record:any, index:number) => index+1,
        
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
           render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: CourseType[]) => type?.map((item) => item.name).join(','),
          },
          {
            title: 'Join Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
             render: (text: string) => text,
          }
    ]

   
    return <>
        <Dashboard>
            <Row>
                <Col span={12}>
                  
                    <Card title="Student Info" bordered={true} style={{ width: 800 }}>
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
                            <Descriptions.Item label="UserName">{student.name}</Descriptions.Item>
                            <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
                            <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{student.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address" >
                            {student.address}
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
                                    
                                    <Descriptions.Item label="Education" >{student.education}</Descriptions.Item>
                                    <Descriptions.Item label="Area" >{student.country}</Descriptions.Item>
                                    <Descriptions.Item label="Gender" >{student.gender == 1 ?"male" :"female" }</Descriptions.Item>
                                    <Descriptions.Item label="Member Period" >{student.memberStartAt} - {student.memberEndAt}</Descriptions.Item>
                                    <Descriptions.Item label="Type" >{student.type?.name}</Descriptions.Item>
                                    {/* <Descriptions.Item label="Create Time" >{student.createdAt}</Descriptions.Item> */}
                                    {/* <Descriptions.Item label="Update Time" >{student.updatedAt}</Descriptions.Item> */}
                                
                                    
                                </Descriptions>
                                <h1 className=" font-bold text-purple-400 text-xl">Interesting</h1>
                                   {student.interest.map((e:string)=> <Tag color="volcano">{e}</Tag>)}
                                <h1 className=" font-bold text-purple-400 text-xl">Description</h1>
                                <p>{student.description}</p>
                            </TabPane>
                            <TabPane tab="Courses" key="2">
                                <Table columns={columns} dataSource={student.courses}/>
                            </TabPane>
                        
                        </Tabs>
                    </Card>
                </Col>
          
            </Row>
        </Dashboard>

       
    </>
}

export default StudentDetails;