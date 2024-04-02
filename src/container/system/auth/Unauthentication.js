import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../utils/constant';

const Unauthentication = () => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate(path.LOGIN)
    }

    return (
        <Result
            status="warning"
            title="Your login session has expired, please log in again."
            extra={
                <Button type="primary" onClick={() => redirectToLogin()}>
                    Login
                </Button>
            }
        />
    )
}

export default Unauthentication