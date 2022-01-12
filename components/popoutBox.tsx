import React from 'react'
import {  Modal, Form, Radio, Input, Select} from 'antd';
import { studentInfo, addNewStudent, deleteStudent, editStudent, addNewTeacher } from '../lib/api-service';
import { AddTeacherFormProps } from '../lib/model/AddTeacherFormProps';
function ModalBox(props:AddTeacherFormProps) {
    const [form] = Form.useForm();
    const {onFinish, teacher} = props;

    return (
          <Form 
              labelCol={{ span: 6 }}
              wrapperCol={{ offset: 1 }}
              form={form}
              validateMessages={valideMessages}
              onFinish={(values) => {
                const response =  addNewTeacher(values);
                response.then((response) => {
                  const { data } = response;
                  if (onFinish && data){
                    onFinish(data);
                  }
                })
              }}
        
              initialValues={
                name: teacher?.name,
                email: teacher?.email,
                country:teacher?.country,
                phone:teacher?.phone,
                skills:teacher?.skills || [{name:'', level: 2}]
              }
              
          >
                <Form.Item label="Name"
                name="name"
                rules={[{ required: true}]}>
                   <Input type="text" placeholder="teacher name" onChange={e => setName(e.target.value)}/>
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
                <Form.Item label="Phone"
                name="Phone"
                rules={[{ required: true}]}>
                     <Input
                    type="Phone"
                    placeholder="Phone"
                    onChange={e => setPhone(e.target.value)}
                  />
                 </Form.Item>
                 <Form.Item label="Skill" name="Skill" rules={[{ required: true}]}>  </Form.Item>
                 
                
               
                <Form.List name="Skills">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(( field ) => (
                          <Row align='middle' key={field.name}>
                            <Col span={7}>
                              <Form.Item 
                              {...field} 
                              name={[field.name, 'name']}
                              fieldKey={[field.fieldKey, 'name']}
                              rules={[{required:true}]}
                              >
                                <Input />
                                </Form.Item>
                            </Col>
                            <Col span={13}>
                              <Form.Item 
                                {...field}
                                name={[field.name, 'level']}
                                fieldKey={[field.fieldKey, 'level']}
                                initialValue={2}
                              >
                              <Slider
                                  min={1}
                                  max={5}
                                />
                              </Form.Item>
                            </Col>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Row>
                      ))}
                      <Form.Item >
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add Skill
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              
              </Form>
  
    )
}

export default ModalBox
