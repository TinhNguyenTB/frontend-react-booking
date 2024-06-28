import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../container/system/DashBoard';
import SystemHeader from '../container/system/SystemHeader';
import ManageUser from '../container/system/admin/ManageUser/ManageUser.js';
import Unauthentication from '../container/system/auth/Unauthentication.js';
import ManageDoctor from '../container/system/admin/ManageDoctor/ManageDoctor.js';
import ManageSchedule from '../container/system/admin/ManageSchedule/ManageSchedule.js';
import ManageClinic from '../container/system/admin/ManageClinic/ManageClinic.js';
import ManageSpecialty from '../container/system/admin/ManageSpecialty/ManageSpecialty.js';
import ManageAppointment from '../container/system/doctor/ManageAppointment.js';
import ManageHistory from '../container/system/admin/ManageHistory/ManageHistory.js';


const System = () => {
    const isLogin = useSelector(state => state.account.isLogin);

    return (
        <div>
            {isLogin && <SystemHeader />}
            <Routes>
                <Route path='manage-user' element={<ManageUser />} />
                <Route path="manage-doctor" element={<ManageDoctor />} />
                <Route path='manage-schedule' element={<ManageSchedule />} />
                <Route path='manage-clinic' element={<ManageClinic />} />
                <Route path='manage-specialty' element={<ManageSpecialty />} />
                <Route path='manage-appointment' element={<ManageAppointment />} />
                <Route path='manage-histories' element={<ManageHistory />} />
                <Route path='*' element={isLogin ? <DashBoard /> : <Unauthentication />} />
            </Routes>
        </div>
    )
}

export default System