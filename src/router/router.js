import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const verList = r =>require.ensure([], () => r(require('../page/version/verList')), 'verList')
const addVer = r =>require.ensure([], () => r(require('../page/version/addVer')), 'addVer')
const addoffer = r =>require.ensure([], () => r(require('../page/searchin/addoffer')), 'addoffer')
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
                {path: '',redirect: '/home/verList'},
                {path:"/home/verList",component:verList},
                {path:"/home/addVer",component:addVer},
                {path:"/home/addoffer",component:addoffer},
            ]
        },
        //登陆注册页
        {
            path: '/login',
            component: login
        },
    ]
}]
