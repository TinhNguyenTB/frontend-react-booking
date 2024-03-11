import { useNavigate } from 'react-router-dom'
import './Specialty.scss'
import { useEffect, useState } from 'react';
import { getAllSpecialty } from '../../../services/userService';

const Specialty = () => {
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
        <div>Specialty</div>

    )
}

export default Specialty