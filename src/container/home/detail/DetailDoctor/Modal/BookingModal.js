import React, { useEffect, useState } from 'react'
import { LANGUAGES } from '../../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { Modal, message, Select, Row, Col, Input, Flex } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGender } from '../../../../../redux/actions/userActions';
import { postPatientBookAppointment } from '../../../../../services/userService';
import ProfileDoctor from '../ProfileDoctor';

const BookingModal = (props) => {
    const dispatch = useDispatch();
    let language = useSelector(state => state.app.language);
    let genders = useSelector(state => state.user.genders);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValue = {
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        gender: '',
        doctorId: '',
        timeType: '',
        selectedGender: ''
    }

    const [infoBooking, setInfoBooking] = useState(defaultValue);

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    useEffect(() => {
        dispatch(fetchGender())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setInfoBooking({ ...infoBooking, gender: buildDataGender(genders) })
        // eslint-disable-next-line
    }, [language, genders])

    useEffect(() => {
        let { doctorId, timeType } = props.dataTime;
        setInfoBooking({ ...infoBooking, timeType: timeType, doctorId: doctorId })
        // eslint-disable-next-line
    }, [props.dataTime])

    const handleOnChangeInput = (value, id) => {
        let _infoBooking = _.cloneDeep(infoBooking);
        _infoBooking[id] = value;
        setInfoBooking({ ..._infoBooking })
    }

    const buildDataBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return ` ${time} - ${date}`
        }
        return ''
    }

    const buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return ''
    }

    const buildDataSelectGender = (gender) => {
        let result = [];
        if (gender && gender.length > 0) {
            gender.map(item => {
                let obj = {};
                obj.value = item.keyMap;
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                result.push(obj)
            })
        }
        return result;
    }

    const handleChangeSelect = (selectedOption) => {
        setInfoBooking({ ...infoBooking, selectedGender: selectedOption })
    }

    const handleConfirmBooking = async () => {
        let timeString = buildDataBooking(props.dataTime);
        let doctorName = buildDoctorName(props.dataTime);
        setIsLoading(true);

        let res = await postPatientBookAppointment({
            fullName: infoBooking.fullName,
            phoneNumber: infoBooking.phoneNumber,
            email: infoBooking.email,
            address: infoBooking.address,
            reason: infoBooking.reason,
            date: props.dataTime.date,
            doctorId: infoBooking.doctorId,
            selectedGender: infoBooking.selectedGender,
            timeType: infoBooking.timeType,
            language: language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            message.success('Booking a new appointment successfully!')
            props.closeBookingModal()
            setIsLoading(false)
        }
        else {
            message.error('Booking a new appointment failed!')
        }
        setInfoBooking(defaultValue);
    }

    let doctorId = '';
    if (props.dataTime && !_.isEmpty(props.dataTime)) {
        doctorId = props.dataTime.doctorId
    }

    return (
        <Modal
            title={<FormattedMessage id="patient.booking-modal.title" />}
            centered
            open={props.isOpenModal}
            onOk={() => handleConfirmBooking()}
            onCancel={props.closeBookingModal}
            width={1000}
            okButtonProps={{ loading: isLoading }}
        >
            <div className='booking-modal-container'>
                <div className='doctor-infor'>
                    <ProfileDoctor
                        doctorId={doctorId}
                        isShowDescriptionDoctor={false}
                        isShowPrice={true}
                        dataTime={props.dataTime}
                    />
                </div>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                            <Input
                                className='form-control'
                                value={infoBooking.fullName}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'fullName')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                            <Input
                                className='form-control'
                                value={infoBooking.phoneNumber}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'phoneNumber')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.email" /></label>
                            <Input
                                className='form-control'
                                value={infoBooking.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.address" /></label>
                            <Input
                                className='form-control'
                                value={infoBooking.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex gap={10} align='center'>
                            <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                            <Select
                                style={{ width: '10rem' }}
                                value={infoBooking.selectedGender}
                                onChange={handleChangeSelect}
                                options={buildDataSelectGender(genders)}
                            >
                            </Select>
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                            <Input
                                value={infoBooking.reason}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'reason')}
                            />
                        </Flex>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default BookingModal