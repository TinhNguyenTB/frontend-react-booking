import { Row, Col, Typography, Flex } from "antd"
import { PushpinOutlined, CheckSquareOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import './HomeFooter.scss';
import logo from '../../../assets/logo.svg'
import hellodoctor from '../../../assets/hellodoctorlogo.png'
import bernard from '../../../assets/logo-bernard.png'
import doctorcheck from '../../../assets/doctor-check.png'
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
    const navigate = useNavigate();

    const returnToHome = () => {
        navigate('/');
    }
    return (
        <Row justify='space-between' className="home-footer-container">
            <Col xs={24} sm={24} md={24} xl={8} className="footer-column">
                <Typography.Title level={5} className="footer-title">
                    Công ty Cổ phần Công nghệ BookingCare
                </Typography.Title>
                <Flex gap="0.5rem" vertical>
                    <div>
                        <PushpinOutlined className="child-icon" />
                        <Typography.Text>
                            Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                        </Typography.Text>
                    </div>
                    <div>
                        <CheckSquareOutlined className="child-icon" />
                        <Typography.Text>ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</Typography.Text>
                    </div>
                    <div>
                        <PhoneOutlined className="child-icon" />
                        <Typography.Text>024-7301-2468 (7h30 - 18h)</Typography.Text>
                    </div>
                    <div>
                        <MailOutlined className="child-icon" />
                        <Typography.Text>support@bookingcare.vn (7h30 - 18h)</Typography.Text>
                    </div>
                </Flex>
                <Typography.Title level={5} className="footer-title">
                    Văn phòng tại TP Hồ Chí Minh
                </Typography.Title>
                <PushpinOutlined className="child-icon" />
                <Typography.Text>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</Typography.Text>
            </Col>
            <Col xs={24} sm={24} md={24} xl={8} className="footer-column footer-column2">
                <div>
                    <img src={logo} className="footer-logo" onClick={() => returnToHome()} alt="logo" />
                </div>
                <Flex vertical gap="0.25rem">
                    <Typography.Link href="#" className="footer-link">Tuyển dụng</Typography.Link>
                    <Typography.Link href="#" className="footer-link">Chính sách bảo mật</Typography.Link>
                    <Typography.Link href="#" className="footer-link">Quy chế hoạt động</Typography.Link>
                    <Typography.Link href="#" className="footer-link">Điều khoản sử dụng</Typography.Link>
                    <Typography.Link href="#" className="footer-link">Câu hỏi thường gặp</Typography.Link>
                </Flex>

            </Col>
            <Col xs={24} sm={24} md={24} xl={8} className="footer-column">
                <Typography.Title level={5} className="footer-title">
                    Đối tác bảo trợ nội dung
                </Typography.Title>
                <Flex align='center'>
                    <img src={hellodoctor} className="image-footer" alt="hellodoctor" />
                    <div>
                        <Typography.Title level={5} className="footer-title child">
                            Hello Doctor
                        </Typography.Title>
                        <Typography.Text>
                            Bảo trợ chuyên mục nội dung "sức khỏa tinh thần"
                        </Typography.Text>
                    </div>
                </Flex>
                <Flex align='center'>
                    <img src={bernard} className="image-footer" alt="bernard" />
                    <div>
                        <Typography.Title level={5} className="footer-title child">
                            Hệ thống y khoa chuyên sâu quốc tế Bernard
                        </Typography.Title>
                        <Typography.Text>
                            Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"
                        </Typography.Text>
                    </div>
                </Flex>
                <Flex align='center'>
                    <img src={doctorcheck} className="image-footer" alt="doctorcheck" />
                    <div>
                        <Typography.Title level={5} className="footer-title child">
                            Doctor Check - Tầm soát bệnh để sống thọ hơn
                        </Typography.Title>
                        <Typography.Text>
                            Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"
                        </Typography.Text>
                    </div>
                </Flex>
            </Col>
        </Row>
    )
}

export default HomeFooter