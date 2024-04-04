import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import {
    fetchPositions, fetchGenders, fetchRoles,
    createNewUser, editUser
} from '../../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES } from '../../../../utils/constant';
import CommonUtils from '../../../../utils/CommonUtils';
import { Modal, Row, Col, Flex, Input, Select, Image, message } from 'antd';
import "./ManageUser.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { emitter } from '../../../../utils/emitter';


const ModalManageUser = (props) => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language)
    const genders = useSelector(state => state.admin.genders)
    const roles = useSelector(state => state.admin.roles)
    const positions = useSelector(state => state.admin.positions)
    const listUser = useSelector(state => state.admin.listUser)

    const defaultValue = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: ""
    }
    const [userInfo, setUserInfo] = useState(defaultValue);

    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [action, setAction] = useState("");
    const [userEditId, setUserEditId] = useState("");

    useEffect(() => {
        dispatch(fetchGenders())
        dispatch(fetchPositions())
        dispatch(fetchRoles())
        setUserInfo({ ...userInfo, position: positions.length > 0 ? positions[0].keyMap : '' })
        setUserInfo({ ...userInfo, gender: genders.length > 0 ? genders[0].keyMap : '' })
        setUserInfo({ ...userInfo, role: roles.length > 0 ? roles[0].keyMap : '' })
    }, [])

    useEffect(() => {
        setUserInfo(defaultValue);
        setAction(CRUD_ACTIONS.CREATE)
        setPreviewImageUrl("")
        setUserInfo({ ...userInfo, position: positions.length > 0 ? positions[0].keyMap : '' })
        setUserInfo({ ...userInfo, gender: genders.length > 0 ? genders[0].keyMap : '' })
        setUserInfo({ ...userInfo, role: roles.length > 0 ? roles[0].keyMap : '' })
    }, [listUser])

    useEffect(() => {
        emitter.on("EditUser", (user) => {
            handleEditUser(user)
        })
    }, [])

    const handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        setUserInfo({
            ...userInfo,
            email: user.email,
            password: 'password',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: ''
        })
        setPreviewImageUrl(imageBase64);
        setAction(CRUD_ACTIONS.EDIT);
        setUserEditId(user.id)
        props.setIsOpenModal(true);
    }

    const checkValidateInput = () => {
        let isValid = true
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address", "gender", "position", "role"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!userInfo[arrCheck[i]]) {
                isValid = false;
                message.warning('Missing required params: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    const resetValue = () => {
        setUserInfo(defaultValue);
        setAction(CRUD_ACTIONS.CREATE)
        setPreviewImageUrl("")
        props.closeModal()
    }

    const handleSaveUser = () => {
        let isValid = checkValidateInput()
        if (isValid === false) {
            return
        }
        if (action === CRUD_ACTIONS.CREATE) {
            dispatch(createNewUser({  // call action from redux
                email: userInfo.email,
                password: userInfo.password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                phonenumber: userInfo.phoneNumber,
                gender: userInfo.gender,
                roleId: userInfo.role,
                positionId: userInfo.position,
                avatar: userInfo.avatar
            }))
            resetValue()
        }
        if (action === CRUD_ACTIONS.EDIT) {
            dispatch(editUser({  // call action from redux
                id: userEditId,
                email: userInfo.email,
                password: userInfo.password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                phonenumber: userInfo.phoneNumber,
                gender: userInfo.gender,
                roleId: userInfo.role,
                positionId: userInfo.position,
                avatar: userInfo.avatar
            }))
            resetValue()
        }
    }

    const handleSelectGender = (selectedOption) => {
        setUserInfo({ ...userInfo, gender: selectedOption })
    }
    const handleSelectPosition = (selectedOption) => {
        setUserInfo({ ...userInfo, position: selectedOption })
    }
    const handleSelectRole = (selectedOption) => {
        setUserInfo({ ...userInfo, role: selectedOption })
    }

    const buildDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.value = item.keyMap;
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                result.push(obj)
            })
        }
        return result;
    }

    const openPreviewImage = () => {
        if (!previewImageUrl) {
            return
        }
        else {
            setIsOpenPreviewImg(true)
        }
    }

    const onChangeInput = (event, id) => {
        let copyState = { ...userInfo }
        copyState[id] = event.target.value
        setUserInfo({ ...copyState })
    }

    const handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            setPreviewImageUrl(objectUrl)
            setUserInfo({ ...userInfo, avatar: base64 })
        }
    }

    return (
        <div>
            <Modal
                title={<FormattedMessage id={action === CRUD_ACTIONS.CREATE ? 'manage-user.add' : 'manage-user.update'} />}
                open={props.isOpenModal}
                width={'60rem'}
                centered
                onOk={() => handleSaveUser()}
                onCancel={props.closeModal}
            // okButtonProps={{disabled}}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.first-name" /></label>
                            <Input
                                value={userInfo.firstName}
                                onChange={(event) => onChangeInput(event, 'firstName')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.last-name" /></label>
                            <Input
                                value={userInfo.lastName}
                                onChange={(event) => onChangeInput(event, 'lastName')}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.email" /></label>
                            <Input
                                value={userInfo.email}
                                onChange={(event) => onChangeInput(event, 'email')}
                                disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.password" /></label>
                            <Input.Password
                                value={userInfo.password}
                                onChange={(event) => onChangeInput(event, 'password')}
                                disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.address" /></label>
                            <Input
                                value={userInfo.address}
                                onChange={(event) => onChangeInput(event, 'address')}
                            />
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.phone-number" /></label>
                            <Input
                                value={userInfo.phoneNumber}
                                onChange={(event) => onChangeInput(event, 'phoneNumber')}
                            />
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <Select
                                value={userInfo.gender}
                                onChange={handleSelectGender}
                                options={buildDataSelect(genders)}
                            />
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.position" /></label>
                            <Select
                                value={userInfo.position}
                                onChange={handleSelectPosition}
                                options={buildDataSelect(positions)}
                            />
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.role" /></label>
                            <Select
                                value={userInfo.role}
                                onChange={handleSelectRole}
                                options={buildDataSelect(roles)}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex vertical gap={5}>
                            <label><FormattedMessage id="manage-user.image" /></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => handleOnChangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'>
                                    <FormattedMessage id="manage-user.upload" /> <FontAwesomeIcon icon="fa-solid fa-upload" />
                                </label>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${previewImageUrl})` }}
                                    onClick={() => openPreviewImage()}
                                >
                                </div>
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
                            </div>
                        </Flex>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ModalManageUser