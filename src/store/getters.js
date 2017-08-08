export default {
	updateUser:state=>{
		return state.userinfo
	},
	getxbinfo:state=>{
		let obj = {
			"basic":[
				{value:state.xbInfo.CheSun,name:"车辆损失险",code:"CheSun",mianpei:!!state.xbInfo.BuJiMianCheSun},
				{value:state.xbInfo.SanZhe,name:"第三者责任险",code:"SanZhe",mianpei:!!state.xbInfo.BuJiMianSanZhe,slect_list:[50000,100000,150000,200000,250000,300000,350000,400000]},
				{value:state.xbInfo.DaoQiang,name:"全车盗抢险",code:"DaoQiang",mianpei:!!state.xbInfo.BuJiMianDaoQiang},
				{value:state.xbInfo.SiJi,name:"司机座位责任险",code:"SiJi",mianpei:!!state.xbInfo.BuJiMianChengKe,slect_list:[10000,20000,30000,40000,50000,60000,70000]},
				{value:state.xbInfo.ChengKe,name:"乘客座位责任险",code:"ChengKe",mianpei:!!state.xbInfo.BuJiMianSiJi,slect_list:[10000,20000,30000,40000,50000,60000,70000]},				
			],
			'other':[
				{value:state.xbInfo.HuaHen,name:"划痕险",code:"",code:"HuaHen",mianpei:!!state.xbInfo.BuJiMianHuaHen,slect_list:[2000,5000,10000,20000]},
				{value:state.xbInfo.SheShui,name:"涉水行驶损失险",code:"SheShui",mianpei:!!state.xbInfo.BuJiMianSheShui},
				{value:state.xbInfo.ZiRan,name:"自燃损失险",code:"ZiRan",mianpei:!!state.xbInfo.BuJiMianZiRan},
				{value:state.xbInfo.HcSanFangTeYue,name:"机动车无法找到第三方险",code:"HcSanFangTeYue"},
				{value:state.xbInfo.HcJingShenSunShi,name:"精神损失险保额",code:"HcJingShenSunShi",mianpei:state.xbInfo.BuJiMianJingShenSunShi},
				{value:parseInt(state.xbInfo.HcXiuLiChang),name:"指定修理厂险",code:"HcXiuLiChang",slect_list:["国产","进口"]},
			]
		}
		return obj
	}
}