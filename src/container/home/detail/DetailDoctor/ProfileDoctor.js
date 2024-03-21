import { useState, useEffect } from 'react'
import { LANGUAGES } from '../../../../utils/constant'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import { getProfileDoctorById } from '../../../../services/appService';
import './ProfileDoctor.scss'

const ProfileDoctor = (props) => {
    const [dataProfile, setDataProfile] = useState({});
    let language = useSelector(state => state.app.language);
    let { isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = props;

    const getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            let data = await getInforDoctor(doctorId);
            setDataProfile(data);
        };

        fetchData();
    }, [doctorId]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>
                        {time} - {date}
                        <div>  <FormattedMessage id="patient.booking-modal.price-booking" /></div>
                    </div>
                </>
            )
        }
        return <></>
    }

    let nameVi = ''
    let nameEn = ''
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
    }

    return (
        <div className='profile-doctor-container'>
            <div className='intro-doctor'>
                <div className='content-left'
                    style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}
                >
                </div>
                <div className='content-right'>
                    <div className='up'>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className='down'>
                        {isShowDescriptionDoctor === true ?
                            <>
                                {dataProfile.Markdown && dataProfile.Markdown.description
                                    &&
                                    <span>{dataProfile.Markdown.description}</span>
                                }
                            </>
                            :
                            <>
                                {renderTimeBooking(dataTime)}
                            </>
                        }
                    </div>
                </div>
            </div>
            {isShowLinkDetail === true &&
                <div className='view-detail-doctor'>
                    <NavLink style={{ textDecoration: 'none', marginLeft: '0.5rem' }} to={`/detail-doctor/${doctorId}`}>
                        <FormattedMessage id="home-page.more-info" />
                    </NavLink>
                </div>
            }
            {isShowPrice === true &&
                <div className='price'>
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                        <NumberFormat value={dataProfile.Doctor_Infor.priceData.valueVi}
                            displayType={'text'} thousandSeparator={true} suffix={'VND'}
                        />
                    }
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                        <NumberFormat value={dataProfile.Doctor_Infor.priceData.valueEn}
                            displayType={'text'} thousandSeparator={true} prefix={'$'}
                        />
                    }
                </div>
            }
        </div>
    )
}

export default ProfileDoctor