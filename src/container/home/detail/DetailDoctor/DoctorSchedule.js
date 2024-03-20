import React, { useEffect, useState } from 'react'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../../utils/constant';
import { useSelector } from 'react-redux';
import { getScheduleDoctorByDate } from '../../../../services/appService';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss'
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookingModal from './Modal/BookingModal';

const DoctorSchedule = (props) => {
    const [allDays, setAllDays] = useState([]);
    const [allTimeAvailable, setAllTimeAvailable] = useState([]);
    const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
    const [dataScheduleTimeModal, setDataScheduleTimeModal] = useState({});
    const language = useSelector(state => state.app.language);

    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format("ddd -  DD/MM");
                    object.label = capitalizeFirstLetter(labelVi);
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd -  DD/MM");
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object)
        }
        return allDays;
    }

    const fetchData = async () => {
        let allDays = getArrDays(language);
        if (props.doctorIdFromParent && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(props.doctorIdFromParent, allDays[0].value);
            setAllTimeAvailable(res.data ? res.data : []);
        }
        if (allDays.length > 0) {
            setAllDays(allDays);
        }
    };

    const getAllDay = () => {
        let allDays = getArrDays(language);
        if (allDays.length > 0) {
            setAllDays(allDays);
        }
    }

    useEffect(() => {
        getAllDay();
    }, [language]);

    useEffect(() => {
        fetchData();
    }, [props.doctorIdFromParent]);

    const handleOnChangeSelect = async (event) => {
        if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
            let doctorId = props.doctorIdFromParent
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                setAllTimeAvailable(res.data ? res.data : []);
            }
        }
    }

    const handleClickScheduleTime = (time) => {
        setIsOpenModalBooking(true);
        setDataScheduleTimeModal(time);
    }

    const closeBookingModal = () => {
        setIsOpenModalBooking(false);
    }

    return (
        <>
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={`day-${index}`}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                        <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                    </div>
                    <div className='time-content'>
                        {allTimeAvailable && allTimeAvailable.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allTimeAvailable.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <Button
                                                key={`btn-time-${index}`}
                                                onClick={() => handleClickScheduleTime(item)}
                                            >
                                                {timeDisplay}
                                            </Button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id="patient.detail-doctor.choose" />
                                        <FontAwesomeIcon icon="fa-regular fa-hand-pointer" />
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <BookingModal
                isOpenModal={isOpenModalBooking}
                closeBookingModal={closeBookingModal}
                dataTime={dataScheduleTimeModal}
            />
        </>
    )
}

export default DoctorSchedule