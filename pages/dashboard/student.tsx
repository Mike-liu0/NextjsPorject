import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect  } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
    dataIndex: '',
    key: 'curriculum',
  },
  {
    title: 'Student Type ',
    dataIndex: 'type[0]',
    key: 'type',
  },
  {
    title: 'Join Time ',
    dataIndex: 'createdAt',
    key: 'join',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
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
    const axios = require('axios');
    axios({
      method: 'get',
      url: 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=10',
      headers: {'Authorization': "Bearer " + localStorage.getItem('token')},
      data: ''
      }).then(function (response) {
          console.log(response);
          setStudentData(response.data.data.students);
        })
        .catch(function (error) {
          console.log(error);
      });
    
  }, []);
  

  return (<Table columns={columns} dataSource={studentData} />);
  
}

export default StudentTable ;