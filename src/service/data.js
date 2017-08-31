// 七牛url
export const qnUrl = "http://ouv1r14wu.bkt.clouddn.com/"

// 主页左侧菜单
export let leftView=[
	["车险查询",[["新增报价","addoffer"]],],
	["订单管理",[["订单汇总","orderlist"],["待审核列表","sureorder"],["已出单列表","overorder"]]],
	["账号管理",[["业务员注册","adduser"],["业务员管理","userlist"]]],
]
//面包鞋
export let breadcrum = [
    {
        addoffer:"查询",
        newoffer:"查询结果",
        lastoffer:"续保信息",
        suboffer:"报价信息"
    },
    {
        orderlist:"订单汇总",
        sureorder:"待审核列表",
        overorder:"出单列表",
    },
]
// 险种
export let instype = {
  CheSun:"车辆损失险",
  SanZhe:"第三者责任险",
  DaoQiang:"全车盗抢险",
  SiJi:"司机座位责任险",
  ChengKe:"乘客座位责任险",
  BoLi:"玻璃单独破碎险",
  HuaHen:"划痕险",
  SheShui:"涉水行驶损失险",
  ZiRan:"自燃损失险",
  BuJiMianCheSun:"不计免赔险（车损）",
  BuJiMianSanZhe:"不计免赔险（三者）",
  BuJiMianDaoQiang:"不计免赔险（盗抢）",
  BuJiMianChengKe:"不计免赔险（乘客）",
  BuJiMianSiJi:"不计免赔险（司机）",
  BuJiMianHuaHen:"不计免赔险（划痕）",
  BuJiMianSheShui:"不计免赔险（涉水）",
  BuJiMianZiRan:"不计免赔险（自然）",
  BuJiMianJingShenSunShi:"不计免赔险（精神损失）",
  HcSanFangTeYue:"机动车无法找到第三方险",
  HcJingShenSunShi:"精神损失险保额",
  // HcXiuLiChang:"指定修理厂险",
};
// 语义替换
export let change_text = {
    login:{
        "-103":"用户不存在",
        "-4":"密码不存在"
    },
    suboffer:{
        1:"中国太平洋",
        2:"中国平安",
        4:"中国人保",
        8:"中国国财寿",
        16:"中华联合",
        32:"中国大地"
    },
    BoLi:{
        1:"国产",
        2:"进口"
    },
    alltype:{
        BizTotal:"商业险保费合计",
        ForceTotal:"交强险保费合计",
        TaxTotal:"车船税合计",
    },
    HcXiuLiChang:{
      "-1":"不投保",
      "0":"国产",
      "1":"进口"
    }
};
// 证件类型
export let idType = ["身份证","组织机构代码证","护照","军官证","港澳回乡证或台胞证","其他","港澳通行证","出生证","营业执照（社会统一信用代码）","税务登记证"];
// 基本险
export let  basicIns = ["车辆损失险","第三者责任险","全车盗抢险","司机座位责任险","乘客座位责任险"];
// 附加险
export let otherIns = ["划痕险","玻璃单独破碎险","自燃损失险","涉水行驶损失险","车损无法找到第三方险","指定修理厂险","新增设备损失险","修理期间费用补偿险"];
