import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { handleLogin } from '../../../services/adminService';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { setUserAccount } from '../../../redux/actions/adminActions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        handleUserLogin(values.email, values.password)
    };

    const handleUserLogin = async (email, password) => {
        try {
            let res = await handleLogin(email, password);
            if (res && res.errCode !== 0) {
                message.error(res.message)
            }
            if (res && res.errCode === 0) {
                dispatch(setUserAccount(res.data.user));
                navigate(path.SYSTEM)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Row justify='center' align='middle' className='login-container'>
            <Col xs={24} sm={16} md={12} lg={6}>
                <Form className='login-content'
                    name="login"
                    onFinish={onFinish}
                    size='large'
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
                                { type: "email", message: 'Please enter a valid email!' }
                            ]
                        }
                        hasFeedback
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
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
    );
};

export default Login;
