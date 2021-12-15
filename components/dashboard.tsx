import React from 'react';
import { Layout, Menu, Breadcrumb, Button} from 'antd';
import Link from "next/link";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import router from 'next/router';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function Dashboard ({children} : any) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

    // const router = useRouter();
    const handleLogout = () => {
      let header = {
        headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
      };
      const axios = require('axios');
      axios.post('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/logout', {}, header)
      .then(function (response) {
          console.log("log out successfully");
          localStorage.removeItem('token');
          router.push('/');
      }).catch(function (error) {
        console.log(error);
      });
     
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
       
        <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className="logo" style={{ textAlign:'center', paddingTop: 20, color: '#fff'}}> <p>CMS</p> </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}><Link href="/dashboard/overview">
              Overview
            </Link></Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
             <Menu.Item key="2"><Link href="/dashboard/student">
                Student List
            </Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Teacher">
              <Menu.Item key="3">Teacher LIst</Menu.Item>
       
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="Course">
              <Menu.Item key="4">All Course</Menu.Item>
              <Menu.Item key="5">Add Course</Menu.Item>
              <Menu.Item key="6">Delete Course</Menu.Item>
       
            </SubMenu>
            <Menu.Item key="7" icon={<FileOutlined />}>
              Message
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ position: 'relative' }} >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style: {color: "white"},
            })}
            <Button type="text" style={{ position: 'absolute', color: 'white', top: '15px', right: '10px'}} onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  
}

export default Dashboard;