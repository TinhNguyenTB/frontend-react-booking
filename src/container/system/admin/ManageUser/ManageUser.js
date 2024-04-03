import React, { useState } from 'react'
import './ManageUser.scss';
import TableUser from './TableUser.js';
import { Button } from 'antd';
import ModalManageUser from './ModalManageUser.js';

const ManageUser = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

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
                Add a new user
            </Button>
            <TableUser />
            <ModalManageUser
                isOpenModal={isOpenModal}
                closeModal={closeModal}
            />
        </div>
    )
}

export default ManageUser