import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import Layout from '../../layout/Layout';
import DoctorExtraInfo from '../DetailDoctor/DoctorExtraInfo';
import DoctorSchedule from '../DetailDoctor/DoctorSchedule';
import ProfileDoctor from '../DetailDoctor/ProfileDoctor';
import { useParams } from 'react-router-dom';
import './DetailClinic.scss'
import { getDetailClinicById } from '../../../../services/appService';

const DetailClinic = () => {
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailClinic, setDataDetailClinic] = useState({});
    const { id } = useParams();

    const fetchData = async () => {
        if (id) {
            let res = await getDetailClinicById({ id: id });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.Doctor_Infors;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                    setDataDetailClinic(res.data)
                    setArrDoctorId(arrDoctorId)
                }
            }
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <div className='detail-clinic-container'>
                <div className='detail-clinic-body'>
                    <div className='description-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div className='clinic-name'>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} ></div>
                            </>
                        }
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={`doctor-${index}`}>
                                    <div className='detail-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className='detail-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default DetailClinic