import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import Navigation from '../container/system/auth/Navigation';
import DashBoard from '../container/system/DashBoard';
import { Col, Row } from 'antd';
import SystemHeader from '../container/system/SystemHeader';

const System = () => {
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.user.userInfo);
    const isLogin = useSelector(state => state.user.isLogin);

    useEffect(() => {
        if (!userInfo) {
            navigate(path.LOGIN)
        }
    }, [userInfo])

    return (
        <Row>
            {isLogin && <Navigation />}
            <div style={{ width: '84vw' }}>
                <SystemHeader />
                <Routes>
                    {/* <Route path='' /> */}
                    <Route index element={<DashBoard />} />
                </Routes>
            </div>
        </Row>
    )
}

export default System