import React, { useEffect, useState } from 'react'
import { LANGUAGES } from '../../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { Modal, message, Row, Col, Input, Flex, Typography } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { postPatientBookAppointment } from '../../../../../services/userService';
import ProfileDoctor from '../ProfileDoctor';


const BookingModal = (props) => {
    let language = useSelector(state => state.app.language);
    const userInfo = useSelector(state => state.account.userInfo);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValue = {
        reason: '',
        doctorId: '',
        timeType: ''
    }
    const [infoBooking, setInfoBooking] = useState(defaultValue);

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

    const handleConfirmBooking = async () => {
        let check = validate()
        if (check === true) {
            let timeString = buildDataBooking(props.dataTime);
            let doctorName = buildDoctorName(props.dataTime);
            setIsLoading(true);

            let res = await postPatientBookAppointment({
                patientId: userInfo.id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                phoneNumber: userInfo.phoneNumber,
                email: userInfo.email,
                address: userInfo.address,
                reason: infoBooking.reason,
                date: props.dataTime.date,
                doctorId: infoBooking.doctorId,
                timeType: infoBooking.timeType,
                language: language,
                timeString: timeString,
                doctorName: doctorName
            })
            if (res && res.errCode === 0) {
                if (language === LANGUAGES.EN) {
                    message.success('Booking a new appointment successfully, please check email!')
                }
                else {
                    message.success('Đặt lịch khám thành công, vui lòng kiểm tra email!')
                }
                props.closeBookingModal()
                setIsLoading(false)
            }
            else {
                if (language === LANGUAGES.EN) {
                    message.error('Booking a new appointment failed!')
                }
                else {
                    message.error('Đặt lịch khám thất bại!')
                }
                setIsLoading(false)
            }
            setInfoBooking(defaultValue);
        }
    }

    const validate = () => {
        if (!infoBooking.reason) {
            message.error(language === LANGUAGES.EN ?
                'Please enter your medical examination reason'
                : 'Vui lòng nhập lý do khám bệnh của bạn'
            )
            return false;
        }
        return true;
    }

    let doctorId = '';
    if (props.dataTime && !_.isEmpty(props.dataTime)) {
        doctorId = props.dataTime.doctorId
    }

    return (
        <Modal
            title={<FormattedMessage id="patient.booking-modal.title" />}
            open={props.isOpenModal}
            onOk={() => handleConfirmBooking()}
            onCancel={props.closeBookingModal}
            width={'60rem'}
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
                    <Col span={24}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                            <Input
                                value={infoBooking.reason}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'reason')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12} style={{ backgroundColor: 'rgb(157,219,251)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <Typography.Paragraph strong>
                            <FormattedMessage id='booking-modal.note' />
                        </Typography.Paragraph>
                        <Typography.Text strong>
                            <FormattedMessage id='booking-modal.description' />
                        </Typography.Text>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default BookingModal