const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home'
    },
    {
        title: '新闻管理',
        key: '/news',
        icon: 'file-text',
        children: [
            {
                title: '新闻总览',
                key: '/news/home',
            }
        ]
    },
    {
        title: '广告管理',
        key: '/adv',
        icon: 'appstore',
        children: [
            {
                title: '广告总览',
                key: '/adv/home',
            }
        ]
    },
    {
        title: '视频管理',
        key: '/video',
        icon: 'video-camera',
        children: [
            {
                title: '所有视频',
                key: '/video/home',
            }
        ]
    },
    {
        title: '用户',
        key: '/user',
        icon: 'user'
    },
];
export default menuList;