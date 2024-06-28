import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES, path } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import { fetchTopDoctor } from "../../../redux/actions/appActions";
import './OutStandingDoctor.scss'

const OutStandingDoctor = (props) => {
    const navigate = useNavigate();
    const topDoctors = useSelector(state => state.app.topDoctors)
    const dispatch = useDispatch();
    const [arrDoctors, setArrDoctors] = useState([]);
    const language = useSelector(state => state.app.language)

    const handleViewDetailDoctor = (doctor) => {
        navigate(`/detail-doctor/${doctor.id}`)
    }

    useEffect(() => {
        dispatch(fetchTopDoctor())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setArrDoctors(topDoctors)
        // eslint-disable-next-line
    }, [topDoctors])

    return (
        <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="home-page.outstanding-doctor" /></span>
                    <Button onClick={() => navigate(path.ALL_DOCTOR)} className='btn-section'>
                        <FormattedMessage id="home-page.more-info" />
                    </Button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {arrDoctors && arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => handleViewDetailDoctor(item)}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className='name-position'>
                                                <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                                            </div>
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

export default OutStandingDoctor