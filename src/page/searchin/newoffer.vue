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
                  <li><label>平安</label></li>
                  <li ><label>太平洋</label></eli>
                  <li ><label>人保</label></li>
              </div></el-col>
            </el-row>
            <el-row class="selctype">
              <el-col :span="3"><div class="grid-content bg-purple">
                  <span >选择核保公司：</span>
              </div></el-col>
              <el-col :span="18" ><div class="grid-content bg-purple-light type">
                  <li ><label>平安</label></li>
                  <li ><label>太平洋</label></li>
                  <li><label>人保</label></li>
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
                  <el-select v-model="xbjq">
                      <el-option label="投保" :value="0"></el-option>
                      <el-option label="不投保" :value="1"></el-option>
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
                  <el-select v-model="xbsy">
                      <el-option label="投保" :value="0"></el-option>
                      <el-option label="不投保" :value="1"></el-option>
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
                  <div @click=checkins(item.code)>
                        <el-checkbox v-if="item.hasOwnProperty('mianpei')" v-model="item.mianpei" >不计免赔</el-checkbox>
                        <el-select v-model="item.value" v-if="!item.slect_list">
                          <el-option label="投保" :value="0"></el-option>
                          <el-option label="不投保" :value="1"></el-option>
                        </el-select>
                        <el-select v-model="item.value" v-if="item.slect_list">
                          <el-option label="不投保" :value="0"></el-option>
                          <el-option v-for="(item,index) in item.slect_list"  :value="item" ></el-option>
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
                  <div @click=checkins(item.code)>
                        <el-checkbox v-if="item.hasOwnProperty('mianpei')" v-model="item.mianpei">不计免赔</el-checkbox>
                        <el-select v-model="item.value" v-if="!item.slect_list" >
                          <el-option label="投保" :value="0"></el-option>
                          <el-option label="不投保" :value="1"></el-option>
                        </el-select>
                        <el-select v-model="item.value" v-if="item.slect_list">
                          <el-option label="不投保" :value="0"></el-option>
                          <el-option v-for="item in item.slect_list"  :value="item" ></el-option>
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
    import {exit,layer} from '../../components/common/common'
    import{search_res,idType,basicIns,otherIns,} from "../../service/data"
    export default {
    	data(){
            return{
                activeName:"first",
                input5:"",
                idType:idType,
                xbjq:0,
                xbsy:0,
                basicIns:basicIns,
                otherIns:otherIns,
                checked:true,
                search_Res:null,
            }
        },
        created(){
            //获取用户信息
            
        },
        mounted(){
            exit(this)
            this.init()
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
                if(this.search_Res.CheSun){
                    this.search_Res.CheSun = 0;
                }else{
                    this.search_Res.CheSun = 1;
                }
            },
            checkins(name){
                if(name=="CheSun"&&this.xbsy==1){
                    layer("error","商业险未投保",this)
                    return
                }
            },
            readLast(){
                this.$router.push("lastoffer")
            },
            suboffer(){
                this.$router.push("suboffer")
            },
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
                padding: .2rem 0;
                label{
                    padding: .08rem .3rem .1rem .5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                }
                label:hover{
                    border-color:red;
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
                    width: 1.2rem;
                    height: .5rem;
                    line-height: .5rem;
                    float: right;
                    margin-right: .24rem;
                }
                .el-select::after{
                    content: "";
                    display:block;
                    clear: both;
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
