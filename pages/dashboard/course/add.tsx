import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps,  Form,
    Input, InputNumber,Cascader,Select,DatePicker, Checkbox,Button,AutoComplete,Upload, Space, TimePicker, Result} from 'antd';
import {addCourseSchedule, addNewCourse, getCourse ,getCourseTypes,getTeacher, TeacherInfo} from '../../../lib/api-service';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { classTime, Course, CourseSchedule, CourseScheduleDto } from '../../../lib/model/Course';
import {v4 as uuidv4} from 'uuid';
import { Teacher } from '../../../lib/model/Teacher';
import { CourseType } from '../../../lib/model/CourseType';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import Router from "next/router";
function AddCourse () {
    const { Step } = Steps;
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const { Option } = Select;
    const [teachers, setTeachers] = React.useState<Teacher[]>([]);
    const [courseTypes, setCourseTypes] = React.useState<CourseType[]>([]);
    const [uuid, setuuid] = React.useState<string>('');
    const [courseId, setCourseId] = React.useState<number>();
    const [scheduleId, setScheduleId] = React.useState<number>();
    const format = 'HH:mm:ss';
    const [isStep1, setIsStep1] =  React.useState<boolean>(false);
    const [isStep2, setIsStep2] =  React.useState<boolean>(true);
    const [isStep3, setIsStep3] =  React.useState<boolean>(true);
    const [currentStep, setCurrentStep] =  React.useState<number>(0);

    
     const onFinish1 = async (values: Course) => {
        console.log('Received values of form : function 1 ', values);
        values.uid = uuid;
        const response = await addNewCourse(values);
        console.log(response);
        if(response.msg == "success"){
            setCourseId(response.data.id);
            setScheduleId(response.data.scheduleId);
            setIsStep1(true);
            setIsStep2(false);
            setCurrentStep(1);
        }
       
      };

      const onFinish2 = async (values: CourseScheduleDto) => {
        console.log('Received values of form : function 2 ',  );
        values.courseId = courseId;
        let times = values.InputClassTime?.map((value) => {return value.Week +" "+ value.Time.format(format)});
        // console.log(times);
        values.classTime = times;
        values .scheduleId = scheduleId;
      
        console.log(values);
        const response = await addCourseSchedule(values);
        console.log(response);
        if(response.msg == "success"){

            setIsStep2(true);
            setIsStep3(false);
            setCurrentStep(2);
        }
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

      async function fetchTeachers (){
        let response = await TeacherInfo(" ");
        setTeachers(response.data);
      }

      async function fetchUUID (){
        let uuid = uuidv4();
        setuuid(uuid);
      }

      useEffect(() => {
        fetchTypes();
        fetchUUID();
        fetchTeachers();
        console.log("loading page" + uuid);
      }, [uuid])


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
                current={currentStep}
                className="site-navigation-steps"
                style={{"padding": 10}}
                >
                <Step  title="Course Detail" />
                <Step  title="Course Schedule" />
                <Step  title="Success" />
          
            </Steps>
            <Form
                form={form1}
                name="register"
                onFinish={onFinish1}
                scrollToFirstError
                hidden = {isStep1}
            >
            <Row>
                <Col span={6}>
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
                <Col span={6}>
                <Form.Item
                    name="teacherId"
                    label="Teacher"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Select
                        placeholder="Select teacher"
                        filterOption={false}
                    >
                        {
                            teachers.map(({id, name})=>(
                                <Option key={id} value={id}>
                                    {name}
                                </Option>
                            ))
                        }
                    </Select> 
                    {/* <Input /> */}
                </Form.Item>
                
                </Col>
                <Col span={6}>
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
                <Col  span={6}>
                <Form.Item
                    name="uid"
                    label="Course Code"
                >
                    <Input defaultValue={uuid} value={uuid} disabled/>
                </Form.Item>
                
                </Col>
            </Row>
            <Row>
                <Col span={6}>
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
                <Col span={8}>
                <Form.Item
                    name="detail"
                    label="Description"
                    rules={[
                    {
                        required: true,
                      
                    },
                    ]}
                >
                    <Input.TextArea rows={9} />
                </Form.Item>
                
                </Col>
                <Col span={8}>
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

      {/* part 2 */}
     

     
      <Form name="Schedule" onFinish={onFinish2} autoComplete="off"  form={form2}  hidden = {isStep2}>
      <Row> 
          <Col span={12}>
        <Form.List name="chapters">
            {(chapterFields, { add, remove }) => (
            <>
                {
                chapterFields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    
                    >
                    <Input placeholder="Chapter Name" />
                    </Form.Item>
                    <Form.Item
                    {...restField}
                    name={[name, 'content']}
                    >
                    <Input placeholder="Chapter Content" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
                
                ))}
                <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Chapter
                </Button>
                </Form.Item>
            </>
            )}
        </Form.List>
        </Col>
        <Col span={12}>
        <Form.List name="classTime">
        {(classFields, { add, remove }) => (
            <>
                {classFields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8}} align="baseline">
                    <Form.Item
                    {...restField}
                    name={[name, 'Week']}
                    >
                        <Select placeholder="Day of the Week" >
                            <Option key={1} value={"Monday"}>Monday</Option>
                            <Option key={2} value={"Tuesday"}>Tuesday</Option>
                            <Option key={3} value={"Wednesday"}>Wednesday</Option>
                            <Option key={4} value={"Thursday"}>Thursday</Option>
                            <Option key={5} value={"Friday"}>Friday</Option>
                            <Option key={6} value={"Saturday"}>Saturday</Option>
                            <Option key={7} value={"Sunday"}>Sunday</Option>
                        </Select>
                   
                    </Form.Item>
                    <Form.Item
                    {...restField}
                    name={[name, 'Time']}
                    >
                        <TimePicker format={format}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
                ))}
                <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Class Time
                </Button>
                </Form.Item>
            </>
            )}
        </Form.List> 
        </Col>
    </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
   

    </Form>

    <div hidden={isStep3}>
        <Result
            status="success"
            
            title="Successfully Add New Course!"
            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
            <Button type="primary" key="console">
               <Link href="/dashboard/course">Go Console</Link> 
            </Button>,
            <Button key="buy" onClick={() => Router.reload()}>
               Add Again
            </Button>,
            ]}
        />

    </div>
    

         </Dashboard>

        
    </>
    )
}

export default AddCourse;
