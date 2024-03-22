import React, { useEffect, useState } from 'react'
import { postVerifyBookAppointment } from '../../services/userService';
import Layout from '../home/layout/Layout';
import { useLocation } from 'react-router-dom';
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';

const VerifyEmail = () => {
    const [statusVerify, setStatusVerify] = useState(false);
    const [errCode, setErrCode] = useState(0);
    const location = useLocation();

    const verifyBookAppointment = async () => {
        if (location && location.search) {
            let urlParams = new URLSearchParams(location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                setStatusVerify(true);
                setErrCode(res.errCode);
            }
            else {
                setStatusVerify(true);
                setErrCode(res && res.errCode ? res.errCode : -1);
            }
        }
    }


    useEffect(() => {
        verifyBookAppointment();
    }, [])

    return (
        <Layout>
            <div className='verify-email-container'>
                {statusVerify === false ?
                    <div>Loading data...</div>
                    :
                    <div>
                        {errCode === 0 ?
                            <div className='info-booking'><FormattedMessage id="patient.verify-email.success" /></div>
                            :
                            <div className='info-booking'><FormattedMessage id="patient.verify-email.failed" /></div>
                        }
                    </div>
                }
            </div>
        </Layout>
    )
}

export default VerifyEmail