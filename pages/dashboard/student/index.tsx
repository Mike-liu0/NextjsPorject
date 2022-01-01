import { Table, Space, Breadcrumb, Popconfirm, Modal, Button, Form, Radio, Input, Select} from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import Dashboard from '../../../components/dashboard';
import { Student } from '../../../lib/model/Student';
import { StuCourse } from '../../../lib/model/StuCourse';
import { StuType } from '../../../lib/model/StuType';
import { studentInfo, addNewStudent, deleteStudent, editStudent } from '../../../lib/api-service';
import { PaginationConfig } from 'antd/lib/pagination';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

const { Search } = Input;

function StudentTable() {
  //set up the const related to the table
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = React.useState<number|undefined>(10);
  const [studentData, setStudentData] = React.useState<Student[] | undefined>([]);
  const [totalStudent, setTotalStudent] = React.useState<number>(200);

  //set up the const related to add new function
  const [addStudentVisible, setAddStudentVisible] = React.useState(false);
  const [confirmNewStudentLoading, setconfirmNewStudentLoading] = React.useState(false);
  const [newStudentName, setNewStudentName] = React.useState('');
  const [newStudentEmail, setNewStudentEmail] = React.useState('');
  const [newStudentArea, setNewStudentArea] = React.useState('');
  const [newStudentType, setNewStudentType] = React.useState(1);

  const showAddModal = () => {
    setAddStudentVisible(true);
  };

  const handleAddNewStudent = async () => {
    setconfirmNewStudentLoading(true);
    var res = await addNewStudent(newStudentName, newStudentEmail, newStudentArea, newStudentType);
    setTimeout(() => {
      setAddStudentVisible(false);
      setconfirmNewStudentLoading(false);
      fetchData("", currentPage, currentPageSize);
    }, 2000);
  };

  const handleNewStudentCancel = () => {
    console.log('Clicked cancel button');
    setAddStudentVisible(false);
  };

  const { Option } = Select;

  //set up the const related to edit student function
  const [editStudentVisible, setEditStudentVisible] = React.useState<boolean>(false);
  const [confirmEditStudentLoading, setconfirmEditStudentLoading] = React.useState<boolean>(false);
  const [editStudentName, setEditStudentName] = React.useState<string>('');
  const [editStudentEmail, setEditStudentEmail] = React.useState<string>('');
  const [editStudentArea, setEditStudentArea] = React.useState<string>('');
  const [editStudentType, setEditStudentType] = React.useState<number>(1);
  const [editStudentID, setEditStudentID] = React.useState<string>('');

  const handleEditStudent = async () => {
    setconfirmNewStudentLoading(true);
    var res = await editStudent(editStudentID, editStudentName, editStudentEmail, editStudentArea, editStudentType);
    setTimeout(() => {
      setEditStudentVisible(false);
      setconfirmEditStudentLoading(false);
      fetchData("", currentPage, currentPageSize);
    }, 2000);
  };

  const handleEditStudentCancel = () => {
    setEditStudentVisible(false);
  };
  
  function onSearch (value:string){
    console.log(value);
    // searchStudentInfo(value, )
    fetchData( value, currentPage, currentPageSize);
  }

 

  const columns : ColumnType<Student>[] = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => text,
    
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record:any) => <Link href={`/dashboard/student/${record.id}`}><a>{text}</a></Link>,
      sorter: (a : Student, b : Student) => a.name.length - b.name.length,
    },
    {
      title: 'Area',
      dataIndex: 'country',
      key: 'area',
      filters: [
        { text: 'China', value: 'China' },
        { text:   'Australia', value: 'Australia' },
      ],
      onFilter: (value:any, record : Student) => (record.country === value),
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
      dataIndex: 'action',
      key: 'action',
      render: (_:any, record:any) =>
            <Space>
                <Button type="primary" onClick={() => {
                  setEditStudentVisible(true); 
                  console.log(record);
                  setEditStudentID(record.id); 
                  setEditStudentName(record.name);
                  setEditStudentEmail(record.email);
                  setEditStudentType(record.type.id);
                  setEditStudentArea(record.country);
                  // setEditStudentType(record.type);
                  }}>Edit</Button>
                <Modal title="Edit student" visible={editStudentVisible} onOk={handleEditStudent}  confirmLoading={confirmEditStudentLoading} onCancel={handleEditStudentCancel} okText={"submit"} destroyOnClose={true}>
                  <Form 
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal">
                    <Form.Item label="Name"
                    name="name"
                    rules={[{ required: true}]}>
                      <Input type="text" defaultValue={record.name} placeholder={record.name} onChange={e => setEditStudentName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Email"
                    name="email"
                    rules={[{ required: true}]}>
                    <Input
                        type="email"
                        defaultValue={record.email}
                        placeholder={record.email}
                        onChange={e => setEditStudentEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Area"
                    name="area"
                    rules={[{ required: true}]}>
                    <Select defaultValue={editStudentArea} onChange={e => setEditStudentArea(e)} >
                      <Option value="Australia">Australia</Option>
                      <Option value="China">China</Option>
                      <Option value="US">US</Option>
                      <Option value={editStudentArea}>{editStudentArea}</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item label="Student Type"
                    name="type"
                    rules={[{ required: true}]}>
                    <Select defaultValue={editStudentType} onChange={e => setEditStudentType(e)}>
                      <Option value="1">Tester</Option>
                      <Option value="2">Developer</Option>
                      
                    </Select>
                    </Form.Item>
                  </Form>
                </Modal>
              <Popconfirm title="Sure to delete?" onConfirm={() => {
                  console.log(currentPage);
                  deleteStudent(record.id); 
                  setTimeout(() => {
                    fetchData(_, currentPage, currentPageSize);
                  }, 500);
                }
              }>
                <Button type="primary">Delete</Button>
              </Popconfirm>
            </Space>
    },
  ];
  
  useEffect(() => {
    fetchData( "", currentPage, currentPageSize);
  }, [currentPage, currentPageSize]);
  
  async function fetchData(query: string, currentPage: number, currentPageSize?: number) {
    // use studentInfo func to replace the following lines
    var data = await studentInfo(query, currentPage, currentPageSize);
    var studentList = data.students;
    // console.log(students);
    setTotalStudent(data.total);
    setStudentData(studentList);
  }
 
  

  const pageConfig:TablePaginationConfig = {
    defaultPageSize: 10, showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'], onChange: (page: number, pageSize?: number) => {
      setCurrentPage(page);
      setCurrentPageSize(pageSize);
    }, total: totalStudent
  };

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
        <div>
          <div  className='inline-block left-0'>
           <Button type="primary" onClick={showAddModal}>+ add</Button>
          </div>
          <div className='inline-block absolute right-0'>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
          </div>
        </div>
     
        <Modal title="Add new student" visible={addStudentVisible} onOk={handleAddNewStudent}  confirmLoading={confirmNewStudentLoading} onCancel={handleNewStudentCancel} okText={"submit"} destroyOnClose={true}>
          <Form 
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal">
            <Form.Item label="Name"
            name="name"
            rules={[{ required: true}]}>
             <Input type="text" placeholder="student name" onChange={e => setNewStudentName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Email"
            name="email"
            rules={[{ required: true}]}>
            <Input
                type="email"
                placeholder="email"
                onChange={e => setNewStudentEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Area"
            name="area"
            rules={[{ required: true}]}>
            <Select defaultValue={newStudentArea}  onChange={e => setNewStudentArea(e)}>
              <Option value="Australia">Australia</Option>
              <Option value="China">China</Option>
              <Option value="US">US</Option>
            </Select>
            </Form.Item>
            <Form.Item label="Student Type"
            name="type"
            rules={[{ required: true}]}>
             <Select defaultValue={newStudentType} onChange={e => setNewStudentType(e)} >
              <Option value="1">Tester</Option>
              <Option value="2">Developer</Option>
            </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={studentData} pagination={pageConfig} scroll={{scrollToFirstRowOnChange: true}} />
        
      </Dashboard>
    </>
  );
}

export default StudentTable;


