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
import { LogoutAPI } from '../lib/api-service';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function Dashboard ({children} : any) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

    // const router = useRouter();
    const handleLogout = async () => {
      let response = await LogoutAPI();
      router.push('/');
      localStorage.removeItem('token');
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
              <Menu.Item key="3"><Link href="/dashboard/teacher">Teacher LIst</Link></Menu.Item>
       
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="Course">
              <Menu.Item key="4"><Link href="/dashboard/course">All Course</Link></Menu.Item>
              <Menu.Item key="5"><Link href="/dashboard/course/add">Add Course</Link></Menu.Item>
              <Menu.Item key="6"><Link href="/dashboard/course/edit">Edit Course</Link></Menu.Item>
       
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