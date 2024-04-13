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
import { editSpecialty } from '../../../../redux/actions/adminActions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalManageSpecialty = (props) => {
    const defaultValue = {
        name: '',
        image: '',
        descriptionMarkdown: '',
        descriptionHTML: ''
    }
    const [specialtyInfo, setSpecialtyInfo] = useState(defaultValue);
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const language = useSelector(state => state.app.language);
    const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
    const [specialtyEditId, setSpecialtyEditId] = useState("");
    const dispatch = useDispatch();

    const handleEditorChange = ({ html, text }) => {
        setSpecialtyInfo({ ...specialtyInfo, descriptionHTML: html, descriptionMarkdown: text })
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
        setSpecialtyInfo(defaultValue);
        setAction(CRUD_ACTIONS.CREATE)
        setPreviewImageUrl("")
        props.closeModal()
    }

    const checkValidateInput = () => {
        if (!specialtyInfo.name) {
            message.error(language === LANGUAGES.EN ?
                `Please enter specialty's name`
                : 'Vui lòng nhập tên của chuyên khoa'
            )
            return false;
        }
        else if (!specialtyInfo.image) {
            message.error(language === LANGUAGES.EN ?
                `Please upload specialty's image`
                : 'Vui lòng tải lên hình ảnh của chuyên khoa'
            )
            return false;
        }
        else if (!specialtyInfo.descriptionMarkdown) {
            message.error(language === LANGUAGES.EN ?
                `Please enter specialty's describe`
                : 'Vui lòng nhập mô tả của chuyên khoa'
            )
            return false;
        }
        return true;
    }

    useEffect(() => {
        emitter.on("EditSpecialty", (specialty) => {
            handleEditSpecialty(specialty)
        })
    }, [])

    const handleEditSpecialty = (specialty) => {
        setSpecialtyInfo({
            ...specialtyInfo,
            name: specialty.name,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            image: specialty.image
        })
        setPreviewImageUrl(specialty.image);
        setAction(CRUD_ACTIONS.EDIT);
        setSpecialtyEditId(specialty.id)
        props.setOpenModal(true);
    }

    const handleSaveSpecialty = async () => {
        let isValid = checkValidateInput()
        if (isValid === false) {
            return;
        }
        if (action === CRUD_ACTIONS.CREATE) {
            props.handleCreateNewSpecialty({ ...specialtyInfo })
            resetValue()
        }
        if (action === CRUD_ACTIONS.EDIT) {
            dispatch(editSpecialty({
                id: specialtyEditId,
                name: specialtyInfo.name,
                descriptionHTML: specialtyInfo.descriptionHTML,
                descriptionMarkdown: specialtyInfo.descriptionMarkdown,
                image: specialtyInfo.image
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
            setSpecialtyInfo({ ...specialtyInfo, image: base64 });
        }
    }

    return (
        <Modal
            title={action === CRUD_ACTIONS.CREATE ? <FormattedMessage id='manage-specialty.add' />
                : <FormattedMessage id='manage-specialty.edit' />}
            open={props.open}
            width={'80rem'}
            centered
            onOk={() => handleSaveSpecialty()}
            onCancel={() => resetValue()}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id='manage-specialty.specialty-name' /></label>
                        <Input
                            value={specialtyInfo.name}
                            onChange={(event) => setSpecialtyInfo({ ...specialtyInfo, name: event.target.value })}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Row>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id='manage-specialty.specialty-image' /></label>
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
                        value={specialtyInfo.descriptionMarkdown}
                    />
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalManageSpecialty