import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { Select, DatePicker, message, Button, Flex, Typography, Col, Row } from 'antd'
import { LANGUAGES } from '../../../../utils/constant';
import { saveBulkScheduleDoctor } from '../../../../services/adminService';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctor, fetchAllScheduleTime } from '../../../../redux/actions/adminActions';

const ManageSchedule = () => {

    const [listDoctors, setListDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [currentDate, setCurrentDate] = useState("");
    const [rangeTime, setRangeTime] = useState([]);
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const allDoctors = useSelector(state => state.admin.allDoctors);
    const allScheduleTime = useSelector(state => state.admin.allScheduleTime);

    useEffect(() => {
        dispatch(fetchAllDoctor());
        dispatch(fetchAllScheduleTime());
    }, [])

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors)
        setListDoctors(dataSelect);
    }, [allDoctors])

    useEffect(() => {
        let data = allScheduleTime;
        if (data && data.length > 0) {
            data.map(item => {
                item.isSeleted = false;
                return item;
            })
        }
        setRangeTime(data)
    }, [allScheduleTime])

    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }

    const handleChangeSelect = (selectedOption) => {
        setSelectedDoctor(selectedOption)
    }

    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            const updatedRangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    return { ...item, isSeleted: !item.isSeleted };
                }
                return item;
            });
            setRangeTime(updatedRangeTime);
        }
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0])
    }

    const handleSaveSchedule = async () => {
        let result = [];
        if (!currentDate) {
            message.error("Invalid selected date!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            message.error("Invalid selected doctor!")
            return;
        }
        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSeleted === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.timeType = item.keyMap;
                    object.date = formatedDate;
                    result.push(object);
                })
            }
            else {
                message.error("Invalid selected time!")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        });
        if (res && res.errCode === 0) {
            message.success("Save Schedule Doctor successfully!");
        }
        else {
            message.error("Error save Bulk Schedule Doctor!");
            console.log("Error saveBulkScheduleDoctor:", res)
        }
    }

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
        <Flex vertical style={{ margin: '1rem 2rem' }}>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>
                <FormattedMessage id="manage-schedule.title" />
            </Typography.Title>

            <Row gutter={[20, 20]} style={{ margin: '1rem 0' }}>
                <Col span={12}>
                    <Flex vertical gap={'0.5rem'}>
                        <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctors}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex vertical gap={'0.5rem'}>
                        <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                        <DatePicker
                            onChange={handleOnChangeDatePicker}
                            value={currentDate}
                            minDate={yesterday}
                        />
                    </Flex>
                </Col>
            </Row>
            <Row style={{ marginBottom: '1rem' }}>
                <Col span={24}>
                    <Typography.Paragraph style={{ marginLeft: '0.6rem', marginBottom: '0.5rem' }}>
                        <FormattedMessage id="manage-schedule.choose-time" />
                    </Typography.Paragraph>
                    {rangeTime && rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                            return (
                                <Button
                                    onClick={() => handleClickBtnTime(item)}
                                    type={item.isSeleted === true ? 'primary' : 'default'}
                                    key={`btn-schedule-${index}`}
                                    style={{ marginLeft: '0.6rem' }}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </Button>
                            )
                        })
                    }

                </Col>
            </Row>
            <div>
                <Button style={{ marginLeft: '0.6rem' }}
                    onClick={() => handleSaveSchedule()}
                >
                    <FormattedMessage id="manage-schedule.save" />
                </Button>
            </div>
        </Flex>
    )
}

export default ManageSchedule