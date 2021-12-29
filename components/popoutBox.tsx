import React from 'react'
import {  Modal, Form, Radio, Input, Select} from 'antd';
import { studentInfo, addNewStudent, deleteStudent, editStudent } from '../lib/api-service';
function ModalBox(props:any) {

    const { Option } = Select;

     //set up the const related to add new function
    const [title, setTitle] = React.useState('');
    const [Visible, setVisible] = React.useState(props.visible);
    const [confirmLoading, setconfirmLoading] = React.useState(false);
    const [Name, setName] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [Area, setArea] = React.useState('');
    const [Type, setType] = React.useState(1);


    const handleOk = async () => {
        setconfirmLoading(true);
        var res = await addNewStudent(Name, Email, Area, Type);
        setTimeout(() => {
            setVisible(false);
            setconfirmLoading(false);
            // fetchData("", currentPage, currentPageSize);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <Modal title={""} visible={Visible} onOk={handleOk}  confirmLoading={confirmLoading} onCancel={handleCancel} okText={"submit"} destroyOnClose={true}>
          <Form 
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal">
            <Form.Item label="Name"
            name="name"
            rules={[{ required: true}]}>
             <Input type="text" placeholder="student name" onChange={e => setName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Email"
            name="email"
            rules={[{ required: true}]}>
            <Input
                type="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Area"
            name="area"
            rules={[{ required: true}]}>
            <Select defaultValue={Area}  onChange={e => setArea(e)}>
              <Option value="Australia">Australia</Option>
              <Option value="China">China</Option>
              <Option value="US">US</Option>
            </Select>
            </Form.Item>
          </Form>
        </Modal>
    )
}

export default ModalBox
