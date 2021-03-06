import Dashboard from '../../../components/dashboard';
import { Table, Space, Breadcrumb,List,Card,  Button,Image, Row, Col, message, Avatar, Skeleton, Divider } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Course } from '../../../lib/model/Course';
import {CourseInfo} from '../../../lib/api-service'
import {HeartFilled} from '@ant-design/icons'

function Index() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Course[]>([]);
  const [total, setTotal] = React.useState<number>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = React.useState<number|undefined>(8);
  //read course data
  async function fetchData( currentPage: number, currentPageSize?: number) {
    
   
    
  }


  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
    // fetchData(currentPage + 1, currentPageSize);
    const response = await CourseInfo( currentPage, currentPageSize);
    
    // response.then((response: { data: Course[], total:number }) => {
    //   setData([...data, ...response.data]);
    //   setTotal(response.total);
    // })
    
    console.log(response);
    setData([...data, ...response.data]);
    setTotal(response.total);
    
    setLoading(false);
    console.log(data);
  
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then(res => res.json())
    //   .then(body => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    loadMoreData();
  }, [currentPage, currentPageSize]);

    return (
        <>
            <Dashboard>
                <Breadcrumb>
                <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Course</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>All courses</Breadcrumb.Item>
                </Breadcrumb>
                
              <div id="scrollableDiv">
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={total ? data.length < total : false}
                    endMessage={<Divider plain>It is all, nothing more ????</Divider>}
      
                    loader={<Skeleton  active />}
                >
        
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                          <List.Item>
                              <Card
                               cover={<Image src={item.cover} alt='CourseCover' style={{height:300}} />}
                              >
                                <p style={{fontWeight:'bold'}}>{item.name}</p>
                                <div style={{display: 'flex', alignContent:'center', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                                  <div>{item.startTime}</div>
                                  <div><HeartFilled style={{color:'red'}} /> {item.star}</div>
                                </div>
                                <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                                  <div>Duration: </div>
                                  <div style={{fontWeight:'bold'}}>{item.duration} years</div>
                                </div>
                                <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                                  <div>Teacher: </div>
                                  <div style={{fontWeight:'bold'}}>{item.maxStudents}</div>
                                </div>
                                <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                                  <div>Teacher: </div>
                                  <div style={{fontWeight:'bold', color:'Blue'}}>{item.teacherName}</div>
                                </div>
                                <div style={{display: 'flex', justifyContent:'space-between', borderBottom: '1px solid grey' }} >
                                  <div>  Student Limit:</div>
                                  <div style={{fontWeight:'bold'}}>{item.maxStudents}</div>
                                </div>
                                <Button  type="primary" style={{margin: 10}}><Link href={`/dashboard/course/${item.id}`}>Read More</Link></Button>
                               
                              </Card>
                          </List.Item>
                        )}
                    />
                </InfiniteScroll>
              </div>
            </Dashboard>
        
        </>
       
    )
}

export default Index
