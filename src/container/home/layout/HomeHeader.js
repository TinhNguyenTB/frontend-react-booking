import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguageApp } from '../../../redux/actions/appActions'
import { useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.svg'


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
                        {/* <MenuOutlined className='header-menu' /> */}
                        <img className='header-logo' alt='logo' src={logo} onClick={() => returnToHome()} />
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
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
                        <div className='support'>
                            <QuestionCircleOutlined />
                            <FormattedMessage id="homeheader.support" />
                        </div>
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
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeHeader