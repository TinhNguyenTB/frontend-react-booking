import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import Navigation from '../container/system/auth/Navigation';
import DashBoard from '../container/system/DashBoard';
import { Flex } from 'antd';
import SystemHeader from '../container/system/SystemHeader';
import ManageUser from '../container/system/admin/ManageUser';

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
        <Flex>
            {isLogin && <Navigation />}
            <div style={{ width: '84vw' }}>
                <SystemHeader />
                <Routes>

                    <Route path='user-manage' element={<ManageUser />} />
                    <Route path='*' element={<DashBoard />} />
                </Routes>
            </div>
        </Flex>
    )
}

export default System