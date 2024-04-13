import { message, Button, Table, Popconfirm, Space } from 'antd';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../../utils/constant';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { emitter } from '../../../../utils/emitter.js';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ModalManageSpecialty from './ModalManageSpecialty.js';
import { fetchAllSpecialty, deleteSpecialty } from '../../../../redux/actions/adminActions.js'
import { createNewSpecialty } from '../../../../services/adminService.js';

const ManageSpecialty = () => {
    const [openModal, setOpenModal] = useState(false);
    const language = useSelector(state => state.app.language);
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const listSpecialty = useSelector(state => state.app.listSpecialty);
    const dispatch = useDispatch();

    const closeModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        dispatch(fetchAllSpecialty())
    }, [])

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
            title: 'Actions',
            render: (_, record) =>
                <Space>
                    <Button size='large'
                        icon={<EditOutlined style={{ color: 'rgb(145,73,0)' }} />}
                        onClick={() => handleEditSpecialty(record)}
                    >
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={language === LANGUAGES.EN ? "Delete specialty" : "Xóa phòng khám"}
                        description={language === LANGUAGES.EN
                            ? "Are you sure to delete this specialty?"
                            : "Bạn có chắc muốn xóa chuyên khoa này?"}
                        onConfirm={() => handleDeleteSpecialty(record)}
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

    const handleCreateNewSpecialty = async (specialtyInfo) => {
        let res = await createNewSpecialty(specialtyInfo);
        if (res && res.errCode === 0) {
            dispatch(fetchAllSpecialty())
            message.success("Create new specialty successfully!")
        }
        else {
            message.error("Create new specialty failed!");
        }
    }

    const handleDeleteSpecialty = (specialty) => {
        dispatch(deleteSpecialty(specialty.id))
    }

    const handleEditSpecialty = (specialty) => {
        emitter.emit("EditSpecialty", specialty)
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Button
                style={{ marginBottom: '1rem' }}
                type='primary' onClick={() => setOpenModal(true)}>
                <FormattedMessage id='manage-clinic.add' />
            </Button>
            <ModalManageSpecialty
                open={openModal}
                closeModal={closeModal}
                handleCreateNewSpecialty={handleCreateNewSpecialty}
                setOpenModal={setOpenModal}
            />
            <Table
                bordered
                rowKey="id"
                dataSource={listSpecialty}
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

export default ManageSpecialty