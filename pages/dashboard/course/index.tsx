import Dashboard from '../../../components/dashboard';
import { Table, Space, Breadcrumb,List,Card,  Button, Row, Col, message, Avatar, Skeleton, Divider } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Course } from '../../../lib/model/Course';
import {CourseInfo} from '../../../lib/api-service'
import {HeartFilled} from '@ant-design/icons'

function index() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Course[]>([]);
  const [total, setTotal] = React.useState<number>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = React.useState<number|undefined>(8);
  //read course data
  async function fetchData( currentPage: number, currentPageSize?: number) {
    
    let response = await CourseInfo( currentPage, currentPageSize);
    setTotal(response.total);
    // setData(response.data);
    setData(response.data.map((t:Course) => {return {...t, key: t.id.toString()}}));
    setLoading(false);
  }


  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetchData(currentPage, currentPageSize);
  
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
  }, []);

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
                    hasMore={data.length < 50}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    loader={<Skeleton  active />}
                >
        
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                          <List.Item>
                              <Card
                               cover={<img src={item.cover} style={{height:300}} />}
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

export default index
