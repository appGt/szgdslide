const menuList = [
    {
        title: '首页',
        key: '/admin/home',
        icon: 'home'
    },
    {
        title: '新闻管理',
        key: '/admin/news',
        icon: 'file-text',
        children: [
            {
                title: '新闻总览',
                key: '/admin/news/list',
            },
            {
                title: '发布新闻',
                key: '/admin/news/edit/',
            },
        ]
    },
    {
        title: '广告管理',
        key: '/admin/adv',
        icon: 'appstore',
        // children: [
        //     {
        //         title: '广告总览',
        //         key: '/adv/index',
        //     }
        // ]
    },
    {
        title: '视频管理',
        key: '/admin/video',
        icon: 'video-camera',
        // children: [
        //     {
        //         title: '所有视频',
        //         key: '/video/index',
        //     }
        // ]
    },
    {
        title: '用户',
        key: '/admin/user',
        icon: 'user'
    },
    {
        title: '社区管理',
        key: '/admin/bbs',
        icon: 'team'
    },
    {
        title: '商品管理',
        key: '/admin/goods',
        icon: 'shopping'
    },
    {
        title: '订单管理',
        key: '/admin/order',
        icon: 'file-text'
    },
];
export default menuList;