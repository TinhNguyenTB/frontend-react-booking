import './Register.scss';
import { Select, Input, Button, Row, Col, Flex, message, Typography } from 'antd';
import { REGEX, LANGUAGES } from '../../utils/constant';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { register } from '../../services/userService';
import { fetchGenders } from '../../redux/actions/adminActions';

const Register = () => {
    const language = useSelector(state => state.app.language);
    const genders = useSelector(state => state.admin.genders);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenders())
    }, [])

    const defaultValue = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: ""
    }
    const [userInfo, setUserInfo] = useState(defaultValue);

    const checkValidateInput = () => {
        const emailRegex = REGEX.EMAIL;
        const phoneRegex = REGEX.PHONE;

        if (!userInfo.firstName) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your firstName`
                : 'Vui lòng nhập tên của bạn'
            )
            return false;
        }
        if (!userInfo.lastName) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your lastName`
                : 'Vui lòng nhập họ của bạn'
            )
            return false;
        }
        if (!userInfo.email) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your email`
                : 'Vui lòng nhập email của bạn'
            )
            return false;
        }
        if (!emailRegex.test(userInfo.email)) {
            message.error(language === LANGUAGES.EN ?
                `Please enter a valid email`
                : 'Vui lòng nhập email hợp lệ'
            )
            return false;
        }
        if (!userInfo.password) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your password`
                : 'Vui lòng nhập mật khẩu của bạn'
            )
            return false;
        }
        if (!userInfo.phoneNumber) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your phonenumber`
                : 'Vui lòng nhập số diện thoại của bạn'
            )
            return false;
        }
        if (!phoneRegex.test(userInfo.phoneNumber)) {
            message.error(language === LANGUAGES.EN ?
                'Please enter a valid phonenumber'
                : 'Vui lòng nhập số điện thoại hợp lệ'
            )
            return false;
        }
        if (!userInfo.address) {
            message.error(language === LANGUAGES.EN ?
                `Please enter your address`
                : 'Vui lòng nhập địa chỉ của bạn'
            )
            return false;
        }
        if (!userInfo.gender) {
            message.error(language === LANGUAGES.EN ?
                `Please select your gender`
                : 'Vui lòng chọn giới tính của bạn'
            )
            return false;
        }
        return true;
    }

    const handleSelectGender = (selectedOption) => {
        setUserInfo({ ...userInfo, gender: selectedOption })
    }

    const buildDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.value = item.keyMap;
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                result.push(obj)
            })
        }
        return result;
    }

    const onChangeInput = (event, id) => {
        let copyState = { ...userInfo }
        copyState[id] = event.target.value
        setUserInfo({ ...copyState })
    }

    const handleRegister = async () => {
        let check = checkValidateInput();
        if (check === true) {
            let res = await register(userInfo);
            if (res && res.errCode === 0) {
                message.success("Register successfully");
                setUserInfo(defaultValue);
            }
            else
                message.error("Register failed");
        }
    }

    return (
        <Row justify='center' align='middle' className='register-container'>
            <Col xs={24} sm={16} md={12} lg={12} className='register-content'>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    <FormattedMessage id="manage-user.register" />
                </Typography.Title>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.first-name" /></label>
                            <Input
                                value={userInfo.firstName}
                                onChange={(event) => onChangeInput(event, 'firstName')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.last-name" /></label>
                            <Input
                                value={userInfo.lastName}
                                onChange={(event) => onChangeInput(event, 'lastName')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.email" /></label>
                            <Input
                                value={userInfo.email}
                                onChange={(event) => onChangeInput(event, 'email')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.password" /></label>
                            <Input.Password
                                value={userInfo.password}
                                onChange={(event) => onChangeInput(event, 'password')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.phone-number" /></label>
                            <Input
                                value={userInfo.phoneNumber}
                                onChange={(event) => onChangeInput(event, 'phoneNumber')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <Select
                                value={userInfo.gender}
                                onChange={handleSelectGender}
                                options={buildDataSelect(genders)}
                            />
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.address" /></label>
                            <Input
                                value={userInfo.address}
                                onChange={(event) => onChangeInput(event, 'address')}
                            />
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <Button type='primary' block size='large'
                            onClick={() => handleRegister()}
                        >
                            <FormattedMessage id="manage-user.register" />
                        </Button>
                    </Col>
                    <Flex align='center' justify='center' style={{ width: '100%' }}>
                        <Typography.Text>
                            <FormattedMessage id="manage-user.have-account" />
                        </Typography.Text>
                        <Button type='link' onClick={() => navigate(path.LOGIN)}>
                            <FormattedMessage id="manage-user.login" />
                        </Button>
                    </Flex>
                </Row>
            </Col>
        </Row>
    )
}

export default Register