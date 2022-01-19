import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {Card, Descriptions , Tabs, Table, Row, Col, Tag, Rate, Image, Breadcrumb, Collapse , List, Badge, Steps} from 'antd';
import {getCourse} from '../../../lib/api-service';

import Dashboard from '../../../components/dashboard';
import 'antd/dist/antd.css';
import { Course } from '../../../lib/model/Course';
import {HeartFilled} from '@ant-design/icons'



function EditCourse () {

    return (
    <>
        <Dashboard>
            <Breadcrumb style={{marginBottom: 20}}>
                <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Course</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Edit Course</Breadcrumb.Item>
            </Breadcrumb>
            </Dashboard>
        
    </>
    )
}

export default EditCourse;
