import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { handleLogin } from '../../../services/accountService';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { doLogin } from '../../../redux/actions/accountAction';
import { useEffect } from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.account.userInfo);

    useEffect(() => {
        if (userInfo && userInfo.roleId === process.env.REACT_APP_ROLE_ADMIN ||
            userInfo && userInfo.roleId === process.env.REACT_APP_ROLE_DOCTOR) {
            navigate(path.SYSTEM)
        }
        else if (userInfo && userInfo.roleId === process.env.REACT_APP_ROLE_PATIENT) {
            navigate(path.HOME)
        }
    }, [userInfo])


    const onFinish = (values) => {
        handleUserLogin(values.email, values.password)
    };

    const handleUserLogin = async (email, password) => {
        try {
            let res = await handleLogin(email, password);
            if (res && res.errCode === 0) {
                dispatch(doLogin(res.data.user));
            }
            else {
                message.error(res.data.errMessage)
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
                        Login
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
