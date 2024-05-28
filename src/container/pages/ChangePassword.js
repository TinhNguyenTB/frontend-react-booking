import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import './ChangePassword.scss';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { handleChangePassword } from '../../services/accountService';

const ChangePassword = () => {

    const onFinish = async (values) => {
        let res = await handleChangePassword({
            email: values.email,
            password: values.oldPassword,
            newPassword: values.confirmPassword
        })
        if (res && res.errCode === 0) {
            message.success(res.message);
        }
        else {
            message.error(res.message);
        }
    };

    return (
        <Row justify='center' align='middle' className='form-container'>
            <Col xs={24} sm={16} md={12} lg={6}>
                <Form className='form-content'
                    name="login"
                    onFinish={onFinish}
                    size='large'
                    wrapperCol={{ span: 24 }}
                >
                    <Typography.Title level={2} style={{ textAlign: 'center' }}>
                        Change Password
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
                        name="oldPassword"
                        hasFeedback
                        rules={[{ required: true, message: 'Please enter your old password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Old password" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        hasFeedback
                        rules={[{ required: true, message: 'Please enter your new password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="New password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 24 }}
                    >
                        <Button type="primary" htmlType="submit" block>
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default ChangePassword