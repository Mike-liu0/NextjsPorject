import { Table, Space, Breadcrumb, Popconfirm, Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dashboard from '../dashboard';
import { Student } from '../../lib/model/Student';
import { StuCourse } from '../../lib/model/StuCourse';
import { StuType } from '../../lib/model/StuType';
import { studentInfo } from '../../lib/api-service';


function StudentTable() {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Area',
      dataIndex: 'country',
      key: 'area',
    },
    {
      title: 'Email ',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Selected Curriculum ',
      dataIndex: 'courses',
      key: 'courses',
      render: (courses: StuCourse[]) => courses?.map((item) => item.name).join(','),
    },
    {
      title: 'Student Type ',
      dataIndex: 'type',
      key: 'type',
      render: (type: StuType) => type != null ? type.name : "null",
    },
    {
      title: 'Join Time ',
      dataIndex: 'createdAt',
      key: 'join',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Space size="middle">
          <Button>Edit</Button>
          <Modal title="Basic Modal" visible={visible} onOk={handleOk}  confirmLoading={confirmLoading} onCancel={handleCancel}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
                {/* <Popconfirm title="Sure to delete?" onConfirm={(e) => {(record.key, e) => { 
                  e.preventDefault();
                  const data = studentData.filter(item => item.key !== key);
                  this.setState({ data, isPageTween: false });}}}>
                  <a>Delete</a>
                </Popconfirm> */}
        </Space>
      ),
    },
  ];
  

  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageSize, setCurrentPageSize] = React.useState(10);
  const [studentData, setStudentData] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState<number>(200);
 
  async function fetchData(currentPage: number, currentPageSize: number) {
    // use studentInfo func to replace the following lines
    var data = await studentInfo(currentPage, currentPageSize);
    var students = data.students;
    setTotalStudent(data.total);
    setStudentData(students);
    
  }

  

  useEffect(() => {
    fetchData(currentPage, currentPageSize);
  }, []);

 
  const handleChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize);
  }


  return (
    <>
      <Dashboard>
        <Breadcrumb>
          <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Student</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Student List</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">+ add</Button>
        <Modal title="Basic Modal" visible={visible} onOk={handleOk}  confirmLoading={confirmLoading} onCancel={handleCancel}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
        </Modal>
        <Table columns={columns} dataSource={studentData} pagination={{
          defaultPageSize: 10, showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'], onChange: handleChange, total: totalStudent
        }} />
      </Dashboard>
    </>
  );
}

export default StudentTable;




      //call api
      // var student = await axios.get<Student[]>('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=10',{
      //       headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
      //   }).then(function (response: any) {
      //       // console.log(response);
      //       var data = (response.data.data.students);
      //       // console.log(data);
      //       //setStudentData(data);
      //       // return value;
      //       return data;
      //   })
      //   .catch(function (error :any) {
      //       console.log(error);
      //   });