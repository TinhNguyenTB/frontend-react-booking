import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguageApp } from '../../../redux/actions/appActions'
import { useNavigate } from 'react-router-dom';
import { UserOutlined, UnlockOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.svg'
import { path } from '../../../utils/constant';
import { Dropdown, Space, Button } from 'antd';
import { doLogout } from '../../../redux/actions/accountAction';

const HomeHeader = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let language = useSelector(state => state.app.language);
    const userInfo = useSelector(state => state.account.userInfo);

    const returnToHome = () => {
        navigate(path.HOME);
    }

    const changeLanguage = (language) => {
        dispatch(changeLanguageApp(language))
    }

    const handleLogout = () => {
        dispatch(doLogout())
    }

    const items = [
        {
            label: <Button onClick={() => navigate(path.CHANGE_PASSWORD)} style={{ padding: 0 }} type='link'>
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

    return (
        <div>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        {/* <MenuOutlined className='header-menu' /> */}
                        <img className='header-logo' alt='logo' src={logo} onClick={() => returnToHome()} />
                    </div>
                    <div className='center-content'>
                        <div className='child-content' onClick={() => navigate(path.ABOUT)}>
                            <div className='menu-title'><b><FormattedMessage id="homeheader.introduce" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.about" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b><FormattedMessage id="homeheader.speciality" /> </b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b><FormattedMessage id="homeheader.doctor" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={() => {
                                changeLanguage(LANGUAGES.VI)
                            }}>VI
                            </span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                            <span onClick={() => {
                                changeLanguage(LANGUAGES.EN)
                            }}>EN
                            </span>
                        </div>
                        <div className='login'>
                            <UserOutlined />
                            {userInfo ?
                                <>
                                    <Dropdown
                                        menu={{ items }}
                                        trigger={['click']}
                                    >
                                        <Space>
                                            {userInfo.email}
                                            <DownOutlined
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Space>
                                    </Dropdown>
                                </>
                                :
                                <div onClick={() => navigate(path.LOGIN)}>
                                    <FormattedMessage id="homeheader.login" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader