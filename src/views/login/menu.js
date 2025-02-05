var menu = [

    {
        name: "地级行政区",//地级
        url: 'http://59.208.84.203:8884/gtis/map/rest/5f0d54556437437f87a894b269f3f2cd/rest/maps/gldy_szj',
        opacity: 0
    },
    {
        name: "县级行政区",//县级
        url: 'http://59.208.84.203:8884/gtis/map/rest/47ea5b83e6a042dba090fe5153290da0/rest/maps/xzq_xian',
        opacity: 0
    },
    {
        name: "镇级行政区",//镇级
        url: 'http://59.208.84.203:8884/gtis/map/rest/1ba13701d645441db2388a12b7403327/rest/maps/xzq_xiang',
        opacity: 0
    },
    {
        name: "村级行政区",//村级
        url: 'http://59.208.84.203:8884/gtis/map/rest/b4381742a1954898a19c124dcf4bbe0b/rest/maps/XZCH_CUN_CGCS2000',
        opacity: 0
    },
    {
        name: "道路",//道路
        url: 'http://59.208.84.203:8884/gtis/map/rest/dc47214354c24c458b94f066328fd381/rest/maps/Road_0228',
        opacity: 0
    },
    {
        name: "河流水域",//河流水域
        url: 'http://59.208.84.203:8884/gtis/map/rest/cac6916fc0194d5c890e09ff6facfab0/rest/maps/SHUIXI',
        opacity: 0
    },
    {
        name: "全市立体边界",//全市立体边界
        url: 'http://59.208.84.203:8884/gtis/map/rest/7d2b31a4cb384203b2643c24b2372b3f/rest/maps/XCQ_SHI_LT',
        opacity: 0
    },
    {
        name: "网格",//网格
        url: 'http://59.208.84.203:8884/gtis/map/rest/430066af59e940d48073a7b92d04aaa6/rest/maps/xzq_wangge',
        opacity: 0
    }, {
        name: "中心城区范围",
        url: "http://59.208.84.203:8884/gtis/map/rest/f5c5029893704276b7716779a816bb66/rest/maps/T212FWX",
        opacity: 0
    },
    {
        name: "电子地图",//电子地图浅
        url: 'http://59.208.84.203:8884/gtis/map/rest/3afa800a69c249c9bea559b8d69d06c4/rest/maps/JZS_DLG_qian',
        opacity: 0
    },
    {
        name: "电子地图_深色版",//电子地图深
        url: 'http://59.208.84.203:8884/gtis/map/rest/6bf7cb162fc6410db74bb97241159613/rest/maps/JZS_DLG_shen',
        opacity: 0
    },
    {
        name: "中心城区DOM",//中心城区DOM
        url: 'http://59.208.84.203:8884/gtis/map/rest/0b221a041a8b477da89ce6f4aaaeb45e/rest/maps/DOM',
        opacity: 0
    },
    {
        name: "全市影像",//全市影像
        url: 'http://59.208.84.203:8884/gtis/map/rest/6d59d768b3e84190aa0862a1e9db4309/rest/maps/JZS_DOM',
        opacity: 0
    },
    {
        name: "湖北省影像",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }, {
        name: "中心城区已核查白模",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }, {
        name: "21年倾斜摄影",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }, {
        name: "22年倾斜摄影",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }, {
        name: "补飞区域倾斜摄影",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }, {
        name: "全市白模",
        url: 'http://59.208.84.203:8884/gtis/map/rest/115e10d2fec5451fa1ca5bc311a424fa/rest/maps/%E4%B8%AD%E5%9B%BD%E5%BD%B1%E5%83%8F',
        opacity: 0
    }]

const menulist = menu.map(item => item.name)
console.log(menulist);
