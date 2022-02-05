import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps,  Form,
    Input, InputNumber,Cascader,Select,DatePicker, Checkbox,Button,AutoComplete,Upload, Space, TimePicker, Result} from 'antd';

import {addCourseSchedule, addNewCourse, CourseInfo, getCourse ,getCourseByName,getCourseTypes,getTeacher, TeacherInfo} from '../../../lib/api-service';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled, InboxOutlined} from '@ant-design/icons'
import { Teacher } from '../../../lib/model/Teacher';
import { CourseType } from '../../../lib/model/CourseType';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


function EditCourse () {
    const { Search } = Input;
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const { Option } = Select;
    const { TabPane } = Tabs;
    const [teachers, setTeachers] = React.useState<Teacher[]>([]);
    const [courseTypes, setCourseTypes] = React.useState<CourseType[]>([]);
    const [uuid, setuuid] = React.useState<string>('');
    const [courseId, setCourseId] = React.useState<number>();
    const [scheduleId, setScheduleId] = React.useState<number>();
    const format = 'HH:mm:ss';


    const [options, setOptions] = useState<Course[]>([]);
    const [optionNames, setOptionNames] = useState<String[]>([]);

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };



    const onFinish1 = async (values: Course) => {
        console.log('Received values of form : function 1 ', values);

      };
    const onFinish2 = async (values: Course) => {
        console.log('Received values of form : function 2 ', values);

      };

    function onSearch (value:string) {
        console.log("search : " + value);
        fetchCourse (value);
    };



    async function fetchCourse (name: string){
        let {data, total} = await getCourseByName(name);
        // console.log(data); 
        // console.log(total); 
        setOptions(data);
        console.log(options);
        // setOptionNames(data.map(e => e.name))
        // console.log(optionNames);
      }

      async function fetchTypes (){
        let response = await getCourseTypes();
        setCourseTypes(response);
      }

      async function fetchTeachers (){
        let response = await TeacherInfo(" ");
        setTeachers(response.data);
      }

      const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
     

      useEffect(() => {
        fetchTypes();
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
                <Breadcrumb.Item>Edit Course</Breadcrumb.Item>
            </Breadcrumb>

            <Input.Group compact>

                <Select defaultValue="Name">
                    <Option value="Name">Name</Option>
                    <Option value="category">Category</Option>
                </Select>
                <Search  placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                
            </Input.Group>

            <AutoComplete
                options={optionNames}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="input here"
            />
            <Tabs  type="card">
                <TabPane tab="Course Detail" key="1">
                <Form
                form={form1}
                name="register"
                onFinish={onFinish1}
                scrollToFirstError
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
                     Update Course
                </Button>
            </Form.Item>
            </Form>
                        
                </TabPane>
                <TabPane tab="Course Schedule" key="2">

                <Form name="Schedule" onFinish={onFinish2} autoComplete="off"  form={form2}  >
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

               
                </TabPane>
               
            </Tabs>

    



            </Dashboard>
        
    </>
    )
}


export default EditCourse;

