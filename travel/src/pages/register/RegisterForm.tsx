import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from "./RegisterForm.module.css";
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RegisterForm: React.FC = () => (
    <Form
        name="basic"
        initialValues={{ remember: true }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles['register-form']}
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="Confirm"
            name="confirm password"
            hasFeedback
            rules={[{ required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject("Password not consistent");
                }
            })]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default RegisterForm;