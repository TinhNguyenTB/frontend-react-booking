import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import Navigation from '../container/system/auth/Navigation';
import DashBoard from '../container/system/DashBoard';
import { Flex } from 'antd';
import SystemHeader from '../container/system/SystemHeader';
import ManageUser from '../container/system/admin/ManageUser';
import { fetchUserAccount } from '../redux/actions/accountAction';


const System = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.account.isLogin);

    useEffect(() => {
        if (isLogin === false)
            dispatch(fetchUserAccount())
    }, [dispatch, isLogin])



    useEffect(() => {
        if (isLogin === false) {
            navigate(path.LOGIN)
        }
    }, [])

    return (
        <div>
            {isLogin && <SystemHeader />}
            <Routes>
                <Route path='user-manage' element={<ManageUser />} />
                <Route path='*' element={<DashBoard />} />
            </Routes>

        </div>
    )
}

export default System