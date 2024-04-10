import { useSelector } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../../utils/CommonUtils';
import { useState } from 'react';
import { LANGUAGES } from '../../../../utils/constant';
import { Avatar, Flex, Image, Col, Row, Input, Modal, message } from 'antd'
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalAddClinic = (props) => {
    const defaultValue = {
        name: '',
        imageBase64: '',
        descriptionMarkdown: '',
        descriptionHTML: '',
        address: ''
    }
    const [clinicInfo, setClinicInfo] = useState(defaultValue);
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const language = useSelector(state => state.app.language);

    const handleEditorChange = ({ html, text }) => {
        setClinicInfo({ ...clinicInfo, descriptionHTML: html, descriptionMarkdown: text })
    }

    const handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            setPreviewImageUrl(objectUrl)
            setClinicInfo({ ...clinicInfo, imageBase64: base64 });
        }
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
        else if (!clinicInfo.descriptionMarkdown) {
            message.error(language === LANGUAGES.EN ?
                `Please enter clinic's describe`
                : 'Vui lòng nhập mô tả của phòng khám'
            )
            return false;
        }
        return true;
    }

    const handleCreate = () => {
        let isValid = checkValidateInput()
        if (isValid === false) {
            return
        }
        props.handleCreateNewClinic(clinicInfo)
        resetValue();
    }

    return (
        <Modal
            title={<FormattedMessage id='manage-clinic.add' />}
            open={props.open}
            width={'80rem'}
            centered
            onOk={() => handleCreate()}
            onCancel={props.closeModal}
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
                            <label><FormattedMessage id='manage-clinic.clinic-image' /></label>
                            <input id='previewImg' type='file' hidden
                                onChange={(event) => handleOnChangeImage(event)}
                            />
                            <label className='label-upload' htmlFor='previewImg'>
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
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={clinicInfo.descriptionMarkdown}
                    />
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalAddClinic