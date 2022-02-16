import 'antd/dist/antd.css';
import React from 'react';
import Dashboard from '../../components/dashboard';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Layout, List, Badge, Steps,  Form,
  Input, InputNumber,Cascader,Select,DatePicker, Checkbox,Button,AutoComplete,Upload, Space, TimePicker, Result} from 'antd';

  const DemoChoroplethMap = () => {
    const config = {
      map: {
        type: 'mapbox',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: [],
        joinBy: {
          sourceField: 'code',
          geoField: 'adcode',
        },
      },
      viewLevel: {
        level: 'world',
        adcode: 'all',
      },
      autoFit: true,
      color: {
        field: 'name',
        value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
      },
      style: {
        opacity: 1,
        stroke: '#ccc',
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 1.5,
          textAllowOverlap: false,
          padding: [5, 5],
        },
      },
      state: {
        active: true,
        select: {
          stroke: 'black',
          lineWidth: 1.5,
          lineOpacity: 0.8,
        },
      },
      tooltip: {
        items: ['name', 'adcode', 'value'],
      },
      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    };
    return <ChoroplethMap {...config} />;
  };


function Home(){
  const { Header, Content, Footer, Sider } = Layout;             
  return (
      <>
        <Dashboard> 
          <Breadcrumb>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Home</a>
            </Breadcrumb.Item>
            
            <Content>
              <Card>

              </Card>
            </Content>
            
          </Breadcrumb>
        </Dashboard>
       
      </>
  );
  
}

export default Home;