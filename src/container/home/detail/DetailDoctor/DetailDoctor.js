import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailInfoDoctor } from '../../../../services/appService';
import { useSelector } from 'react-redux';
import Layout from '../../layout/Layout';
import { LANGUAGES } from '../../../../utils/constant';
import './DetailDoctor.scss';
import DoctorExtraInfo from './DoctorExtraInfo';
import DoctorSchedule from './DoctorSchedule';

const DetailDoctor = () => {
    const [detailDoctor, setDetailDoctor] = useState({});
    const [currentDoctorId, setCurrentDoctorId] = useState(-1);
    const { id } = useParams();
    let language = useSelector(state => state.app.language)

    const fetchData = async () => {
        if (id) {
            setCurrentDoctorId(id);
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                setDetailDoctor(res.data);
            }
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [id]);

    let nameVi = ''
    let nameEn = ''
    if (detailDoctor && detailDoctor.positionData) {
        nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
    }

    return (
        <Layout>
            <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {detailDoctor.doctorInfoData && detailDoctor.doctorInfoData.description
                                &&
                                <span>{detailDoctor.doctorInfoData.description}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                    <div className='content-left'>
                        <DoctorSchedule
                            doctorIdFromParent={currentDoctorId}
                        />
                    </div>
                    <div className='content-right'>
                        <DoctorExtraInfo
                            doctorIdFromParent={currentDoctorId}
                        />
                    </div>
                </div>
                <div className='detail-infor-doctor'>
                    {detailDoctor && detailDoctor.doctorInfoData && detailDoctor.doctorInfoData.contentHTML
                        &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.doctorInfoData.contentHTML }}></div>
                    }
                </div>
            </div >
        </Layout>
    )
}

export default DetailDoctor