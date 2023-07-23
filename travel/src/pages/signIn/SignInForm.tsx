import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from "../../redux/user/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export const SignInForm = () => {
    const error = useSelector(s => s.user.error);
    const jwt = useSelector(s => s.user.token);
    const loading = useSelector(s => s.user.loading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log("Success:", values);
        dispatch(signIn({
            email: values.username,
            password: values.password,
        }))

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (jwt != null) {
            navigate("/");
        }
    }, [jwt])

    return (

        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles["signin-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
