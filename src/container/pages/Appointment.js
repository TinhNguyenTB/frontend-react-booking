import Layout from '../home/layout/Layout';
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Button, Typography, Popconfirm, message } from "antd";
import { useEffect, useState } from 'react';
import { getAppointment } from '../../services/userService';
import { useParams } from 'react-router-dom';
import './Appointment.scss';
import { deleteAppointment } from '../../services/userService';

const Appointment = () => {
    const language = useSelector(state => state.app.language);
    const [appointment, setAppointment] = useState({});
    const [dateVi, setDateVi] = useState("");
    const [dateEn, setDateEn] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchAppointment()
    }, [id])

    const fetchAppointment = async () => {
        let res = await getAppointment(id);
        if (res && res.errCode === 0) {
            setAppointment(res.data)
            const timestamp = parseInt(res.data?.date, 10);
            if (!isNaN(timestamp)) {
                const date = new Date(timestamp);
                // Lấy các thành phần của ngày tháng năm
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                // Tạo chuỗi định dạng dd/MM/yyyy
                const formattedDateVi = `${day}/${month}/${year}`;
                const formattedDateEn = `${month}/${day}/${year}`;
                setDateVi(formattedDateVi);
                setDateEn(formattedDateEn);
            }
        }
    }

    const confirm = (e) => {
        handleDeleteAppointment()
    };
    const cancel = (e) => {

    };

    const handleDeleteAppointment = async () => {
        let res = await deleteAppointment(id)
        if (res && res.errCode === 0) {
            message.success(res.message);
            fetchAppointment()
        }
    }

    return (
        <Layout>
            <div style={{ margin: '2rem 0 12rem' }}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    <FormattedMessage id='appointment.title' />
                </Typography.Title>
                {appointment && appointment.doctorInfo && appointment.timeTypeDataPatient &&
                    <table>
                        <thead>
                            <tr>
                                <th><FormattedMessage id='appointment.doctorName' /></th>
                                <th><FormattedMessage id='appointment.doctorEmail' /></th>
                                <th><FormattedMessage id='appointment.time' /></th>
                                <th><FormattedMessage id='appointment.date' /></th>
                                <th><FormattedMessage id='appointment.reason' /></th>
                                <th><FormattedMessage id='appointment.status' /></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {language === LANGUAGES.VI ?
                                <tr>
                                    <td>
                                        {appointment.doctorInfo.lastName} {appointment.doctorInfo.firstName}
                                    </td>
                                    <td>{appointment.doctorInfo.email}</td>
                                    <td>{appointment.timeTypeDataPatient.valueVi}</td>
                                    <td>{dateVi}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.statusData.valueVi}</td>
                                    <td>
                                        <Popconfirm
                                            placement="topLeft"
                                            title="Hủy lịch hẹn"
                                            description="Bạn có chắc muốn hủy lịch hẹn này?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Có"
                                            cancelText="Không"
                                        >
                                            <Button danger>Hủy</Button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td>
                                        {appointment.doctorInfo.firstName} {appointment.doctorInfo.lastName}
                                    </td>
                                    <td>{appointment.doctorInfo.email}</td>
                                    <td>{appointment.timeTypeDataPatient.valueEn}</td>
                                    <td>{dateEn}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.statusData.valueEn}</td>
                                    <td>
                                        <Popconfirm
                                            placement="topLeft"
                                            title="Delete appointment"
                                            description="Are you sure to delete this appointment?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                }
            </div>
        </Layout>
    )
}

export default Appointment