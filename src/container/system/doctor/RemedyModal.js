import { Avatar, Flex, Image, Col, Row, Input, Modal, message } from 'antd'
import CommonUtils from '../../../utils/CommonUtils'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';

const RemedyModal = (props) => {
    const [email, setEmail] = useState("");
    const [imgBase64, setImgBase64] = useState("");

    useEffect(() => {
        if (props.data) {
            setEmail(props.data.email)
        }
    }, [props.data])

    const handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            setImgBase64(base64)
        }
    }

    const handleSendRemedy = () => {
        props.sendRemedy(email, imgBase64)
    }

    return (
        <Modal
            title={<FormattedMessage id='menu.doctor.remedy-title' />}
            open={props.isOpen}
            width={'60rem'}
            onOk={() => handleSendRemedy()}
            onCancel={() => props.closeModal()}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id='menu.doctor.remedy-email' /></label>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex vertical gap={5}>
                        <label><FormattedMessage id='menu.doctor.remedy-bills' /></label>
                        <input type='file'
                            onChange={(event) => handleOnChangeImage(event)}
                        />
                    </Flex>
                </Col>
            </Row>

        </Modal>
    )
}

export default RemedyModal