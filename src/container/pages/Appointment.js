import Layout from '../home/layout/Layout';
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Table, Image, Col, Row, Typography } from "antd";
import { getHistories } from '../../services/userService';
import { useEffect, useState } from 'react';
import './Appointment.scss'

const Appointment = () => {
    const language = useSelector(state => state.app.language);
    const userInfo = useSelector(state => state.account.userInfo);
    const [histories, setHistories] = useState([]);
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    useEffect(() => {
        fetchAllHistories()
    }, [userInfo])

    const fetchAllHistories = async () => {
        let res = await getHistories({ patientId: userInfo?.id });
        if (res && res.errCode === 0) {
            setHistories(res.data)
            console.log(res.data)
        }
    }

    const openPreviewImage = (link) => {
        setPreviewImageUrl(link)
        setIsOpenPreviewImg(true)
    }

    const columns = [
        {
            title: <FormattedMessage id='appointment.doctorName' />,
            render: (text, record) =>
                language === LANGUAGES.EN ?
                    `${record.appointmentData.firstName} ${record.appointmentData.lastName}`
                    :
                    `${record.appointmentData.lastName} ${record.appointmentData.firstName}`
            ,
            key: 'doctorName',
        },
        {
            title: <FormattedMessage id='appointment.doctorEmail' />,
            dataIndex: ['appointmentData', 'email'],
            key: 'doctorEmail',
        },
        {
            title: <FormattedMessage id='appointment.reason' />,
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: <FormattedMessage id='appointment.bill' />,
            render: (text, record) =>
                <div className='preview-image'
                    style={{ backgroundImage: `url(${record.files})` }}
                    onClick={() => openPreviewImage(record.files)}
                >
                </div>
            ,
            key: 'bill',
        },
    ];

    return (
        <Layout>
            <div style={{ margin: '2rem' }}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    <FormattedMessage id='appointment.title' />
                </Typography.Title>
                {isOpenPreviewImg && (
                    <Image
                        wrapperStyle={{
                            display: 'none'
                        }}
                        preview={{
                            visible: isOpenPreviewImg,
                            onVisibleChange: (visible) => setIsOpenPreviewImg(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImageUrl(''),
                        }}
                        src={previewImageUrl}
                    />
                )}
                <Row>
                    <Col span={24}>
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={histories}
                            columns={columns}
                            style={{ marginTop: '1rem' }}
                        />
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Appointment