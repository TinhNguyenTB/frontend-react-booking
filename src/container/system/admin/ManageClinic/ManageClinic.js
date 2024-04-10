import { createNewClinic, deleteClinicService } from '../../../../services/adminService';
import { getAllClinic } from '../../../../services/appService';
import { useEffect, useState } from 'react';
import ModalAddClinic from './ModalAddClinic';
import { message, Button, Table, Popconfirm } from 'antd';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils/constant';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ManageClinic = () => {
    const [listClinic, setListClinic] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const language = useSelector(state => state.app.language);
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(6);

    const closeModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                setListClinic(res.data ? res.data.reverse() : [])
            }
        }
        fetchData()
    }, [listClinic])

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
                <>
                    <Button
                        icon={<EditOutlined style={{ color: 'rgb(145,73,0)', marginRight: '0.3rem' }} />}
                        style={{ marginRight: '1rem' }}
                    // onClick={() => handleEditUser(record)}
                    >
                        <FormattedMessage id="manage-user.edit" />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={language === LANGUAGES.EN ? "Delete clinic" : "Xóa phòng khám"}
                        description={language === LANGUAGES.EN
                            ? "Are you sure to delete this clinic?"
                            : "Bạn có chắc muốn xóa người phòng khám này?"}
                        onConfirm={() => handleDeleteClinic(record)}
                        onCancel={cancel}
                        okText={language === LANGUAGES.EN ? "Yes" : "Có"}
                        cancelText={language === LANGUAGES.EN ? "No" : "Không"}
                    >
                        <Button icon={<DeleteOutlined style={{ color: 'red', marginRight: '0.3rem' }} />}>
                            <FormattedMessage id="manage-user.delete" />
                        </Button>
                    </Popconfirm>

                </>
        }
    ];

    const cancel = (e) => {
        return;
    };


    const handleDeleteClinic = async (clinic) => {
        let res = await deleteClinicService(clinic.id);
        if (res && res.errCode === 0) {
            message.success("Delete clinic successfully!")
        }
        else {
            message.error("Delete clinic failed!")
        }
    }

    const handleCreateNewClinic = async (clinicInfo) => {
        let res = await createNewClinic(clinicInfo);
        if (res && res.errCode === 0) {
            message.success("Create new clinic successfully!")
        }
        else {
            message.error("Create new clinic failed!");
        }
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Button
                style={{ marginBottom: '1rem' }}
                type='primary' onClick={() => setOpenModal(true)}>
                <FormattedMessage id='manage-clinic.add' />
            </Button>
            <ModalAddClinic
                open={openModal}
                closeModal={closeModal}
                handleCreateNewClinic={handleCreateNewClinic}
            />
            <Table
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