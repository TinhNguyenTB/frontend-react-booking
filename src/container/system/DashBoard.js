import React from 'react';
import bg from '../../assets/bg-dashboard.jpg'

const DashBoard = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}></div>
    )
}

export default DashBoard