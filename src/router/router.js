import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const verList = r =>require.ensure([], () => r(require('../page/version/verList')), 'verList')
const addVer = r =>require.ensure([], () => r(require('../page/version/addVer')), 'addVer')
const addoffer = r =>require.ensure([], () => r(require('../page/searchin/addoffer')), 'addoffer')
const newoffer = r =>require.ensure([], () => r(require('../page/searchin/newoffer')), 'newoffer')
const lastoffer = r =>require.ensure([], () => r(require('../page/searchin/lastoffer')), 'lastoffer')
const suboffer = r =>require.ensure([], () => r(require('../page/searchin/suboffer')), 'suboffer')
const orderoffer = r =>require.ensure([], () => r(require('../page/searchin/orderoffer')), 'orderoffer')
const orderlist = r =>require.ensure([], () => r(require('../page/ordermag/orderlist')), 'orderlist')
const overorder = r =>require.ensure([], () => r(require('../page/ordermag/overorder')), 'overorder')
const userlist = r =>require.ensure([], () => r(require('../page/usermag/userlist')), 'userlist')
const adduser = r =>require.ensure([], () => r(require('../page/usermag/adduser')), 'adduser')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/home',
            component: home,
            children:[
                {path: '',redirect: '/home/addoffer'},
                {path:"/home/verList",component:verList},
                {path:"/home/addVer",component:addVer},
                {path:"/home/addoffer",component:addoffer},
                {path:"/home/newoffer",component:newoffer},
                {path:"/home/lastoffer",component:lastoffer},
                {path:"/home/suboffer",component:suboffer},
                {path:"/home/orderoffer",component:orderoffer},
                {path:"/home/orderlist",component:orderlist},
                {path:"/home/overorder",component:overorder},
                {path:"/home/userlist",component:userlist},
                {path:"/home/adduser",component:adduser},
            ]
        },
        //登陆注册页
        {
            path: '/login',
            component: login
        },
    ]
}]
