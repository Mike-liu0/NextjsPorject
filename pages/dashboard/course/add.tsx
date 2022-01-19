import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps,  Form,
    Input, InputNumber,Cascader,Select, Checkbox,Button,AutoComplete,Upload} from 'antd';
import {addNewCourse, getCourse} from '../../../lib/api-service';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled} from '@ant-design/icons'
import {v4 as uuidv4} from 'uuid';


function AddCourse () {
    const { Step } = Steps;
    const [form] = Form.useForm();
    const { Option } = Select;

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
                    <Input />
                </Form.Item>
                
                </Col>
                <Col>
                <Form.Item
                    name="type"
                    label="Type"
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
                    name="code"
                    label="Course Code"
                >
                    <Input defaultValue={uuid} disabled/>
                </Form.Item>
                
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Item
                    name="code"
                    label="Start Date"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Price"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Student Limit"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Duration"
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
                    name="description"
                    label="Description"
                    rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                
                </Col>
                <Col>
                <Form.Item label="Cover">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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
