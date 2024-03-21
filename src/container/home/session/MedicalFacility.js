import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import './MedicalFacility.scss'
import { getAllClinic } from "../../../services/appService";

const MedicalFacility = (props) => {
    const [dataClinics, setDataClinics] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            setDataClinics(res.data ? res.data : [])
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    const handleViewDetailClinic = (clinic) => {
        navigate(`/detail-clinic/${clinic.id}`)
    }

    return (
        <div className='section-share section-medical-facility'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>
                        <FormattedMessage id="home-page.medical-facility" />
                    </span>
                    <Button className='btn-section'>
                        <FormattedMessage id="home-page.more-info" />
                    </Button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {dataClinics && dataClinics.length > 0
                            && dataClinics.map((item, index) => {
                                return (
                                    <div className='section-customize clinic-child' key={`medical-facility-${index}`}
                                        onClick={() => handleViewDetailClinic(item)}
                                    >
                                        <div className='bg-image section-medical-facility'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className='clinic-name'>
                                            <span>{item.name}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default MedicalFacility