import React from 'react'
import {Form,Input,Select,Button} from 'antd';
const {Option} = Select;
const UserForm = ({onFinish}) => {
  return (
    <Form layout={'vertical'} onFinish={(e) => onFinish(e)}>
        <Form.Item name="email" label="E-Mail" rules={[{type : "email"},{ required: true, message: 'Please input your E-Mail!' }]}>
            <Input/>
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input type="password"/>
        </Form.Item>

        <Form.Item name="AccountType" label="Account Type" rules={[{ required: true, message: 'Please input your account type!' }]}>
            <Select >
                <Option value="1">Admin</Option>
                <Option value="2">User</Option>
                <Option value="3">Web Service</Option>
            </Select>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>


    </Form>
  )
}

export default UserForm