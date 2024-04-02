import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUser } from '../../../redux/actions/adminActions';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const TableUser = (props) => {
    const [arrUsers, setArrUsers] = useState([]);
    const dispatch = useDispatch();
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
            title: 'Firstname',
            dataIndex: 'firstName',
            key: 'firstname'
        },
        {
            title: 'Lastname',
            dataIndex: 'lastName',
            key: 'lastname',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Actions',
            render: (_, record) =>
                <>
                    <Button
                        icon={<EditOutlined style={{ color: 'brown' }} />}
                        style={{ marginRight: '1rem' }}
                        onClick={() => handleEditUser(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onClick={() => handleDeleteUser(record)}
                    >
                        Delete
                    </Button>
                </>
        }
    ];

    const handleDeleteUser = (user) => {
        props.deleteUser(user.id)
    }

    const handleEditUser = (user) => {
        props.handleEditUserFromParent(user)
    }

    return (
        <div>
            <Table
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
        </div>
    )
}

export default TableUser