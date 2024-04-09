import { Typography, Flex, Image } from 'antd';
import Layout from '../home/layout/Layout';
import { FormattedMessage } from 'react-intl';
import imageAbout from '../../assets/bookingcare-about.jpg'

const About = () => {
    return (
        <Layout>
            <Flex vertical style={{ margin: '1rem 7rem' }}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    <FormattedMessage id='about.title' />
                </Typography.Title>
                <Typography.Paragraph strong>
                    Hiện nay, người bệnh đi khám theo cách truyền thống có thể phải mất đến 3-4 giờ đồng hồ để xếp hàng làm thủ tục,
                    đợi đến lượt khám của mình và phía các bệnh viện, vẫn chưa có một giải pháp thực sự hiệu quả giúp phân bổ nguồn nhân lực,
                    vật lực, thời gian để giải quyết được vấn đề quá tải bệnh nhân.
                </Typography.Paragraph>
                <Typography.Paragraph strong>
                    Một phép giải cho 2 bài toán
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Trong lĩnh vực chăm sóc sức khỏe đã có nhiều giải pháp để hỗ trợ người bệnh theo các hướng khác nhau.
                    Có ứng dụng cung cấp thông tin để người bệnh tham khảo; có nơi tập trung vào mảng bác sĩ gia đình;
                    đưa ra giải pháp về xét nghiệm tại nhà; và có cả nền tảng giúp người bệnh hỏi đáp bác sĩ.
                    Tuy nhiên, đó chưa phải là những giải pháp giúp người bệnh dễ dàng tiếp cận với việc đi khám
                    và giải quyết được vấn đề quá tải tại các bệnh viện.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    BookingCare là nền tảng tập trung vào việc đặt khám chuyên khoa, kết nối bệnh nhân với bác sĩ,
                    cơ sở y tế và giúp trải nghiệm đi khám của người bệnh được tốt hơn, hiệu quả hơn.
                    Đồng thời, góp phần giải quyết vấn đề quá tải của các bệnh viện hiện nay.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Nền tảng này được xây dựng đơn giản, dễ sử dụng, phản ánh hành trình đi khám thực tế của người bệnh.
                    Tập trung vào nhóm bệnh chuyên khoa, không có tính chất cấp cứu, bệnh mãn tính,
                    những người biết rõ tình trạng bệnh của mình và chủ động sắp xếp kế hoạch đi khám.
                </Typography.Paragraph>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                        src={imageAbout}
                        width={'68%'}
                    />
                    <div style={{ margin: '0.5rem', padding: '0.5rem', backgroundColor: '#eee', width: 'fit-content' }}>
                        Bệnh nhân phải xếp hàng chờ khám và bệnh viên quá tải là thực trạng chung hiện nay của nhiều bệnh viện (Ảnh minh họa: BookingCare)
                    </div>
                </div>
                <Typography.Paragraph>
                    Chỉ bằng 3 bước, với một vài click chuột, người dùng đã có thể chọn bác sĩ và đặt lịch khám phù hợp nhờ nền tảng thông tin về bác sĩ
                    (bao gồm: Chuyên môn, quá trình đào tạo, công tác…) và bệnh viện, phòng khám rõ ràng, cập nhật, minh bạch.
                    Qua đó, người bệnh dễ dàng hiểu được rằng, với vấn đề sức khỏe của mình thì nên đi khám với bác sĩ nào,
                    khám ở chuyên khoa nào, bệnh viện nào cho phù hợp.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Qua các bài cẩm nang, nội dung chia sẻ, thông tin bác sĩ và cơ sở y tế được BookingCare cung cấp, người bệnh có thể kiểm tra xem vấn đề của mình có đúng,
                    phù hợp với những thông tin họ tìm được hay không để xem thêm lịch khám của bác sĩ, địa điểm khám, các chi phí khám và giá dịch vụ liên quan,
                    các loại bảo hiểm có thể được áp dụng, những hướng dẫn và chuẩn bị khác nhằm tiến hành đặt lịch. Từ đó, quá trình đi khám của người bệnh được hỗ trợ,
                    hiệu quả hơn so với cách đi khám truyền thống, tiết kiệm thời gian, chi phí, giúp cho người bệnh gặp được bác sĩ và phương pháp phù hợp với tình hình bệnh tật của mình.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Cụ thể, người bệnh đi khám theo cách truyền thống có thể phải đến xếp hàng ở bệnh viện từ 5, 6 giờ sáng để có lượt vào khoảng 9, 10 giờ sáng cùng ngày.
                    Tuy nhiên, qua BookingCare, người bệnh chỉ phải đến nơi khám trước khoảng 15-30 phút. Tức là việc đi khám có kế hoạch hơn,
                    giảm thiểu thời gian chờ khám lên đến hàng tiếng đồng hồ và nắm được chính xác được thông tin của bác sĩ. Ngoài ra, người bệnh sẽ có sự chuẩn bị đầy đủ,
                    kĩ lưỡng trước khi đi khám để việc khám có thể hiệu quả hơn. Đồng thời, nền tảng BookingCare cung cấp công cụ,
                    giải pháp công nghệ để giúp bệnh viện tối ưu được thời gian làm việc của bác sĩ, phân bố nguồn nhân lực và vật lực (thiết bị, công cụ y tế) được hiệu quả hơn.
                </Typography.Paragraph>
            </Flex>
        </Layout>
    )
}

export default About;