import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils/constant';
import { getAllCodeService, getDetailSpecialtyById } from '../../../../services/appService';
import DoctorExtraInfo from '../DetailDoctor/DoctorExtraInfo';
import DoctorSchedule from '../DetailDoctor/DoctorSchedule';
import ProfileDoctor from '../DetailDoctor/ProfileDoctor';
import './DetailSpecialty.scss'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DetailSpecialty = (props) => {
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});
    const [listProvince, setListProvince] = useState([]);
    const { id } = useParams();
    let language = useSelector(state => state.app.language)

    const fetchData = async () => {
        if (id) {
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc'
                    })
                }
                setDataDetailSpecialty(res.data);
                setArrDoctorId(arrDoctorId);
                setListProvince(dataProvince ? dataProvince : [])
            }
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [id])

    const handleOnChangeSelect = async (event) => {
        let location = event.target.value;

        let res = await getDetailSpecialtyById({
            id: id,
            location: location
        })
        if (res && res.errCode === 0) {
            let data = res.data;
            let arrDoctorId = []
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            setDataDetailSpecialty(res.data);
            setArrDoctorId(arrDoctorId);
        }
    }

    return (
        <Layout>
            <div className='detail-specialty-container'>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }} ></div>
                        }
                    </div>
                    <div className='search-doctor'>
                        <select onChange={(event) => handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0
                                && listProvince.map((item, index) => {
                                    return (
                                        <option value={item.keyMap} key={`province-${index}`}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
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

export default DetailSpecialty