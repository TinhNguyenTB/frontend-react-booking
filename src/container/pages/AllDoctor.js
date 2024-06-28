import { useSelector } from 'react-redux';
import Layout from '../home/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LANGUAGES } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';

const AllDoctor = () => {
    const topDoctors = useSelector(state => state.app.topDoctors)
    const [arrDoctors, setArrDoctors] = useState([]);
    const navigate = useNavigate();
    const language = useSelector(state => state.app.language)

    useEffect(() => {
        setArrDoctors(topDoctors)
        // eslint-disable-next-line
    }, [topDoctors])

    const handleViewDetailDoctor = (doctor) => {
        navigate(`/detail-doctor/${doctor.id}`)
    }

    return (
        <Layout>
            <div style={{ margin: '2rem 6rem' }}>
                <b style={{ display: 'block', margin: '0.5rem 0.5rem 1rem', fontSize: '1.3rem' }}>
                    <FormattedMessage id='patient.doctor-for-you' />
                </b>
                {arrDoctors.map((item, index) => {
                    let imageBase64 = ''
                    if (item.image) {
                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
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
                            onClick={() => handleViewDetailDoctor(item)}>
                            <div
                                style={{
                                    backgroundImage: `url(${imageBase64})`,
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
                                <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </Layout>
    )
}

export default AllDoctor