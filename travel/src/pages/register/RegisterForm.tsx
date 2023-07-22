import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from "./RegisterForm.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.headers['x-icode'] = "63BAC72C6C13D16B";

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            await axios.post("http://123.56.149.216:8080/auth/register", {
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm
            });
            navigate("/signIn/");
        } catch (error) {
            alert("注册失败！");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
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
                label="Confirm Password"
                name="confirm"
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
};

export default RegisterForm;