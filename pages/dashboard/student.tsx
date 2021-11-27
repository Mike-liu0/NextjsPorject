import { Table, Space, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useEffect  } from 'react';
import Dashboard from '../dashboard';
import { Student } from '../../lib/model/Student';
import { StuCourse } from '../../lib/model/StuCourse';
import { StuType } from '../../lib/model/StuType';
import { studentInfo } from '../../lib/api-service';

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
    render: (courses:StuCourse[]) => courses?.map((item)=> item.name).join(','),
  },
  {
    title: 'Student Type ',
    dataIndex: 'type',
    key: 'type',
    render: (type:StuType) => type.name,
  },
  {
    title: 'Join Time ',
    dataIndex: 'createdAt',
    key: 'join',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


function StudentTable(){

  const [studentData, setStudentData] = React.useState([]); 

  useEffect(() => {
   

    async function fetchData() {
      
      // use studentInfo func to replace the following lines
      // data = await studentInfo();

      //call api 
      axios.get<Student[]>('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=10',{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(function (response: any) {
            // console.log(response);
            var data = (response.data.data.students);
            console.log(data);
            setStudentData(data);
            // return value;
        })
        .catch(function (error :any) {
            console.log(error);
        });
      
    }

    fetchData();
    // setStudentData(data);
    
   
  }, []);
                       

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
          <Table columns={columns} dataSource={studentData}/>
        </Dashboard>
      </>
  );
}

export default StudentTable;