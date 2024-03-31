import React, { useEffect, useState } from 'react';
import { Menu } from 'antd'
import { adminMenu, doctorMenu } from './menuSystem';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../../utils/constant';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const userInfo = useSelector(state => state.account.userInfo);
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
            <Menu mode='horizontal'
                style={{ width: '60rem' }}
                items={menuItem}
                onClick={handleMenuClick}
                selectedKeys={[current]}
            />
        </div>
    )
}

export default Navigation