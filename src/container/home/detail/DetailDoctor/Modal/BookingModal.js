import React from 'react'
import { LANGUAGES } from '../../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { Modal, message, Select, DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';

const BookingModal = (props) => {
    return (
        <div>
            <Modal
                title="Modal 1000px width"
                centered
                open={props.isOpenModal}
                // onOk={() => setOpen(false)}
                onCancel={props.closeBookingModal}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    )
}

export default BookingModal