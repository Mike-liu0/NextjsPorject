import React from "react";
import { Radio, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import {useRouter} from 'next/router';
import {LoginAPI} from '../lib/api-service'


function Login(){

    const [role, setRole] = React.useState("manager"); 
    const [username, setUsername] = React.useState(""); 
    const [password, setPassword] = React.useState(""); 
    const [error, setError] = React.useState("");
    const router = useRouter();

    const handleSubmit = async () => {
       const response = await LoginAPI(username, password, role);
       console.log(response);
       setError("");
       setPassword("");
       if(response.code === 201) {
            localStorage.setItem('token', response.data.token);
            console.log("to dashboard page");
            router.push('/dashboard');
          }else{
            setError("Something went wrong. Please try again later.");
        };
    }
   


    return(
        <div>
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
          >
            <Form.Item name="titile">
              <h3>COURSE MANAGEMENT ASSISTANT</h3>
            </Form.Item>
            <Form.Item name="role" rules={[{ required: true, message: 'Please Pick Your Role!' }]}>
                <Radio.Group defaultValue={role} onChange={e => setRole(e.target.value)} >
                  <Radio.Button value="student">Student</Radio.Button>
                  <Radio.Button value="teacher">Teacher</Radio.Button>
                  <Radio.Button value="manager">Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
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
    </div>
    );
};

export default Login;