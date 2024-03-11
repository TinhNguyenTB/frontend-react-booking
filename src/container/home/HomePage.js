import './HomePage.scss'
import HomeBanner from "./banner/HomeBanner"
import Layout from "./layout/Layout"
import Specialty from "./session/Specialty"

const HomePage = () => {
    return (
        <Layout>
            <HomeBanner />
            <Specialty />
        </Layout>
    )
}

export default HomePage