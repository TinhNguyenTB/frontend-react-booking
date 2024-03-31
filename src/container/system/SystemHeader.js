import { Flex, Typography, Dropdown, Space, Row, Tag } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LANGUAGES } from '../../utils/constant';
import { LogoutOutlined, SettingOutlined, UnlockOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../redux/actions/appActions';
import './SystemHeader.scss'

const SystemHeader = () => {
    const userInfo = useSelector(state => state.account.userInfo);
    const language = useSelector(state => state.app.language);
    const dispatch = useDispatch()
    const items = [
        {
            label: <FormattedMessage id='admin.system.change-pasword' />,
            icon: <UnlockOutlined />,
            key: '0',
        },
        {
            label: <FormattedMessage id='admin.system.logout' />,
            icon: <LogoutOutlined />,
            key: '0',
        },
    ];

    const changeLanguage = (language) => {
        dispatch(changeLanguageApp(language))
    }

    return (
        <Flex align='center' justify='space-between'
            style={{ backgroundColor: 'rgb(8,102,255)', padding: '0.5rem 2rem' }}>
            {language === LANGUAGES.VI ?
                <Typography.Title level={4} style={{ color: 'white' }}>
                    Xin chào, {userInfo.lastName} {userInfo.firstName}
                </Typography.Title>
                :
                <Typography.Title level={4} style={{ color: 'white' }}>
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
                >
                    <Typography.Title level={5} style={{ color: 'white' }}>
                        <Space>
                            <FormattedMessage id='admin.system.setting' />
                            <SettingOutlined
                                style={{ color: 'white', cursor: 'pointer' }}
                            />
                        </Space>
                    </Typography.Title>
                </Dropdown>

            </Flex>
        </Flex>
    )
}

export default SystemHeader