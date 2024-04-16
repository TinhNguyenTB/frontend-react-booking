import { FormattedMessage } from 'react-intl';

export const adminMenu = [
    {
        label: <FormattedMessage id='menu.admin.manage-user' />,
        children: [
            {
                label: <FormattedMessage id='menu.admin.account' />, key: '/system/manage-user'
            },
            {
                label: <FormattedMessage id='menu.admin.manage-doctor' />, key: '/system/manage-doctor'
            },

        ]
    },
    {
        // Quản lý kế hoạch khám bệnh của bác sĩ
        label: <FormattedMessage id='menu.admin.manage-schedule' />, key: '/system/manage-schedule'
    },
    {   // Quản lý phòng khám
        label: <FormattedMessage id='menu.admin.clinic' />, key: '/system/manage-clinic'
    },
    { // Quản lý chuyên khoa
        label: <FormattedMessage id='menu.admin.specialty' />, key: '/system/manage-specialty'
    }
];

export const doctorMenu = [
    {
        label: <FormattedMessage id='menu.doctor.manage-appointment' />, key: '/system/manage-appointment'
    }
];