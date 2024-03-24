import React from 'react';
import bg from '../../assets/bg-dashboard.jpg'

const DashBoard = () => {
    return (
        <div style={{
            width: '84vw',
            height: '92vh',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}></div>
    )
}

export default DashBoard