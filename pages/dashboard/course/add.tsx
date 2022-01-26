import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps,  Form,
    Input, InputNumber,Cascader,Select,DatePicker, Checkbox,Button,AutoComplete,Upload} from 'antd';
import {addNewCourse, getCourse ,getCourseTypes,getTeacher, TeacherInfo} from '../../../lib/api-service';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled} from '@ant-design/icons'
import {v4 as uuidv4} from 'uuid';
import { Teacher } from '../../../lib/model/Teacher';
import { apiResolver } from 'next/dist/server/api-utils';
import { CourseType } from '../../../lib/model/CourseType';
import { type } from 'os';


function AddCourse () {
    const { Step } = Steps;
    const [form] = Form.useForm();
    const { Option } = Select;
    const [teachers, setTeachers] = React.useState<Teacher[]>([]);
    const [courseTypes, setCourseTypes] = React.useState<CourseType[]>([]);

    let uuid = uuidv4();
    console.log(uuid);
    const onFinish = (values: Course) => {
        console.log('Received values of form: ', values);
        addNewCourse(values);
      };



     const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

      async function fetchTypes (){
        let response = await getCourseTypes();
        setCourseTypes(response);
      }

      async function fetchTeachers (query:string){
        let response = await getTeacher(query);
        return response.data;
        // setTeachers(response);
        // console.log(response);
      }

      useEffect(() => {
        fetchTypes();
        // fetchTeachers();
      }, [])


    return (
    <>
        <Dashboard>
            <Breadcrumb style={{marginBottom: 20}}>
                <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Course</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Add Course</Breadcrumb.Item>
            </Breadcrumb>
            <Steps
                type="navigation"
                // current={current}
                className="site-navigation-steps"
                >
                <Step  title="Course Detail" />
                <Step  title="Course Schedule" />
                <Step  title="Success" />
          
            </Steps>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
            <Row>
                <Col>
                <Form.Item
                    name="name"
                    label="Course Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                </Col>
                <Col>
                <Form.Item
                    name="teacher"
                    label="Teacher"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    {/* <Select
                        placeholder="Select teacher"
                        showSearch
                        filterOption={false}
                        onSearch={(query: string) =>{
                            let teachersData = fetchTeachers(query);
                            console.log(teachersData);
                            if(! teachersData){
                                setTeachers(teachersData);
                            }
                        }}
                    >
                        {
                            teachers.map(({id, name})=>{
                                <Select.Option key={id} value={id}>
                                    {name}
                                </Select.Option>
                            })
                        }
                    </Select> */}
                    <Input />
                </Form.Item>
                
                </Col>
                <Col span={4}>
                <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                    {
                        required: true
                    },
                    ]}
                >
                    <Select
                        placeholder="Select Type"
                        mode='multiple'
                    >
                        {    
                            courseTypes.map((type)=> (
                                <Option key={type.id} value={type.id}> {type.name} </Option>
                            ))
                        } 
                      
                    </Select>
                </Form.Item>
                
                </Col>
                <Col>
                <Form.Item
                    name="uid"
                    label="Course Code"
                    
                >
                    <Input defaultValue={uuid} value={uuid} disabled/>
                </Form.Item>
                
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Item
                    name="startTime"
                    label="Start Date"
                    rules={[
                    {
                        required: true,
                        
                    },
                    ]}
                >
                   <DatePicker />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                    {
                        required: true,
                       
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="maxStudents"
                    label="Student Limit"
                    rules={[
                    {
                        required: true,
                       
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[
                    {
                        required: true,
                     
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                </Col>
                <Col>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                    {
                        required: true,
                      
                    },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                
                </Col>
                <Col>
                <Form.Item  label="Cover">
                    <Form.Item valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                
                </Col>
            </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Course
        </Button>
      </Form.Item>
    </Form>

         </Dashboard>

        
    </>
    )
}

export default AddCourse;
