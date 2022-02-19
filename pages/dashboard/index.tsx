import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import Dashboard from '../../components/dashboard';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Layout, List, Badge, Steps,  Form,
  Input, InputNumber,Cascader,Select,DatePicker, Checkbox,Button,AutoComplete,Upload, Space, TimePicker, Avatar} from 'antd';

import { ChoroplethMap } from '@ant-design/maps';

import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import {UserOutlined } from '@ant-design/icons';
import { getStatisticsOverview } from '../../lib/api-service';


  interface course {
    lastMonthAdded: number;
    total: number;
  }
  interface student  {
    lastMonthAdded: number;
    total: number;
    gender: gender;
  }
  interface teacher {
    lastMonthAdded: number;
    total: number;
    gender: gender;
  }
  interface gender {
    female: number;
    male: number;
    unknown: number;
  }

function Home(){
  const { Header, Content, Footer, Sider } = Layout;            
  const { Meta } = Card; 
  const [courses, setCourses] = React.useState<course>(); 
  const [students, setStudents] = React.useState<student>(); 
  const [teachers, setTeachers] = React.useState<teacher>(); 

  async function fetchOverview (){
    let response = await getStatisticsOverview();
    console.log(response);
    setCourses(response.course);
    setStudents(response.student);
    setTeachers(response.teacher);

    
  }

 
 

  useEffect(() => {
    fetchOverview();
  
  }, [])


  return (
      <>
        <Dashboard> 
          <Breadcrumb>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Home</a>
            </Breadcrumb.Item>
            
            <Content>
            <Card style={{ width: 300, marginTop: 16, backgroundColor: 'lightblue', color:'white'}} >
              <Meta
                avatar={<UserOutlined />}
                title="Total Students"
                description= {(`${students?.total } 
                ${getPercentageChange(students?.total, students?.lastMonthAdded)}  Increase in 30 Days`)}
                
                style ={{color:'white'}}
                
              />
            </Card>
            <Card style={{ width: 300, marginTop: 16 , backgroundColor: 'purple'}} >
              <Meta
                avatar={<UserOutlined />}
                title="Total Teachers"
                description= {teachers?.total}
                style ={{color:'white'}}
              />
            </Card>
            <Card style={{ width: 300, marginTop: 16 , backgroundColor: 'orange', color:'white'}} >
              <Meta
                avatar={<UserOutlined />}
                title="Total Crouses"
                description=  {(`${courses?.total} \n\n
           
                ${getPercentageChange(courses?.total, courses?.lastMonthAdded)}  Increase in 30 Days`)}
                style ={{color:'white'}}
              />
            </Card>
            </Content>
         
          </Breadcrumb>
        </Dashboard>
       
      </>
  );
  
}

function getPercentageChange(total:number, add:number){

  return (add / total).toFixed(2) + "%";
}


fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json')
  .then(res => res.json())
  .then(mapData => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [55, 20]
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      shared: true,
    });
    // 同步度量
    chart.scale({
      longitude: {
        sync: true
      },
      latitude: {
        sync: true
      }
    });
    chart.axis(false);
    chart.legend('trend', {
      position: 'left'
    });

    // 绘制世界地图背景
    const ds = new DataSet();
    const worldMap = ds.createView('back')
      .source(mapData, {
        type: 'GeoJSON'
      });
    const worldMapView = chart.createView();
    worldMapView.data(worldMap.rows);
    worldMapView.tooltip(false);
    worldMapView.polygon().position('longitude*latitude').style({
      fill: '#fff',
      stroke: '#ccc',
      lineWidth: 1
    });

    // 可视化用户数据
    const userData = [
      { name: 'Russia', value: 86.8 },
      { name: 'China', value: 106.3 },
      { name: 'Japan', value: 94.7 },
      { name: 'Mongolia', value: 98 },
      { name: 'Canada', value: 98.4 },
      { name: 'United Kingdom', value: 97.2 },
      { name: 'United States of America', value: 98.3 },
      { name: 'Brazil', value: 96.7 },
      { name: 'Argentina', value: 95.8 },
      { name: 'Algeria', value: 101.3 },
      { name: 'France', value: 94.8 },
      { name: 'Germany', value: 96.6 },
      { name: 'Ukraine', value: 86.3 },
      { name: 'Egypt', value: 102.1 },
      { name: 'South Africa', value: 101.3 },
      { name: 'India', value: 107.6 },
      { name: 'Australia', value: 99.9 },
      { name: 'Saudi Arabia', value: 130.1 },
      { name: 'Afghanistan', value: 106.5 },
      { name: 'Kazakhstan', value: 93.4 },
      { name: 'Indonesia', value: 101.4 }
    ];
    const userDv = ds.createView()
      .source(userData)
      .transform({
        geoDataView: worldMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      })
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
          return obj;
        }
      });
    const userView = chart.createView();
    userView.data(userDv.rows);
    userView.scale({
      trend: {
        alias: '每100位女性对应的男性数量'
      }
    });
    userView.polygon()
      .position('longitude*latitude')
      .color('trend', ['#F51D27', '#0A61D7'])
      .tooltip('name*trend')
      .style({
        fillOpacity: 0.85
      })
      .animate({
        leave: {
          animation: 'fade-out'
        }
      });
    userView.interaction('element-active');

    chart.render();
  });


export default Home;