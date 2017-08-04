/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl; 
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://121.40.68.137:15000';
	routerMode = 'hash'
}else{
	baseUrl = 'http://api.aituyou.me:8002';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}