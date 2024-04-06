import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { LANGUAGES, CRUD_ACTIONS } from '../../../../utils/constant';
import { getDetailInfoDoctor, saveDetailDoctorService } from '../../../../services/adminService';
import { getRequiredDoctorInfo, fetchAllDoctor } from '../../../../redux/actions/adminActions';
import { Row, Col, Flex, Input, Select, Button, Typography, message } from 'antd';
import NumberFormat from 'react-number-format';

const ManageDoctor = () => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const dispatch = useDispatch()
    const language = useSelector(state => state.app.language)
    const allRequiredDoctorInfo = useSelector(state => state.admin.allRequiredDoctorInfo)
    const allDoctors = useSelector(state => state.admin.allDoctors)

    const defaultMarkdown = {
        contentHTML: '',
        contentMarkdown: '',
        description: '',
    }
    const [markdown, setMarkdown] = useState(defaultMarkdown);
    const defaultInfoDoctor = {
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedClinic: '',
        selectedSpecialty: '',
        note: '',
    }
    const [infoDoctor, setInfoDoctor] = useState(defaultInfoDoctor);
    const [hasOldData, setHasOldData] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [listDoctors, setListDoctors] = useState([]);
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listClinic, setListClinic] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'DOCTOR') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            else if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            else if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            else if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            else if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result;
    }

    useEffect(() => {
        dispatch(fetchAllDoctor())
        dispatch(getRequiredDoctorInfo())
    }, [])

    useEffect(() => {
        let dataSelectDoctor = buildDataInputSelect(allDoctors, 'DOCTOR')
        setListDoctors(dataSelectDoctor)
    }, [allDoctors])

    useEffect(() => {
        let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = allRequiredDoctorInfo
        let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE')
        let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT')
        let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE')
        let dataSelectSpecialty = buildDataInputSelect(resSpecialty, 'SPECIALTY')
        let dataSelectClinic = buildDataInputSelect(resClinic, 'CLINIC')
        setListPrice(dataSelectPrice);
        setListPayment(dataSelectPayment);
        setListProvince(dataSelectProvince);
        setListSpecialty(dataSelectSpecialty);
        setListClinic(dataSelectClinic);
    }, [allRequiredDoctorInfo])

    useEffect(() => {
        let dataSelectDoctor = buildDataInputSelect(allDoctors, 'DOCTOR')
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfo
        let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE')
        let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT')
        let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE')
        setListDoctors(dataSelectDoctor)
        setListPrice(dataSelectPrice);
        setListPayment(dataSelectPayment);
        setListProvince(dataSelectProvince);
    }, [language])

    const handleEditorChange = ({ html, text }) => {
        setMarkdown({ ...markdown, contentHTML: html, contentMarkdown: text })
    }

    const handleSaveContentMarkdown = async () => {
        let res = await saveDetailDoctorService({
            contentHTML: markdown.contentHTML,
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description,
            doctorId: selectedDoctor,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: infoDoctor.selectedPrice,
            selectedPayment: infoDoctor.selectedPayment,
            selectedProvince: infoDoctor.selectedProvince,
            note: infoDoctor.note,
            clinicId: infoDoctor.selectedClinic && infoDoctor.selectedClinic ? infoDoctor.selectedClinic : '',
            specialtyId: infoDoctor.selectedSpecialty
        })
        if (res.errCode === 0) {
            setMarkdown(defaultMarkdown)
            setHasOldData(false);
            setInfoDoctor(defaultInfoDoctor);
            setSelectedDoctor("")
            message.success("Save detail info doctor successfully!")
        }
        else {
            message.error("Save detail info doctor failed")
        }
    }

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);
        let res = await getDetailInfoDoctor(selectedOption)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdownData = res.data.Markdown;
            let note = '',
                paymentId = '', priceId = '', provinceId = '',
                Payment = '', Price = '', Province = '',
                Specialty = '', specialtyId = '',
                Clinic = '', clinicId = ''

            if (res.data.Doctor_Infor) {

                note = res.data.Doctor_Infor.note
                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId
                specialtyId = res.data.Doctor_Infor.specialtyId
                clinicId = res.data.Doctor_Infor.clinicId


                Payment = listPayment.find(item => item.value === paymentId);
                Price = listPrice.find(item => item.value === priceId);
                Province = listProvince.find(item => item.value === provinceId);
                Specialty = listSpecialty.find(item => item.value === specialtyId);
                Clinic = listClinic.find(item => item.value === clinicId)

            }
            setMarkdown({
                ...markdown,
                contentHTML: markdownData.contentHTML,
                contentMarkdown: markdownData.contentMarkdown,
                description: markdownData.description
            })
            setHasOldData(true)
            setInfoDoctor({
                ...infoDoctor, note: note,
                selectedPayment: Payment.value,
                selectedPrice: Price.value,
                selectedProvince: Province.value,
                selectedSpecialty: Specialty.value,
                selectedClinic: Clinic.value
            })
        } else {
            setMarkdown(defaultMarkdown)
            setHasOldData(false);
            setInfoDoctor(defaultInfoDoctor);
        }
    }

    const handleSelectPrice = (selectedOption) => {
        setInfoDoctor({ ...infoDoctor, selectedPrice: selectedOption })
    }

    const handleSelectPayment = (selectedOption) => {
        setInfoDoctor({ ...infoDoctor, selectedPayment: selectedOption })
    }

    const handleSelectProvince = (selectedOption) => {
        setInfoDoctor({ ...infoDoctor, selectedProvince: selectedOption })
    }

    const handleSelectSpecialty = (selectedOption) => {
        setInfoDoctor({ ...infoDoctor, selectedSpecialty: selectedOption })
    }

    const handleSelectClinic = (selectedOption) => {
        setInfoDoctor({ ...infoDoctor, selectedClinic: selectedOption })
    }

    return (
        <div style={{ margin: '1rem 2rem' }}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                <FormattedMessage id="admin.manage-doctor.title" />
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctors}
                        />
                    </Flex>
                </Col>
                <Col span={16}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <Input.TextArea
                            onChange={(event) => setMarkdown({ ...markdown, description: event.target.value })}
                            value={markdown.description}
                        >
                        </Input.TextArea>
                    </Flex>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={infoDoctor.selectedPrice}
                            onChange={handleSelectPrice}
                            options={listPrice}
                        />
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={infoDoctor.selectedPayment}
                            onChange={handleSelectPayment}
                            options={listPayment}
                        />
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={infoDoctor.selectedProvince}
                            onChange={handleSelectProvince}
                            options={listProvince}
                        />
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <Input className='form-control'
                            onChange={(event) => setInfoDoctor({ ...infoDoctor, note: event.target.value })}
                            value={infoDoctor.note}
                        />
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={infoDoctor.selectedSpecialty}
                            onChange={handleSelectSpecialty}
                            options={listSpecialty}
                        />
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <Select
                            value={infoDoctor.selectedClinic}
                            onChange={handleSelectClinic}
                            options={listClinic}
                        />
                    </Flex>
                </Col>
            </Row>
            <div style={{ margin: '1rem 0' }}>
                <Typography >
                    <FormattedMessage id="admin.manage-doctor.describe" />
                </Typography>
                <MdEditor
                    style={{ height: '15rem' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={markdown.contentMarkdown}
                />
            </div>
            <Button
                onClick={() => handleSaveContentMarkdown()}
                type='primary'
            >
                {hasOldData === true ?
                    <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                    :
                    <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
            </Button>
        </div>
    )
}

export default ManageDoctor