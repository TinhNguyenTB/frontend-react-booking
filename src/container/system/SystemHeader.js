import { Flex, Typography, Dropdown, Space, Row, Tag, Button } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LANGUAGES } from '../../utils/constant';
import { LogoutOutlined, SettingOutlined, UnlockOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../redux/actions/appActions';
import './SystemHeader.scss'
import Navigation from './auth/Navigation';
import { doLogout } from '../../redux/actions/accountAction';

const SystemHeader = () => {
    const userInfo = useSelector(state => state.account.userInfo);
    const language = useSelector(state => state.app.language);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(doLogout())
    }

    const items = [
        {
            label: <Button style={{ padding: 0 }} type='link'>
                <FormattedMessage id='admin.system.change-pasword' />
            </Button>,
            icon: <UnlockOutlined />,
            key: 'change-password',
        },
        {
            label: <Button onClick={() => handleLogout()} style={{ padding: 0 }} type='link' >
                <FormattedMessage id='admin.system.logout' />
            </Button>,
            icon: <LogoutOutlined />,
            key: 'logout',
        },
    ];

    const changeLanguage = (language) => {
        dispatch(changeLanguageApp(language))
    }

    return (
        <Flex align='center' justify='space-between'
            style={{ padding: '0 2rem', borderBottom: '1px solid rgb(240,240,240)' }}>
            <Navigation />
            {language === LANGUAGES.VI ?
                <Typography.Title level={4}>
                    Xin chào, {userInfo.lastName} {userInfo.firstName}
                </Typography.Title>
                :
                <Typography.Title level={4}>
                    Hello, {userInfo.firstName} {userInfo.lastName}
                </Typography.Title>
            }
            <Flex gap={'1rem'}>
                <Row style={{ marginTop: '0.2rem' }}>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                        <Tag color='red' onClick={() => {
                            changeLanguage(LANGUAGES.VI)
                        }}>VI
                        </Tag>
                    </div>
                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                        <Tag color='green' onClick={() => {
                            changeLanguage(LANGUAGES.EN)
                        }}>EN
                        </Tag>
                    </div>
                </Row>
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <Typography.Title level={5} >
                        <Space>
                            <FormattedMessage id='admin.system.setting' />
                            <SettingOutlined
                                style={{ cursor: 'pointer' }}
                            />
                        </Space>
                    </Typography.Title>
                </Dropdown>
            </Flex>
        </Flex>
    )
}

export default SystemHeader