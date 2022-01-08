import Dashboard from '../../../components/dashboard';
import { Table, Space, Breadcrumb, Popconfirm, Modal, Button, Form, Radio, Input, Select, Slider, InputNumber, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { Teacher } from '../../../lib/model/Teacher';
import { TeacherSkill } from '../../../lib/model/TeacherSkill';
import { TeacherInfo, addNewTeacher, deleteTeacher , editTeacher} from '../../../lib/api-service';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
function index() {

     //set up the const related to the table
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = React.useState<number|undefined>(10);
    const [Data, setData] = React.useState<Teacher[] | undefined>([]);
    const [total, setTotal] = React.useState<number>(200);


    const columns = [
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
           render: (text: string, record:any) => <Link href={`/dashboard/teacher/${record.id}`}><a>{text}</a></Link>,
        
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Email ',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Skill ',
          dataIndex: 'skills',
          key: 'skills',
          render: (skills: TeacherSkill[]) => skills?.map((item) => item.name).join(','),
        },
        {
          title: 'Course Amount',
          dataIndex: 'courseAmount',
          key: 'courseAmount',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
       
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_:any, record:any) =>
                <Space>
                    <a>Edit</a>
                  
                  <Popconfirm title="Sure to delete?" onConfirm={() => {
                      console.log(currentPage);
                      deleteTeacher(record.id); 
                      setTimeout(() => {
                        fetchData(_, currentPage, currentPageSize);
                      }, 500);
                    }
                  }>
                    <a>Delete</a>
                  </Popconfirm>
                </Space>
        },
      ];

      useEffect(() => {
        fetchData( "", currentPage, currentPageSize);
      }, [currentPage, currentPageSize]);
      

      //read teacher data
      async function fetchData(query: string, currentPage: number, currentPageSize?: number) {
        
        let response = await TeacherInfo(query, currentPage, currentPageSize);
        setTotal(response.total);
        setData(response.data);
      }

      const pageConfig:TablePaginationConfig = {
        defaultPageSize: 10, showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'], onChange: (page: number, pageSize?: number) => {
          setCurrentPage(page);
          setCurrentPageSize(pageSize);
        }, total: total
      };


      //madel box
      const { Option } = Select;

      //set up the const related to add new function
      const [functionName, setFunctionName] = React.useState('');
      const [ModalTitle, setModalTitle] = React.useState('');
      const [Visible, setVisible] = React.useState(false);
      const [confirmLoading, setconfirmLoading] = React.useState(false);
      
      const [ID, setID] = React.useState<string>('');
      const [Name, setName] = React.useState('');
      const [Email, setEmail] = React.useState('');
      const [Area, setArea] = React.useState('');
      const [Phone, setPhone] = React.useState('');
      const [Skills, setSkills] = React.useState<TeacherSkill[]>([]);
      
 
 
     const handleOk = async () => {
          setconfirmLoading(true);
          if(functionName === "Add"){
            
            var res = await addNewTeacher(Name, Email, Area, Phone, Skills);
          }
 
          if(functionName === "Edit"){
            
            var res = await editTeacher(ID, Name, Email, Area, Phone, Skills);
          }
         
         setTimeout(() => {
             setVisible(false);
             setconfirmLoading(false);
             // fetchData("", currentPage, currentPageSize);
         }, 2000);
     };
 
     const handleCancel = () => {
         console.log('Clicked cancel button');
         setVisible(false);
     };


      const showAddModal = async () => {
        setVisible(true);
        setModalTitle("Add new Teacher");
        setFunctionName("Add");
      };

      const showEditModal = () => {
        setVisible(true);
        setModalTitle("Edit Teacher");
        setFunctionName("Edit");
      };

      const updateFieldChanged = (name:string, index:number) => (event:any) => {
        let newArr = Skills.map((item, i) => {
          if (index == i) {
            return { ...item, [name]: event.target.value };
          } else {
            return item;
          }
        });
        setSkills(newArr);
        console.log(Skills);
      };
      

    return (
        <>
        <Dashboard>
            <Breadcrumb>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="">Teacher</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Teacher List</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div  className='inline-block left-0'>
                <Button type="primary" style={{ margin:10}} onClick={showAddModal}>+ add</Button>
                </div>
                <div className='inline-block absolute right-0'>
                    {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
                </div>
            </div>
            <Modal title={ModalTitle} visible={Visible} onOk={handleOk}  confirmLoading={confirmLoading} onCancel={handleCancel} okText={"submit"} destroyOnClose={true}>
              <Form 
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal">
                <Form.Item label="Name"
                name="name"
                rules={[{ required: true}]}>
                <Input type="text" placeholder="teacher name" onChange={e => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Email"
                name="email"
                rules={[{ required: true}]}>
                <Input
                    type="email"
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Area"
                name="area"
                rules={[{ required: true}]}>
                <Select defaultValue={Area}  onChange={e => setArea(e)}>
                  <Option value="Australia">Australia</Option>
                  <Option value="China">China</Option>
                  <Option value="US">US</Option>
                </Select>
                </Form.Item>
                <Form.Item label="Phone"
                name="Phone"
                rules={[{ required: true}]}>
                     <Input
                    type="Phone"
                    placeholder="Phone"
                    onChange={e => setPhone(e.target.value)}
                  />
                 </Form.Item>
                 <Form.Item label="Skill" name="Skill" rules={[{ required: true}]}>
                 
                
               
                <Form.List name="skill">
                  {(Skills, { add, remove }) => (
                    <>
                      {Skills.map(({ key, name, ...restSKill }) => (
                        <Space key={name} style={{ display: 'flex',  marginBottom: 8 }} align="baseline">
                            <Row>
                              <Col span={12}>
                              <Input type="Skill" placeholder="Skill" onChange={e => {
                                  updateFieldChanged("name", name);
                                 }}
                              />
                              </Col>
                              <Col span={12}>
                                <Slider
                                  min={1}
                                  max={5}
                                 
                                 
                                />
                              </Col>
                              
                            </Row>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                        
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add Skill
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                </Form.Item>
              </Form>
            </Modal>
            <Table columns={columns} dataSource={Data}   pagination={pageConfig} scroll={{scrollToFirstRowOnChange: true}} />
            {/* <Table {...TableProps({columns, data, pageConfig})}></Table> */}
        </Dashboard>
        
        </>
       
    )
}

export default index
