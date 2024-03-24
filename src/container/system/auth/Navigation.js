import React, { useEffect, useState } from 'react';
import { Menu } from 'antd'
import './Navigation.scss'
import { adminMenu, doctorMenu } from './menuSystem';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../../utils/constant';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const userInfo = useSelector(state => state.user.userInfo);
    const [menuItem, setMenuItem] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location.pathname);

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    useEffect(() => {
        let menu = [];
        if (userInfo.roleId === USER_ROLE.ADMIN) {
            menu = adminMenu;
        }
        else if (userInfo.roleId === USER_ROLE.DOCTOR) {
            menu = doctorMenu;
        }
        setMenuItem(menu)
    }, [userInfo])


    return (
        <div>
            <Menu mode='inline' theme='dark'
                style={{ width: '16vw', height: '100vh' }}
                items={menuItem}
                onClick={handleMenuClick}
            />
        </div>
    )
}

export default Navigation