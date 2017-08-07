// 主页左侧菜单
export var leftView=[
	["车险查询",[["新增报价","addoffer"]],],
	["订单管理",[["订单汇总","orderlist"],["预约单列表","sureorder"],["已出单列表","overorder"]]],
	["车险查询",[["业务员注册","adduser"],["业务员管理","userlist"]]],
]
//面包鞋
export var breadcrum = [
[
    ["查询","addoffer"],
    ["查询结果","newoffer"],
    ["续保信息","lastoffer"],
    ["报价信息","suboffer"],
]
]
// 语义替换
export var change_text = {
    login:{
        "-103":"用户不存在",
        "-4":"密码不存在"
    }
}
// 车辆信息
export var search_res = {
        "username": "admin",
      	"phoneNumber": "138874528452",
        "CarUsedType": 1,
        "LicenseNo": "京Q3WA89",
        "LicenseOwner": "于富彬",
        "InsuredName": "于富彬",
        "PostedName": "于富彬",
        "IdType": 1,
        "CredentislasNum": "230381198209031531",
        "CityCode": 1,
        "EngineNo": "9324876",
        "ModleName": "雅阁HG7203BBV轿车",
        "CarVin": "LHGCP1629D8005489",
        "RegisterDate": "2013-06-08",
        "ForceExpireDate": "2017-07-01",
        "BusinessExpireDate": "2017-07-01",
        "NextForceStartDate": "2017-07-02",
        "NextBusinessStartDate": "2017-07-02",
        "PurchasePrice": 166900,
        "SeatCount": 5,
        "FuelType": 1,
        "ProofType": 1,
        "LicenseColor": 1,
        "ClauseType": 2,
        "RunRegion": 1,
        "InsuredIdCard": "230381198209031531",
        "InsuredIdType": 1,
        "InsuredMobile": "132122331333",
        "HolderIdCard": "230381198209031531",
        "HolderIdType": 1,
        "HolderMobile": "",
        "RateFactor1": 0.9,
        "RateFactor2": 0.9,
        "RateFactor3": 0.9,
        "RateFactor4": 1,
        "IsPublic": 2,
      	"BizNo":"PDAA20171102D000132602",
      	"ForceNo":"PDZA20171102D000140639",
        "Source": 4,
        "CheSun": 153800,
        "SanZhe": 300000,
        "DaoQiang": 120579.2,
        "SiJi": 10000,
        "ChengKe": 10000,
        "BoLi": 0,
        "HuaHen": 0,
        "SheShui": 0,
        "ZiRan": 0,
        "BuJiMianCheSun": 1,
        "BuJiMianSanZhe": 1,
        "BuJiMianDaoQiang": 1,
        "BuJiMianChengKe": 1,
        "BuJiMianSiJi": 1,
        "BuJiMianHuaHen": 0,
        "BuJiMianSheShui": 0,
        "BuJiMianZiRan": 0,
        "BuJiMianJingShenSunShi": 0,
        "HcSanFangTeYue": 0,
        "HcJingShenSunShi": 0,
      	"HcXiuLiChang":"0",
      	"HcXiuLiChangType":"-1"
    };
