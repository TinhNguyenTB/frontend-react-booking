import { Carousel, Col, Row } from 'antd'
import './HomeBanner.scss'

const HomeBanner = () => {
    return (
        <div>
            <Row justify='center' style={{ marginTop: '1rem' }}>
                <Col xs={24} sm={24} md={20} xl={16}>
                    <Carousel
                        autoplay
                        autoplaySpeed={4000}
                        effect='fade'
                    >
                        <div className='banner banner1'>
                        </div>
                        <div className='banner banner2'>
                        </div>
                        <div className='banner banner4' >
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </div>
    )
}

export default HomeBanner