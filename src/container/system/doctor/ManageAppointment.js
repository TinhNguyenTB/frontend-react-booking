import RemedyModal from "./RemedyModal"
import { LANGUAGES } from "../../../utils/constant";
import { DatePicker, message, Button, Table, Typography, Col, Row, Flex } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getListPatientForDoctor, postSendRemedy } from "../../../services/adminService";
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';

const ManageAppointment = () => {
    const today = dayjs();
    const [currentDate, setCurrentDate] = useState("")
    const [dataPatients, setDataPatients] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const userInfo = useSelector(state => state.account.userInfo);
    const language = useSelector(state => state.app.language);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            getDataPatients()
        }
    }, [])

    const getDataPatients = async () => {
        let formattedDate = dayjs(currentDate).startOf('day').valueOf(); // Convert to timestamp
        let res = await getListPatientForDoctor({
            doctorId: userInfo?.id,
            date: formattedDate
        });
        if (res && res.errCode === 0) {
            setDataPatients(res.data);
        }
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
    }

    useEffect(() => {
        getDataPatients();
    }, [currentDate])

    const handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            patientFirstName: item.patientData.firstName,
            patientLastName: item.patientData.lastName,
            timeType: item.timeType,
            reason: item.reason
        }
        setDataModal(data);
        setOpenModal(true);
    }

    const closeModal = () => {
        setDataModal({});
        setOpenModal(false);
    }

    const sendRemedy = async (email, imgBase64) => {
        let res = await postSendRemedy({
            email: email,
            imgBase64: imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientFirstName: dataModal.patientFirstName,
            patientLastName: dataModal.patientLastName,
            reason: dataModal.reason,
            language: language
        })
        if (res && res.errCode === 0) {
            message.success("Send remedy successfully!");
            await getDataPatients()
            closeModal()
        }
        else {
            message.error("Send remedy error!")
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.firstName' />,
            dataIndex: ['patientData', 'firstName'],
            key: 'firstName',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.lastName' />,
            dataIndex: ['patientData', 'lastName'],
            key: 'lastName',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.email' />,
            dataIndex: ['patientData', 'email'],
            key: 'email',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.time' />,
            dataIndex: ['timeTypeDataPatient', language === LANGUAGES.VI ? 'valueVi' : 'valueEn'],
            key: 'time',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.gender' />,
            dataIndex: ['patientData', 'genderData', language === LANGUAGES.VI ? 'valueVi' : 'valueEn'],
            key: 'gender',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.reason' />,
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: <FormattedMessage id='menu.doctor.manage-patient.phone' />,
            dataIndex: ['patientData', 'phonenumber'],
            key: 'phonenumber',
        },
        {
            title: 'Actions',
            render: (_, record) =>
                <Button size='large'
                    type="primary"
                    onClick={() => handleConfirm(record)}
                >
                    <FormattedMessage id='menu.doctor.manage-patient.confirm' />
                </Button>

        }
    ];

    return (
        <div style={{ margin: '2rem' }}>
            <RemedyModal
                isOpen={openModal}
                data={dataModal}
                closeModal={closeModal}
                sendRemedy={sendRemedy}
            />
            <Typography.Title level={3} style={{ textAlign: 'center' }}>
                <FormattedMessage id="menu.doctor.manage-appointment" />
            </Typography.Title>
            <Row>
                <Col span={8}>
                    <Flex gap={'0.5rem'} align="center">
                        <FormattedMessage id="menu.doctor.select-date" />
                        <DatePicker
                            onChange={handleOnChangeDatePicker}
                            format={language === LANGUAGES.VI ? 'DD-MM-YYYY' : 'MM-DD-YYYY'}
                            value={currentDate}
                            minDate={today}
                        />
                    </Flex>
                </Col>
                <Col span={24}>
                    <Table
                        bordered
                        rowKey="id"
                        dataSource={dataPatients}
                        columns={columns}
                        style={{ marginTop: '1rem' }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ManageAppointment