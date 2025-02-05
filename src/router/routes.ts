

// 常量路由
export const constanRoute: any = [
    {
        path: '/login',
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: '登录',
            hidden: true,
            icon: 'el-icon-s-platform'
        },
    },
    {
        path: '',
        name: "Layout",
        component: () => import("@/views/layout/index.vue"),
        redirect: "/home",
        meta: {
            title: '',
            hidden: true,
            icon: 'el-icon-s-platform'
        },
        children: [
            {
                path: '/home',
                name: "Home",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: '#icon-shouye'
                },
            }
        ]
    },
    {
        path: "/blogs",
        name: "/Blogs",
        component: () => import("@/views/layout/index.vue"),
        meta: {
            title: '博客管理',
            hidden: false,
            icon: '#icon-bokeguanli'
        },
        children: [
            {
                path: '/blogs/list',
                name: "BlogsList",
                component: () => import("@/views/blogs/blogsproc/index.vue"),
                meta: {
                    title: '博客列表',
                    hidden: false,
                    icon: '#icon-liebiao'
                }
            },
            {
                path: '/blogs/detail/:id',
                name: "BlogsDetail",
                component: () => import("@/views/blogs/blogsproc/catblogs.vue"),
                meta: {
                    title: '查看博客',
                    hidden: true,
                    icon: 'el-icon-s-platform'
                }
            },
            {
                path: '/blogs/editor/:id',
                name: "BlogsEditor",
                component: () => import("@/views/blogs/blogsproc/editorblogs.vue"),
                meta: {
                    title: '编辑博客',
                    hidden: true,
                    icon: 'el-icon-s-platform'
                }
            },
            {
                path: '/blogs/add',
                name: "BlogsAdd",
                component: () => import("@/views/blogs/blogsadd/index.vue"),
                meta: {
                    title: '添加博客',
                    hidden: true,
                    icon: 'el-icon-s-platform'
                }
            },
            {
                path: '/blogs/collection',
                name: "BlogsCollection",
                component: () => import("@/views/blogs/collection/index.vue"),
                meta: {
                    title: '博客收藏',
                    hidden: false,
                    icon: '#icon-dianxing'
                },
            }
        ]
    },
    {
        path: "/work",
        name: "/Work",
        component: () => import("@/views/layout/index.vue"),
        meta: {
            title: '工单管理',
            hidden: false,
            icon: '#icon-gongdanguanli'
        },
        children: [
            {
                path: '/work/user',
                name: "WorkUser",
                component: () => import("@/views/work/index.vue"),
                meta: {
                    title: '个人中心',
                    hidden: false,
                    icon: '#icon-gerenzhongxin'
                }
            },
            {
                path: '/work/proce',
                name: "WorkProce",
                component: () => import("@/views/work/proce.vue"),
                meta: {
                    title: '处理中心',
                    hidden: false,
                    icon: '#icon-hetongchulizhongxin'
                }
            }
        ]
    },
    {
        path: "/spide",
        name: "/Spider",
        component: () => import("@/views/layout/index.vue"),
        meta: {
            title: '爬虫',
            hidden: false,
            icon: '#icon-sharpicons_Spider'
        },
        children: [
            {
                path: '/spide/manager',
                name: "SpiderManager",
                component: () => import("@/views/spider/spider.vue"),
                meta: {
                    title: '爬虫管理',
                    hidden: false,
                    icon: '#icon-zhiliangkongzhi'
                }
            },
            {
                path: '/spider/config',
                name: "SpiderConfig",
                component: () => import("@/views/spider/config.vue"),
                meta: {
                    title: '爬虫配置',
                    hidden: false,
                    icon: '#icon-spider_flat'
                }
            }
        ]
    },
    {
        path: '/logout',
        name: "Logout",
        component: "",
        meta: {
            title: '退出登录',
            hidden: true,
            icon: 'el-icon-s-platform'
        },
    }, {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '404页面',
            hidden: true,
            icon: 'el-icon-s-platform'
        },
    },


]

// 异步路由
export const asyncRoutes = [{
    path: '/screen',
    name: "Screen",
    component: () => import("@/views/layout/index.vue"),
    meta: {
        title: '数据大屏',
        hidden: false,
        icon: '#icon-shujudaping'
    },
    children: [
        {
            path: '/screen/tobacco',
            name: "Tobacco",
            component: () => import("@/views/screen/tobacco/index.vue"),
            meta: {
                title: '烟草大屏',
                hidden: false,
                icon: '#icon-xiangyan'
            },
        },
        {
            path: '/screen/sports',
            name: "Sports",
            component: () => import("@/views/screen/sports/index.vue"),
            meta: {
                title: '体育大屏',
                hidden: false,
                icon: '#icon-jiemuguanli'
            },
        },
        {
            path: '/screen/ecs',
            name: "Ecs",
            component: () => import("@/views/screen/ecs/index.vue"),
            meta: {
                title: '服务大屏',
                hidden: false,
                icon: '#icon-a-fuwudapingpeizhishequguanhuai'
            },
        }
    ]
},
{
    path: '/user',
    name: "User",
    component: () => import("@/views/layout/index.vue"),
    meta: {
        title: '用户管理',
        hidden: false,
        icon: '#icon-jiaoseguanli'
    },
    children: [
        {
            path: '/user/list',
            name: "List",
            component: () => import("@/views/user/list/index.vue"),
            meta: {
                title: '用户列表',
                hidden: false,
                icon: '#icon-yonghuliebiao'
            },
        },
        {
            path: '/user/role',
            name: "Role",
            component: () => import("@/views/user/role/index.vue"),
            meta: {
                title: '角色管理',
                hidden: false,
                icon: '#icon-jiaoseguanli'
            },
        },
        {
            path: '/user/permission',
            name: "Permission",
            component: () => import("@/views/user/permission/index.vue"),
            meta: {
                title: '权限管理',
                hidden: false,
                icon: '#icon-quanxianguanli'
            },
        }
    ]
}
]

// 任意路由
//任意路由
export const anyRoute = [{
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
    },
}]