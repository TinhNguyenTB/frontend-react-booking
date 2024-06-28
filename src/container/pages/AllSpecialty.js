import Layout from '../home/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../services/appService';

const AllSpecialty = () => {
    const navigate = useNavigate();
    const [dataSpecialty, setDataSpecialty] = useState([]);

    const getDataSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0) {
            setDataSpecialty(res.data ? res.data : [])
        }
    }

    useEffect(() => {
        getDataSpecialty();
    }, []);

    const handleViewDetailSpecialty = (specialty) => {
        navigate(`/detail-specialty/${specialty.id}`)
    }

    return (
        <Layout>
            <div style={{ margin: '2rem 6rem' }}>
                <b style={{ display: 'block', margin: '0.5rem 0.5rem 1rem', fontSize: '1.3rem' }}>
                    <FormattedMessage id='patient.specialty-for-you' />
                </b>
                {dataSpecialty.map((item, index) => {
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
                            onClick={() => handleViewDetailSpecialty(item)}>
                            <div
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    height: '6rem',
                                    width: '6rem',
                                    border: '1px solid #ddd',
                                    cursor: 'pointer',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
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

export default AllSpecialty