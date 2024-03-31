import React from 'react'
import './ManageUser.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant.js';
import { CommonUtils } from '../../../utils/CommonUtils.js';
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import TableUser from './TableUser.js';
import { Button } from 'antd';

const ManageUser = () => {
    return (
        <div className='manage-user-container'>
            <Button type='primary'
                style={{ marginBottom: '1rem' }}>
                Add a new user
            </Button>
            <TableUser />

        </div>
    )
}

export default ManageUser