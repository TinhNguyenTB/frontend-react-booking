import './HomePage.scss'
import HomeBanner from "./banner/HomeBanner"
import Layout from "./layout/Layout"
import OutStandingDoctor from './session/OutStandingDoctor'
import Specialty from "./session/Specialty"
import MedicalFacility from './session/MedicalFacility'

const HomePage = () => {
    const setting = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return (
        <Layout>
            <HomeBanner />
            <Specialty settings={setting} />
            <OutStandingDoctor settings={setting} />
            <MedicalFacility settings={setting} />
        </Layout>
    )
}

export default HomePage