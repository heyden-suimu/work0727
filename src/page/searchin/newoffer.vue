<template>
    <div class="in_content">
        <div>
            <h3>车辆信息</h3>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                  <span>车牌号码：</span><span>{{search_Res.LicenseNo}}</span>
              </div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span>注册日期：</span><span>{{search_Res.RegisterDate}}</span>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                  <span>品牌型号：</span><span>{{search_Res.ModleName}}</span>
              </div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span>新车置购价：</span><span>{{search_Res.PurchasePrice}} 元</span>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                <span>报价方式：</span>
                  <el-select placeholder="按年续费报价" value="1">
                      <el-option
                      key="123"
                      label="按年续费报价"
                      checked=true
                      value="1">
                    </el-option>
                  </el-select>
              </div></el-col>
            </el-row>
        </div>        
        <div>
            <h3>车主信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>车主姓名：</span><el-input v-model="search_Res.LicenseOwner" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件号码：</span><el-input v-model="search_Res.CredentislasNum" class="offerinputid"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>被保人信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>被保人姓名：</span><el-input v-model="search_Res.InsuredName" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件号码：</span><el-input v-model="search_Res.InsuredIdCard" class="offerinputid"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                  <span>被保人手机号：</span><el-input v-model="search_Res.InsuredMobile" class="offerinput"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <div  class="botline"><h3 style="display:inline;margin-right:.16rem;">投保人信息</h3><el-checkbox v-model="checked" style="color:#1A9DFE;">投保人与被保险人一致</el-checkbox ></div>
            <el-row v-if="!checked">
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>投保人姓名：</span><el-input v-model="search_Res.InsuredName" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件号码：</span><el-input v-model="search_Res.InsuredIdCard" class="offerinputid"></el-input>
              </div></el-col>
            </el-row>
            <el-row v-if="!checked">
              <el-col :span="12"><div class="grid-content bg-purple">
                  <span>被保人手机号：</span><el-input v-model="search_Res.InsuredMobile" class="offerinput"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>报价/核保公司</h3>
            <el-row class="selctype">
              <el-col :span="3" style="min-width:100px"><div class="grid-content bg-purple">
                  <span >选择报价公司：</span>
              </div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light type">
                  <li v-for="(item,index) in combx" :key="item"  ><label :class="{'active':arrBj[index]}" @click="selCombj(item,index)">{{item}}</label></li>
              </div></el-col>
            </el-row>
            <el-row class="selctype">
              <el-col :span="3"><div class="grid-content bg-purple">
                  <span >选择核保公司：</span>
              </div></el-col>
              <el-col :span="18" ><div class="grid-content bg-purple-light type">
                  <li v-for="(item,index) in combx" :key="item" ><label :class="{'active':arrHb[index]}" @click="selComhb(item,index)">{{item}}</label></li>
              </div></el-col>
            </el-row>
        </div>
        <div class="offertime">
            <h3>起保时间</h3>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                  <el-col :span="9" style="height:.42rem;line-height:.42rem;">交强险/车船税起保时间</el-col> 
                  <el-date-picker
                      v-model="search_Res.NextForceStartDate"
                      type="datetime"
                      format="yyyy-MM-dd HH:00"
                      placeholder="选择日期时间">
                    </el-date-picker>
              </div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                  <el-select v-model="xbjq" @change="getbxs(xbjq)">
                      <el-option label="不投保" :value="0"></el-option>
                      <el-option label="投保" :value="1"></el-option>         
                  </el-select>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple">
                  <el-col :span="9" style="height:.42rem;line-height:.42rem;">商业险起保时间</el-col> 
                  <el-date-picker
                      v-model="search_Res.NextBusinessStartDate"
                      type="datetime"
                      format="yyyy-MM-dd HH:00"
                      placeholder="选择日期时间">
                    </el-date-picker>
              </div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                  <el-select v-model="xbsy" @change="getbxs(xbsy)">
                      <el-option label="不投保" :value="0"></el-option>
                      <el-option label="投保" :value="1"></el-option>
                  </el-select>
              </div></el-col>
            </el-row>
        </div>
        <div class="insura insuraf">
            <h3>基本险</h3>
            <el-row v-for="(item,index) in basicIns">
              <el-col :span="18"><div class="grid-content bg-purple">
                  <span>{{item.name}}</span>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">
                  <div>
                        <el-checkbox v-if="item.hasOwnProperty('mianpei')" v-model="item.mianpei" @change="checkins(item.code,item.mianpei)">不计免赔</el-checkbox>
                        <el-select v-model="item.value" v-if="!item.slect_list" @change="updatexbinfo(item.code,item.value)">
                          <el-option label="投保" :value="1"></el-option>
                          <el-option label="不投保" :value="0"></el-option>
                        </el-select>
                        <el-select v-model="item.value" v-if="item.slect_list" @change="updatexbinfo(item.code,item.value)">
                          <el-option label="不投保" :value="0"></el-option>
                          <el-option v-for="(item,index) in item.slect_list"  :value="item"></el-option>
                        </el-select>
                  </div>
              </div></el-col>
            </el-row>
        </div>
        <div class="insura">
            <h3>附加险</h3>
           <el-row v-for="(item,index) in otherIns">
              <el-col :span="18"><div class="grid-content bg-purple">
                  <span>{{item.name}}</span>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">
                  <div>
                        <el-checkbox v-if="item.hasOwnProperty('mianpei')" v-model="item.mianpei" @change="checkins(item.code,item.mianpei)">不计免赔</el-checkbox>
                        <el-select v-model="item.value" v-if="!item.hasOwnProperty('slect_list')&&!item.hasOwnProperty('slect_label')" @change="updatexbinfo(item.code,item.value)">
                          <el-option label="投保" :value="1"></el-option>
                          <el-option label="不投保" :value="0"></el-option>
                        </el-select>
                        <el-select v-model="item.value" v-if="item.hasOwnProperty('slect_list')" @change="updatexbinfo(item.code,item.value)">
                          <el-option v-for="(item,count) in item.slect_list"  :value="count" :label="item"></el-option>
                        </el-select>
                        <el-select v-model="item.value" v-if="item.hasOwnProperty('slect_label')" @change="updatexbinfo(item.code,item.value)">
                           <el-option label="不投保" :value="0"></el-option>
                          <el-option v-for="item in item.slect_label"  :value="item"></el-option>
                        </el-select>
                  </div>
              </div></el-col>
            </el-row>
        </div>
        <div class="foot">
            <div>
                <button @click="readLast">查看续保信息</button>
                <button class="sub" @click="suboffer">提交报价</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions,mapGetters} from 'vuex'
    import {exit,layer,Cookie,inputCheck} from '../../components/common/common'
    import{search_res,idType,basicIns,otherIns} from "../../service/data"
    import {reqOrder} from "../../service/getData"
    export default {
    	data(){
            return{
                activeName:"first",
                input5:"",
                idType:idType,
                xbjq:0,
                xbsy:0,
                ForceTax:'',
                basicIns:basicIns,
                otherIns:otherIns,
                checked:true,
                search_Res:null,
                combx:["人保","太平洋","平安"],
                combxIndex:[4,1,2],
                arrBj:{0:false,1:false,2:false},
                arrHb:{0:false,1:false,2:false},
            }
        },
        created(){
            //获取用户信息
            this.init()
        },
        mounted(){
            exit(this)
            
        },
        components:{
        },
        props: [],
        computed: {
            ...mapState([
                'userInfo',
                "xbInfo"
            ]),
            ...mapGetters([
                "getxbinfo"
            ])
        },
        methods: {
            ...mapActions([
                'getUserInfo',
                "getXbInfo"
            ]),
            async init(){
                if(!this.$store.state.xbInfo.LicenseNo){
                    await this.$store.dispatch("getXbInfo")
                }
                this.search_Res = this.$store.state.xbInfo;
                this.basicIns = this.$store.getters.getxbinfo.basic;
                this.otherIns = this.$store.getters.getxbinfo.other;
            },
            checkins(name,value){
                // debugger
                if(name=="CheSun"&&this.xbsy==0){
                    layer("error","商业险未投保",this)
                    value = false;
                }
                this.$store.state.xbInfo["BuJiMian"+ name] = value?1:0;
            },
            readLast(){
                this.$router.push("lastoffer")
            },
            selComhb(item,index){
                if(!this.arrHb[index])  this.arrBj[index] =true;
                this.arrHb[index] = !this.arrHb[index]
            },
            selCombj(item,index){
                if(this.arrBj[index]) this.arrHb[index] =false;
                this.arrBj[index] = !this.arrBj[index]
 
            },
            getbxs(){
                if(this.xbsy == 0&&this.xbjq == 1){
                    this.ForceTax = 2;
                }else if(this.xbsy == 1&&this.xbjq == 0){
                    this.ForceTax = 0;
                }else if(this.xbsy == 1&&this.xbjq == 1){
                    this.ForceTax = 1;
                }
                
            },
            async suboffer(){
                let data = this.$store.state.xbInfo;
                let QuoteGroup = 0,SubmitGroup = 0;
                for(let item in this.arrBj){
                    if(this.arrBj[item]){
                        QuoteGroup += this.combxIndex[item];
                    }
                }
                for(let item in this.arrHb){
                    if(this.arrHb[item]){
                        SubmitGroup += this.combxIndex[item];
                    }
                }
                let check = inputCheck([
                    [QuoteGroup == 0,"请选择报价公司"],
                    [!this.ForceTax,"请投保商业税或交强税"],
                ],this)
                if(check == -1){
                    return
                }
                let obj ={
                    username:data.username,
                    LicenseNo:this.search_Res.LicenseNo,
                    QuoteGroup:QuoteGroup,
                    SubmitGroup:SubmitGroup,
                    ForceTax:this.ForceTax,
                    BoLi:data.BoLi,
                    SheShui:data.SheShui,
                    HuaHen:data.HuaHen,
                    SiJi:data.SiJi,
                    ChengKe:data.ChengKe,
                    CheSun:this.getpramvalue("basic","CheSun"),
                    DaoQiang:data.DaoQiang,
                    SanZhe:data.SanZhe,
                    ZiRan:data.ZiRan,
                    HcXiuLiChang:data.HcXiuLiChang,
                    BuJiMianCheSun:this.getprammianpei("basic","CheSun"),
                    BuJiMianDaoQiang:this.getprammianpei("basic","DaoQiang"),
                    BuJiMianSanZhe:this.getprammianpei("basic","SanZhe"),
                    BuJiMianChengKe:this.getprammianpei("basic","ChengKe"),
                    BuJiMianSiJi:this.getprammianpei("basic","SiJi"),
                    BuJiMianHuaHen:this.getprammianpei("other","HuaHen"),
                    BuJiMianSheShui:this.getprammianpei("other","SheShui"),
                    BuJiMianZiRan:this.getprammianpei("other","ZiRan"),
                    BuJiMianJingShenSunShi:this.getprammianpei("other","HcJingShenSunShi"),
                }
                let load = this.$loading({body:true,text:"加载中...",customClass:"loading"})
                try{
                    var res = await reqOrder(obj) 
                    load.close();
                    localStorage.setItem("baojia",JSON.stringify(res))
                    if(res.code == 0){
                        this.$router.push("suboffer")
                    }else{
                        layer("error",res.message.StatusMessage,this)
                    }
                }catch(err){
                    load.close();
                    layer("error","请求错误",this);
                }       
            },
            getpramvalue(type,pram){
                let arr = this.$store.getters.getxbinfo[type].filter((item)=>{
                    return item.code == pram;
                })
                return arr[0].value
            },
            getprammianpei(type,pram){
                let arr = this.$store.getters.getxbinfo[type].filter((item)=>{
                    return item.code == pram;
                })
                return arr[0].mianpei?1:0;
            },
            updatexbinfo(name,value){
                // debugger
                 this.$store.state.xbInfo[name] = value
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .in_content{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: scroll;
        padding-top: .3rem;
        background: #fff;
        font-size: 14px;
        padding-bottom: .6rem;
        .offerinput{
            max-width: 1.6rem;
        }
        .offerinputid{
            max-width: 2.6rem;
        }
        .botline{
            padding: .1rem 0;
            border-bottom:1px solid #ccc;
        }
        >div{
            width: 80%;
            margin-left: 10%;
            margin-bottom: .16rem;
            h3{
                padding: 4px 0;
            } 
            .el-row{
                background: #F8F8F8;
                padding: .08rem .1rem;
                color:#393939;
            }
            .selctype{
                padding: .08rem .1rem;
                >div{
                    height: .4rem;
                    line-height: .4rem;
                }
                label{
                    padding: 0rem .3rem 0rem .5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                    display: block;  
                }
                // label:hover{
                //     border-color:red;
                // },
                label.active{
                    border: 1px solid #ea413c;
                    overflow: hidden;
                    display: block;
                }
                label.active::before{
                    content: "✓";
                    width: .2rem;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    top: -9px;
                    right: -4px;
                }
                label.active::after{
                    content: "";
                    width: 1rem;
                    height: .22rem;
                    background: #ea413c;
                    position: absolute;
                    transform:rotate(43deg);
                    top: -6px;
                    right: -33px;
                }
                .type{
                    li{
                        float: left;
                        margin-right: .28rem;
                        position: relative;
                    }
                    li:nth-child(1) label{
                        background: url("../../images/pa.png") no-repeat .1rem center;
                        background-size: .3rem;
                    }
                    li:nth-child(2) label{
                        background: url("../../images/tpy.png") no-repeat .1rem center;
                        background-size: .3rem;
                    }
                    li:nth-child(3) label{
                        background: url("../../images/rb.png") no-repeat .1rem center;
                        background-size: .3rem;
                    }
                }
                .type::after{
                    content: "";
                    width: 100%;
                    visibility: hidden;
                    clear: both;
                    overflow: hidden;
                }
                
            }
        }
        .offertime{
            .el-select{
                width: 1.2rem;
                float: right;
                margin-right: .3rem;
            }
        }
        div.insura{
            h3{
                background: #F8F8F8;
                text-align: center;
                padding: .08rem 0;
                margin-bottom: .2rem;
            }
            div{
                background: white;
                padding: .02rem 0;
                .el-checkbox{
                    margin-right: .16rem;
                    height: .5rem;
                    line-height: .5rem;
                }
                .el-select{
                    width: 1.3rem;
                    height: .5rem;
                    line-height: .5rem;
                    float: right;
                    margin-right: .24rem;
                }
                .el-select::after{
                    content: "";
                    display:block;
                    clear: both;
                    visibility: hidden;
                    overflow: hidden;
                }
            }
        }
        div.insuraf{
            margin-top: .5rem;
        }
        .foot{
            position: fixed;
            margin: 0;
            bottom: 0;
            height: .6rem;
            left:15.6%;
            width: 84.4%;
            text-align: center;
            background: #F8F8F8;
            z-index: 100;
            justify-content: center; /*子元素水平居中*/
            align-items: center; /*子元素垂直居中*/
            display: -webkit-flex;
            border-top:1px solid #E5E5E5;  
            div{
                float: left;
                overflow: hidden;
                button{
                    display: block;
                    float: left;
                    padding: .1rem .2rem;
                    border-radius: 5px;
                    background: white;
                    border: 1px solid #ccc;         
                }
                button.sub{
                    margin-left: .4rem;
                    padding:  .1rem .35rem;
                    background: #D9534F;
                    color: white;
                }
            }
            
        }
    }

    
</style>
