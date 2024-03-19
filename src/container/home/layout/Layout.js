import React from 'react';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';

const Layout = ({ children }) => {
    return (
        <>
            <HomeHeader />
            {children}
            <HomeFooter />
        </>
    );
};

export default Layout;
