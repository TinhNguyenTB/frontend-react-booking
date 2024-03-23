import { Flex, Typography, Dropdown, Space } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../utils/constant';
import { LogoutOutlined, SettingOutlined, UnlockOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

const SystemHeader = () => {
    const userInfo = useSelector(state => state.user.userInfo);
    const language = useSelector(state => state.app.language);
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

    return (
        <Flex align='center' justify='space-between'
            style={{ backgroundColor: 'rgb(8,102,255)', height: '5vh', padding: '0.5rem 2rem' }}>
            {language === LANGUAGES.VI ?
                <Typography.Title level={4} style={{ color: 'white' }}>
                    Xin chào, {userInfo.lastName} {userInfo.firstName}
                </Typography.Title>
                :
                <Typography.Title level={4} style={{ color: 'white' }}>
                    Hello, {userInfo.firstName} {userInfo.lastName}
                </Typography.Title>
            }
            <div>
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
            </div>
        </Flex>
    )
}

export default SystemHeader