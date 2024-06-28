import { useSelector } from 'react-redux';
import Layout from '../home/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LANGUAGES } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';

const AllClinic = () => {
    const dataClinics = useSelector(state => state.app.listClinic)
    const navigate = useNavigate();

    console.log(dataClinics)
    const handleViewDetailClinic = (clinic) => {
        navigate(`/detail-clinic/${clinic.id}`)
    }

    return (
        <Layout>
            <div style={{ margin: '2rem 6rem' }}>
                <b style={{ display: 'block', margin: '0.5rem 0.5rem 1rem', fontSize: '1.3rem' }}>
                    <FormattedMessage id='patient.clinic-for-you' />
                </b>
                {dataClinics.map((item, index) => {
                    return (
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                padding: '0.5rem',
                                borderBottom: '1px solid #ddd'
                            }}
                            key={item.id}
                            onClick={() => handleViewDetailClinic(item)}>
                            <div
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    height: '6rem',
                                    width: '6rem',
                                    border: '1px solid #ddd',
                                    cursor: 'pointer',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain'
                                }}
                            >
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <span>{item.name}</span>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </Layout>
    )
}

export default AllClinic