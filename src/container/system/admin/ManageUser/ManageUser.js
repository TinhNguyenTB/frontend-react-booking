import React, { useEffect, useRef, useState } from 'react'
import './ManageUser.scss';
import ModalManageUser from './ModalManageUser.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUser } from '../../../../redux/actions/adminActions';
import { Button, Table, Popconfirm, Space, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteUser } from '../../../../redux/actions/adminActions';
import { emitter } from '../../../../utils/emitter.js';
import { LANGUAGES } from '../../../../utils/constant.js';
import { FormattedMessage } from 'react-intl';
import Highlighter from 'react-highlight-words';

const ManageUser = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [arrUsers, setArrUsers] = useState([]);
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const listUser = useSelector(state => state.admin.listUser)
    const [currentPages, setCurrentPages] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{ padding: '0.5rem' }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: '0.5rem', display: 'block', }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: '5.5rem' }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: '5.5rem' }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => { close() }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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
            key: 'firstname',
            ...getColumnSearchProps('firstName'),
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
                <Space>
                    <Button size='large'
                        icon={<EditOutlined style={{ color: 'rgb(145,73,0)' }} />}
                        onClick={() => handleEditUser(record)}
                    >
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
                        <Button size='large' icon={<DeleteOutlined style={{ color: 'red' }} />}></Button>
                    </Popconfirm>

                </Space>
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