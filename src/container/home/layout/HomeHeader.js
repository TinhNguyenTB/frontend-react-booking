import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguageApp } from '../../../redux/actions/appActions'
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.svg'
import { Carousel, Col, Row } from 'antd'

const HomeHeader = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let language = useSelector(state => state.app.language)

    const returnToHome = () => {
        navigate('/');
    }

    const changeLanguage = (language) => {
        dispatch(changeLanguageApp(language))
    }

    return (
        <div>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <MenuOutlined className='header-menu' />
                        <img className='header-logo' alt='logo' src={logo} onClick={() => returnToHome()} />
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.speciality" /> </b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <QuestionCircleOutlined />
                            <FormattedMessage id="homeheader.support" />
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={() => {
                                changeLanguage(LANGUAGES.VI)
                            }}>VN
                            </span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                            <span onClick={() => {
                                changeLanguage(LANGUAGES.EN)
                            }}>EN
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* {
                props.isShowBanner === true && */}
            <Row justify='center' style={{ marginTop: '1rem' }}>
                <Col xs={24} sm={24} md={20} xl={16}>
                    <Carousel
                        autoplay
                        autoplaySpeed={4000}
                        effect='fade'
                    >
                        <div className='banner banner1'>
                        </div>
                        <div className='banner banner2'>
                        </div>
                        <div className='banner banner4' >
                        </div>
                    </Carousel>
                </Col>
            </Row>

            {/* } */}
        </div>

    )
}

export default HomeHeader