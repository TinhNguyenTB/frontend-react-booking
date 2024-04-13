import { createNewClinic } from '../../../../services/adminService';
import { fetchAllClinic, deleteClinic } from '../../../../redux/actions/adminActions.js'
import { useEffect, useState } from 'react';
import ModalManageClinic from './ModalManageClinic.js';
import { message, Button, Table, Popconfirm, Space } from 'antd';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils/constant';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { emitter } from '../../../../utils/emitter.js';
import { useDispatch, useSelector } from 'react-redux';

const ManageClinic = () => {
    const [openModal, setOpenModal] = useState(false);
    const language = useSelector(state => state.app.language);
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const dispatch = useDispatch();
    const listClinic = useSelector(state => state.app.listClinic)

    const closeModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        dispatch(fetchAllClinic())
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: <FormattedMessage id='manage-clinic.clinic-name' />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <FormattedMessage id='manage-clinic.clinic-address' />,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            render: (_, record) =>
                <Space>
                    <Button size='large'
                        icon={<EditOutlined style={{ color: 'rgb(145,73,0)' }} />}
                        onClick={() => handleEditClinic(record)}
                    >
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={language === LANGUAGES.EN ? "Delete clinic" : "Xóa phòng khám"}
                        description={language === LANGUAGES.EN
                            ? "Are you sure to delete this clinic?"
                            : "Bạn có chắc muốn xóa phòng khám này?"}
                        onConfirm={() => handleDeleteClinic(record)}
                        onCancel={cancel}
                        okText={language === LANGUAGES.EN ? "Yes" : "Có"}
                        cancelText={language === LANGUAGES.EN ? "No" : "Không"}
                    >
                        <Button size='large' icon={<DeleteOutlined style={{ color: 'red' }} />}></Button>
                    </Popconfirm>
                </Space>
        }
    ];

    const cancel = (e) => {
        return;
    };

    const handleDeleteClinic = (clinic) => {
        dispatch(deleteClinic(clinic.id))
    }

    const handleCreateNewClinic = async (clinicInfo) => {
        let res = await createNewClinic(clinicInfo);
        if (res && res.errCode === 0) {
            dispatch(fetchAllClinic())
            message.success("Create new clinic successfully!")
        }
        else {
            message.error("Create new clinic failed!");
        }
    }

    const handleEditClinic = (clinic) => {
        emitter.emit("EditClinic", clinic)
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Button
                style={{ marginBottom: '1rem' }}
                type='primary' onClick={() => setOpenModal(true)}>
                <FormattedMessage id='manage-clinic.add' />
            </Button>
            <ModalManageClinic
                open={openModal}
                closeModal={closeModal}
                handleCreateNewClinic={handleCreateNewClinic}
                setOpenModal={setOpenModal}
            />
            <Table
                bordered
                rowKey="id"
                dataSource={listClinic}
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
        </div>
    )
}

export default ManageClinic