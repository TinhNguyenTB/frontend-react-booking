import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../container/system/DashBoard';
import SystemHeader from '../container/system/SystemHeader';
import ManageUser from '../container/system/admin/ManageUser/ManageUser.js';
import Unauthentication from '../container/system/auth/Unauthentication.js';


const System = () => {
    const isLogin = useSelector(state => state.account.isLogin);

    return (
        <div>
            {isLogin && <SystemHeader />}
            <Routes>
                <Route path='user-manage' element={<ManageUser />} />
                <Route path='*' element={isLogin ? <DashBoard /> : <Unauthentication />} />
            </Routes>
        </div>
    )
}

export default System