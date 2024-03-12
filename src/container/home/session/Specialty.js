import { useNavigate } from 'react-router-dom'
import './Specialty.scss'
import { useEffect, useState } from 'react';
import { getAllSpecialty } from '../../../services/userService';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';

const Specialty = (props) => {
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
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>
                        <FormattedMessage id="home-page.popular-specialties" />
                    </span>
                    <Button className='btn-section'>
                        <FormattedMessage id="home-page.more-info" />
                    </Button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section-customize specialty-child' key={`specialty-${index}`}
                                        onClick={() => handleViewDetailSpecialty(item)}
                                    >
                                        <div className='bg-image'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <span className='specialty-name'>{item.name}</span>
                                    </div>
                                )
                            })
                        }

                    </Slider>
                </div>
            </div>
        </div>
    );


}

export default Specialty