import { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { getExtraInfoDoctorById } from '../../../../services/appService';
import { LANGUAGES } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import './DoctorExtraInfo.scss'

const DoctorExtraInfo = (props) => {
    const [isShowDetailInfo, setIsShowDetailInfo] = useState(false);
    const [extraInfo, setExtraInfo] = useState({});
    let language = useSelector(state => state.app.language)

    const setDoctorInfo = async () => {
        if (props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                setExtraInfo(res.data)
            }
        }
    }

    useEffect(() => {
        setDoctorInfo();
        // eslint-disable-next-line
    }, [props.doctorIdFromParent])

    const handleShowHideDetailInfo = () => {
        setIsShowDetailInfo(!isShowDetailInfo)
    }

    return (
        <div className='doctor-extra-infor-container'>
            <div className='content-up'>
                <div className='text-address'>
                    <FormattedMessage id="patient.extra-info-doctor.text-address" />
                </div>
                <div className='name-clinic'>
                    {extraInfo && extraInfo.Clinic && extraInfo.Clinic.name ? extraInfo.Clinic.name : ''}
                </div>
                <div className='detail-address'>
                    {extraInfo && extraInfo.Clinic && extraInfo.Clinic.address ? extraInfo.Clinic.address : ''}
                </div>
            </div>
            <div className='content-down'>
                {isShowDetailInfo ?
                    <>
                        <div className='title-price'>
                            <FormattedMessage id="patient.extra-info-doctor.price" />
                        </div>
                        <div className='detail-info'>
                            <div className='price'>
                                <span className='left'>
                                    <FormattedMessage id="patient.extra-info-doctor.price" />:
                                </span>
                                <span className='right'>
                                    {extraInfo && extraInfo.priceData && language === LANGUAGES.VI &&
                                        <NumberFormat value={extraInfo.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                    }
                                    {extraInfo && extraInfo.priceData && language === LANGUAGES.EN &&
                                        <NumberFormat value={extraInfo.priceData.valueEn} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    }
                                </span>
                            </div>
                            <div className='note'>
                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                            </div>
                        </div>

                        <div className='payment-method'>
                            <FormattedMessage id="patient.extra-info-doctor.payment" />
                            {extraInfo && extraInfo.paymentData && language === LANGUAGES.VI ?
                                extraInfo.paymentData.valueVi :
                                extraInfo.paymentData.valueEn
                            }
                        </div>
                        <div className='hide-price'>
                            <span className='detail' onClick={() => { handleShowHideDetailInfo() }}>
                                <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                            </span>
                        </div>
                    </>
                    :
                    <div className='short-info'>
                        <FormattedMessage id="patient.extra-info-doctor.price" />:
                        {extraInfo && extraInfo.priceData && language === LANGUAGES.VI &&
                            <NumberFormat
                                className='curency'
                                value={extraInfo.priceData.valueVi}
                                displayType={'text'} thousandSeparator={true}
                                suffix={'VND'}
                            />
                        }
                        {extraInfo && extraInfo.priceData && language === LANGUAGES.EN &&
                            <NumberFormat
                                className='curency'
                                value={extraInfo.priceData.valueEn}
                                displayType={'text'} thousandSeparator={true}
                                prefix={'$'}
                            />
                        }
                        <span className='detail' onClick={() => { handleShowHideDetailInfo() }}>
                            <FormattedMessage id="patient.extra-info-doctor.text-detail" />
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}

export default DoctorExtraInfo