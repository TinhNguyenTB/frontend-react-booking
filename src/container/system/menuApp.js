import { NavLink } from "react-router-dom";
export const adminMenu = [
    {
        label: 'menu.admin.manage-user',
        children: [
            {
                label: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                label: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                label: 'menu.admin.manage-doctor', link: '/system/manage-doctor'

            },
            { // Quản lý kế hoạch khám bệnh của bác sĩ
                label: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    { // Quản lý phòng khám
        label: 'menu.admin.clinic',
        children: [
            {
                label: 'menu.admin.manage-clinic', link: '/system/manage-clinic'

            },
        ]
    },
    { // Quản lý chuyên khoa
        label: 'menu.admin.specialty',
        children: [
            {
                label: 'menu.admin.manage-specialty', link: '/system/manage-specialty'

            },
        ]
    },
    { // Quản lý cẩm nang
        label: 'menu.admin.handbook',
        children: [
            {
                label: 'menu.admin.manage-handbook', link: '/system/manage-handbook'

            },
        ]
    },
];

export const doctorMenu = [
    {
        label: "menu.admin.manage-user",
        children: [
            {
                label: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            }
        ]
    }
];