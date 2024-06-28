import { getAllHistories, getUserById } from "../../../../services/adminService";
import { Table, Image, Button, Drawer, Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';


const ManageHistory = () => {
    const [open, setOpen] = useState(false);
    const [histories, setHistories] = useState([]);
    const [user, setUser] = useState({});
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const language = useSelector(state => state.app.language);
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    useEffect(() => {
        const fetchHistories = async () => {
            const res = await getAllHistories();
            if (res && res.errCode === 0) {
                setHistories(res.data);
            }
        }
        fetchHistories()
    }, [])

    const fetchUserById = async (id) => {
        const res = await getUserById(id);
        if (res && res.errCode === 0) {
            setUser(res.data);
            showDrawer()
        }
    }

    const openPreviewImage = (link) => {
        setPreviewImageUrl(link)
        setIsOpenPreviewImg(true)
    }

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    console.log(histories)
    console.log(user)
    const columns = [
        {
            title: <FormattedMessage id='manage-history.patientId' />,
            render: (text, record) =>
                <Button onClick={() => fetchUserById(record.patientId)} type="link">{record.patientId}</Button>
            ,
            key: 'patientId',
        },
        {
            title: <FormattedMessage id='manage-history.doctor-name' />,
            render: (text, record) =>
                language === LANGUAGES.EN ?
                    `${record.appointmentData.firstName} ${record.appointmentData.lastName}`
                    :
                    `${record.appointmentData.lastName} ${record.appointmentData.firstName}`
            ,
            key: 'doctorName',
        },
        {
            title: <FormattedMessage id='manage-history.reason' />,
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: <FormattedMessage id='manage-history.bill' />,
            render: (text, record) =>
                <div
                    style={{
                        backgroundImage: `url(${record.files})`,
                        height: '4rem',
                        width: '4rem',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        backgroundRepeat: 'center center no-repeat',
                        backgroundSize: 'cover'
                    }}
                    onClick={() => openPreviewImage(record.files)}
                >
                </div>
            ,
            key: 'bill',
        },
    ]
    return (
        <div style={{ margin: '2rem' }}>
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
            <Table
                bordered
                rowKey="id"
                dataSource={histories}
                columns={columns}
                pagination={{
                    current: currentPages,
                    pageSize: currentLimit,
                    onChange: (page, pageSize) => {
                        setCurrentPages(page)
                        setCurrentLimit(pageSize)
                    }
                }}
            />
            <Drawer
                title={<FormattedMessage id='manage-history.patient-info' />}
                placement={'left'}
                closable={false}
                onClose={onClose}
                open={open}
                key={'left'}
            >
                <Flex vertical gap={10}>
                    <div>
                        <FormattedMessage id='manage-history.email' />: <label>{user.email}</label>
                    </div>
                    <div>
                        <FormattedMessage id='manage-history.first-name' />: <label>{user.firstName}</label>
                    </div>
                    <div>
                        <FormattedMessage id='manage-history.last-name' />: <label>{user.lastName}</label>
                    </div>
                    <div>
                        <FormattedMessage id='manage-history.phone-number' />: <label>{user.phonenumber}</label>
                    </div>
                    <div>
                        <FormattedMessage id='manage-history.address' />: <label>{user.address}</label>
                    </div>
                </Flex>
            </Drawer>
        </div>
    )
}

export default ManageHistory