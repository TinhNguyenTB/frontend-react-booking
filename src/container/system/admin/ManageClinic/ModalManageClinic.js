import { useSelector } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../../utils/CommonUtils';
import { useEffect, useState } from 'react';
import { LANGUAGES, CRUD_ACTIONS } from '../../../../utils/constant';
import { Avatar, Flex, Image, Col, Row, Input, Modal, message } from 'antd'
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { emitter } from '../../../../utils/emitter';
import { useDispatch } from 'react-redux';
import { editClinic } from '../../../../redux/actions/adminActions.js'

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalManageClinic = (props) => {
    const defaultValue = {
        name: '',
        image: '',
        descriptionMarkdown: '',
        descriptionHTML: '',
        address: ''
    }
    const [clinicInfo, setClinicInfo] = useState(defaultValue);
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const language = useSelector(state => state.app.language);
    const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
    const [clinicEditId, setClinicEditId] = useState("");
    const dispatch = useDispatch();

    const handleEditorChange = ({ html, text }) => {
        setClinicInfo({ ...clinicInfo, descriptionHTML: html, descriptionMarkdown: text })
    }

    const openPreviewImage = () => {
        if (!previewImageUrl) {
            return
        }
        else {
            setIsOpenPreviewImg(true)
        }
    }

    const resetValue = () => {
        setClinicInfo(defaultValue);
        setAction(CRUD_ACTIONS.CREATE)
        setPreviewImageUrl("")
        props.closeModal()
    }

    const checkValidateInput = () => {
        if (!clinicInfo.name) {
            message.error(language === LANGUAGES.EN ?
                `Please enter clinic's name`
                : 'Vui lòng nhập tên của phòng khám'
            )
            return false;
        }
        else if (!clinicInfo.address) {
            message.error(language === LANGUAGES.EN ?
                `Please enter clinic's address`
                : 'Vui lòng nhập địa chỉ của phòng khám'
            )
            return false;
        }
        else if (!clinicInfo.image) {
            message.error(language === LANGUAGES.EN ?
                `Please upload clinic's image`
                : 'Vui lòng tải lên hình ảnh của phòng khám'
            )
            return false;
        }
        else if (!clinicInfo.descriptionMarkdown) {
            message.error(language === LANGUAGES.EN ?
                `Please enter clinic's describe`
                : 'Vui lòng nhập mô tả của phòng khám'
            )
            return false;
        }
        return true;
    }

    useEffect(() => {
        emitter.on("EditClinic", (clinic) => {
            handleEditClinic(clinic)
        })
    }, [])

    const handleEditClinic = (clinic) => {
        setClinicInfo({
            ...clinicInfo,
            name: clinic.name,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            image: clinic.image
        })
        setPreviewImageUrl(clinic.image);
        setAction(CRUD_ACTIONS.EDIT);
        setClinicEditId(clinic.id)
        props.setOpenModal(true);
    }

    const handleSaveClinic = async () => {
        let isValid = checkValidateInput()
        if (isValid === false) {
            return;
        }
        if (action === CRUD_ACTIONS.CREATE) {
            props.handleCreateNewClinic({ ...clinicInfo })
            resetValue()
        }
        if (action === CRUD_ACTIONS.EDIT) {
            dispatch(editClinic({
                id: clinicEditId,
                name: clinicInfo.name,
                descriptionHTML: clinicInfo.descriptionHTML,
                descriptionMarkdown: clinicInfo.descriptionMarkdown,
                address: clinicInfo.address,
                image: clinicInfo.image
            }))
            resetValue()
        }
    }

    const handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setPreviewImageUrl(objectUrl)
            setClinicInfo({ ...clinicInfo, image: base64 });
        }
    }

    return (
        <Modal
            title={action === CRUD_ACTIONS.CREATE ? <FormattedMessage id='manage-clinic.add' /> : <FormattedMessage id='manage-clinic.edit' />}
            open={props.open}
            width={'80rem'}
            centered
            onOk={() => handleSaveClinic()}
            onCancel={() => resetValue()}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id='manage-clinic.clinic-name' /></label>
                        <Input
                            value={clinicInfo.name}
                            onChange={(event) => setClinicInfo({ ...clinicInfo, name: event.target.value })}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id='manage-clinic.clinic-address' /></label>
                        <Input
                            value={clinicInfo.address}
                            onChange={(event) => setClinicInfo({ ...clinicInfo, address: event.target.value })}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Row>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id='manage-clinic.clinic-logo' /></label>
                            <input id='previewImg' type='file' hidden
                                onChange={(event) => handleOnChangeImage(event)}
                            />
                            <label className='label-upload' htmlFor='previewImg'
                                style={{ backgroundColor: '#eee', textAlign: 'center' }}>
                                <FormattedMessage id="manage-user.upload" /> <FontAwesomeIcon icon="fa-solid fa-upload" />
                            </label>
                        </Flex>
                        <Avatar
                            shape="square" style={{ marginLeft: '1rem' }}
                            size={100}
                            src={<img src={previewImageUrl} alt="avatar" />}
                            onClick={() => openPreviewImage()}
                        />
                        {isOpenPreviewImg && (
                            <Image
                                wrapperStyle={{
                                    display: 'none'
                                }}
                                preview={{
                                    visible: isOpenPreviewImg,
                                    onVisibleChange: (visible) => setIsOpenPreviewImg(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImageUrl(''),
                                }}
                                src={previewImageUrl}
                            />
                        )}
                    </Row>
                </Col>
                <Col span={24}>
                    <FormattedMessage id='admin.manage-doctor.describe' />
                    <MdEditor
                        style={{ height: '20rem' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={clinicInfo.descriptionMarkdown}
                    />
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalManageClinic