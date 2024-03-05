import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { handleLogin } from '../../services/userService';
import './Login.scss'

const Login = () => {
    const onFinish = (values) => {
        handleUserLogin(values.email, values.password)
    };

    const handleUserLogin = async (email, password) => {
        try {
            let data = await handleLogin(email, password);
            if (data && data.errCode !== 0) {
                message.error(data.message)
            }
            if (data && data.errCode === 0) {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <Row justify='center' align='middle' style={{ minHeight: '90vh' }}>
                <Col xs={24} sm={16} md={12} lg={6}>
                    <Form className='login-content'
                        name="login"
                        onFinish={onFinish}
                        wrapperCol={{ span: 24 }}
                    >
                        <Typography.Title level={2} style={{ textAlign: 'center' }}>
                            Login System
                        </Typography.Title>
                        <Form.Item
                            name='email'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please enter your email!',
                                        whitespace: true
                                    },
                                    { type: "email", message: 'Please a valid email!' }
                                ]
                            }
                            hasFeedback
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                        >
                            <Button type="primary" htmlType="submit" block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>

    );
};

export default Login;
