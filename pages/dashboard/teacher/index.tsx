import Dashboard from '../../../components/dashboard';
import { Table, Space, Breadcrumb, Popconfirm, Modal, Button, Form, Radio, Input, Select} from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { Teacher } from '../../../lib/model/Teacher';
import { TeacherSkill } from '../../../lib/model/TeacherSkill';
import { TeacherInfo, addNewStudent, deleteStudent, editStudent } from '../../../lib/api-service';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import ModalBox from '../../../components/popoutBox';

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
                      deleteStudent(record.id); 
                      setTimeout(() => {
                        fetchData(_, currentPage, currentPageSize);
                      }, 500);
                    }
                  }>
                    <a >Delete</a>
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

      const [title, setTitle] = React.useState('');
      const [Visible, setVisible] = React.useState(true);


      const showModal = () => {
        setVisible(true);
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
                <Button type="primary" style={{ margin:10}} onChange={showModal}>+ add</Button>
                </div>
                <div className='inline-block absolute right-0'>
                    {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
                </div>
            </div>
            <ModalBox visible = {Visible}/>
            <Table columns={columns} dataSource={Data}   pagination={pageConfig} scroll={{scrollToFirstRowOnChange: true}} />
            {/* <Table {...TableProps({columns, data, pageConfig})}></Table> */}
        </Dashboard>
        
        </>
       
    )
}

export default index
