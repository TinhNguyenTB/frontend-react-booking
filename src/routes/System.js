import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import Navigation from '../container/system/auth/Navigation';

const System = () => {
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.user.userInfo);
    useEffect(() => {
        if (!userInfo) {
            navigate(path.LOGIN)
        }
    }, [userInfo])

    return (
        <div>
            <Navigation />
        </div>
    )
}

export default System