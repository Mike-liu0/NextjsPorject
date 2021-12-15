import {  Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import Dashboard from '../../components/dashboard';




function Home(){
                            
  return (
      <>
        <Dashboard> 
          <Breadcrumb>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Home</a>
            </Breadcrumb.Item>
            
          </Breadcrumb>
        </Dashboard>
       
      </>
  );
  
}

export default Home;