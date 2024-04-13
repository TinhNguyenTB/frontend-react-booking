import React, { useEffect, useState } from 'react'
import './ManageUser.scss';
import ModalManageUser from './ModalManageUser.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUser } from '../../../../redux/actions/adminActions';
import { Button, Table, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteUser } from '../../../../redux/actions/adminActions';
import { emitter } from '../../../../utils/emitter.js';
import { LANGUAGES } from '../../../../utils/constant.js';
import { FormattedMessage } from 'react-intl';

const ManageUser = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [arrUsers, setArrUsers] = useState([]);
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const listUser = useSelector(state => state.admin.listUser)
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(6);

    useEffect(() => {
        dispatch(fetchListUser())
    }, [])

    useEffect(() => {
        setArrUsers(listUser)
    }, [listUser])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: <FormattedMessage id='manage-user.first-name' />,
            dataIndex: 'firstName',
            key: 'firstname'
        },
        {
            title: <FormattedMessage id='manage-user.last-name' />,
            dataIndex: 'lastName',
            key: 'lastname',
        },
        {
            title: <FormattedMessage id='manage-user.address' />,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: <FormattedMessage id='manage-user.phone-number' />,
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Actions',
            render: (_, record) =>
                <>
                    <Button
                        icon={<EditOutlined style={{ color: 'rgb(145,73,0)', marginRight: '0.3rem' }} />}
                        style={{ marginRight: '1rem' }}
                        onClick={() => handleEditUser(record)}
                    >
                        <FormattedMessage id="manage-user.edit" />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={language === LANGUAGES.EN ? "Delete user" : "Xóa người dùng"}
                        description={language === LANGUAGES.EN
                            ? "Are you sure to delete this user?"
                            : "Bạn có chắc muốn xóa người dùng này?"}
                        onConfirm={() => handleDeleteUser(record)}
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

    const handleDeleteUser = (user) => {
        dispatch(deleteUser(user.id))
    }

    const handleEditUser = (user) => {
        emitter.emit("EditUser", user)
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    return (
        <div className='manage-user-container'>
            <Button
                type='primary'
                style={{ marginBottom: '1rem' }}
                onClick={() => setIsOpenModal(true)}
            >
                <FormattedMessage id='manage-user.add' />
            </Button>
            <Table
                bordered
                rowKey="id"
                dataSource={arrUsers}
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
            <ModalManageUser
                isOpenModal={isOpenModal}
                closeModal={closeModal}
                setIsOpenModal={setIsOpenModal}
            />
        </div>
    )
}

export default ManageUser