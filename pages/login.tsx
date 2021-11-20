import React from "react";
import { Radio, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AES } from "crypto-js";
import 'antd/dist/antd.css';
import {useRouter} from 'next/router';

function Login(){

    const [role, setRole] = React.useState(""); 
    const [username, setUsername] = React.useState(""); 
    const [password, setPassword] = React.useState(""); 
    const [error, setError] = React.useState("");
    const router = useRouter();

    const handleSubmit = () => {
        
       
        const axios = require('axios');
        axios.post('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', {
            email: username,
            password: AES.encrypt(password, 'cms').toString(),
            role: role
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('token', response.data.data.token);
            console.log("to dashboard page");
            router.push('/dashboard');
            // Router.push('/components/dashboard');
            setError("");
            // alert("login successfully");
           
          })
          .catch(function (error) {
            console.log(error);
            if (error.response.status === 401) setError("Something went wrong. Please try again later.");
            else setError("Something went wrong. Please try again later.");
        });
    }
   


    return(
        
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
        >
        <Form.Item
        name="titile"
        >
            <h3>COURSE MANAGEMENT ASSISTANT</h3>
        </Form.Item>
        <Form.Item
        name="role"
        rules={[{ required: true, message: 'Please Pick Your Role!' }]}
        >
            <Radio.Group value={role} onChange={e => setRole(e.target.value)} >
                <Radio.Button value="student">Student</Radio.Button>
               <Radio.Button value="teacher">Teacher</Radio.Button>
               <Radio.Button value="manager" checked>Manager</Radio.Button>
           </Radio.Group>
        </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
          Log in
        </Button>
        No account? <a href=""> Sign up</a>
      </Form.Item>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

          .login-form {
            max-width: 600px;
            width: 500px;
            position: absolute; 
            left: 38%;
            /* display: flex; */
          }
          .login-form-forgot {
            float: right;
          }
          .ant-col-rtl .login-form-forgot {
            float: left;
          }
          .login-form-button {
            width: 100%;
          }
          
          .login-form h3 {
            text-align: center;
            font-weight: bold;
            font-size: x-large;
          }
          
          
          .header {
            padding: 40px;
            background: darkgrey;
            border-bottom: 1px solid #999;
          }
      `}</style>
    </Form>
    
    );
};

export default Login;