import {  Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import Dashboard from '../dashboard';




function Overview(){
                            
  return (
      <>
        <Dashboard> 
          <Breadcrumb>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Overview</a>
            </Breadcrumb.Item>
            
          </Breadcrumb>
        </Dashboard>
       
      </>
  );
  
}

export default Overview;