// 请求报价
export var get_suboffer = {
  "res": {
      "UserInfo": {
        "LicenseNo": "京Q3WA89",
        "ForceExpireDate": "2017-07-01",
        "BusinessExpireDate": "2017-07-01",
        "BusinessStartDate": "2017-07-02",
        "ForceStartDate": "2017-07-02",
        "InsuredName": "于富彬",
        "InsuredIdCard": "230381198209031531",
        "InsuredIdType": 1,
        "InsuredMobile": "18219160842",
        "HolderName": "于富彬",
        "HolderIdCard": "230381198209031531",
        "HolderIdType": 1,
        "HolderMobile": "13261590769"
      },
      "Items": [
        { 
           BizTotal: 0,
           ForceTotal: 0,
           TaxTotal: 0,
           Source: 4,
           QuoteStatus: 0,
           QuoteResult: '无法连接服务器',
           CheSun: { BaoE: 153800, BaoFei: 0 },
           SanZhe: { BaoE: 300000, BaoFei: 0 },
           DaoQiang: { BaoE: 120579.2, BaoFei: 0 },
           SiJi: { BaoE: 10000, BaoFei: 0 },
           ChengKe: { BaoE: 10000, BaoFei: 0 },
           BoLi: { BaoE: 0, BaoFei: 0 },
           HuaHen: { BaoE: 0, BaoFei: 0 },
           SheShui: { BaoE: 0, BaoFei: 0 },
           ZiRan: { BaoE: 0, BaoFei: 0 },
           BuJiMianCheSun: { BaoE: 1, BaoFei: 0 },
           BuJiMianSanZhe: { BaoE: 1, BaoFei: 0 },
           BuJiMianDaoQiang: { BaoE: 1, BaoFei: 0 },
           BuJiMianChengKe: { BaoE: 1, BaoFei: 0 },
           BuJiMianSiJi: { BaoE: 1, BaoFei: 0 },
           BuJiMianHuaHen: { BaoE: 0, BaoFei: 0 },
           BuJiMianSheShui: { BaoE: 0, BaoFei: 0 },
           BuJiMianZiRan: { BaoE: 0, BaoFei: 0 },
           BuJiMianJingShenSunShi: { BaoE: 0, BaoFei: 0 },
           HcSheBeiSunshi: { BaoE: 0, BaoFei: 0 },
           HcHuoWuZeRen: { BaoE: 0, BaoFei: 0 },
           HcFeiYongBuChang: { BaoE: 0, BaoFei: 0 },
           HcJingShenSunShi: { BaoE: 0, BaoFei: 0 },
           HcSanFangTeYue: { BaoE: 0, BaoFei: 0 },
           HcXiuLiChang: { BaoE: 0, BaoFei: 0 },
           RateFactor1: 0,
           RateFactor2: 0,
           RateFactor3: 0,
           RateFactor4: 0    
        },
        { 
           BizRate: 0,
           ForceRate: 0,
           BizTotal: 3745.61,
           ForceTotal: 575.36,
           TaxTotal: 400,
           Source: 1,
           QuoteStatus: 1,
           QuoteResult: '成功',
           CheSun: { BaoE: 109506, BaoFei: 1738.48 },
           SanZhe: { BaoE: 300000, BaoFei: 885.79 },
           DaoQiang: { BaoE: 109506, BaoFei: 506.02 },
           SiJi: { BaoE: 10000, BaoFei: 29.62 },
           ChengKe: { BaoE: 10000, BaoFei: 75.14 },
           BoLi: { BaoE: 0, BaoFei: 0 },
           HuaHen: { BaoE: 0, BaoFei: 0 },
           SheShui: { BaoE: 0, BaoFei: 0 },
           ZiRan: { BaoE: 0, BaoFei: 0 },
           BuJiMianCheSun: { BaoE: 1, BaoFei: 260.77 },
           BuJiMianSanZhe: { BaoE: 1, BaoFei: 132.87 },
           BuJiMianDaoQiang: { BaoE: 1, BaoFei: 101.21 },
           BuJiMianChengKe: { BaoE: 1, BaoFei: 11.27 },
           BuJiMianSiJi: { BaoE: 1, BaoFei: 4.44 },
           BuJiMianHuaHen: { BaoE: 0, BaoFei: 0 },
           BuJiMianSheShui: { BaoE: 0, BaoFei: 0 },
           BuJiMianZiRan: { BaoE: 0, BaoFei: 0 },
           BuJiMianJingShenSunShi: { BaoE: 0, BaoFei: 0 },
           HcSheBeiSunshi: { BaoE: 0, BaoFei: 0 },
           HcHuoWuZeRen: { BaoE: 0, BaoFei: 0 },
           HcFeiYongBuChang: { BaoE: 0, BaoFei: 0 },
           HcJingShenSunShi: { BaoE: 0, BaoFei: 0 },
           HcSanFangTeYue: { BaoE: 0, BaoFei: 0 },
           HcXiuLiChang: { BaoE: 0, BaoFei: 0 },
           RateFactor1: 1,
           RateFactor2: 0.85,
           RateFactor3: 0.85,
           RateFactor4: 1 
        }
       ]
    },
  "message": "success",
  "code": 0
};
// 证件类型
export var idType = ["身份证","组织机构代码证","护照","军官证","港澳回乡证或台胞证","其他","港澳通行证","出生证","营业执照（社会统一信用代码）"];
// 基本险
export var  basicIns = ["车辆损失险","第三者责任险","全车盗抢险","司机座位责任险","乘客座位责任险"];
// 附加险
export var otherIns = ["划痕险","玻璃单独破碎险","自燃损失险","涉水行驶损失险","车损无法找到第三方险","指定修理厂险","新增设备损失险","修理期间费用补偿险"];
