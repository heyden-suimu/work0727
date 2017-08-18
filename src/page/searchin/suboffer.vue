<template>
    <div class="incontent">
       <ul class="tab">
           <li v-for="(item,index) in Items" :class="{'active':index==ischecked,'tpy':item.Source==1,'pa':item.Source==2,'rb':item.Source==4}" @click="check(index)">
               <div>
                   <p><span>{{change_text.suboffer[item.Source]}}</span><span style="color:red;margin-left:.13rem;">{{item.QuoteStatus>0?Number(item.BizTotal+item.ForceTotal+item.TaxTotal).toFixed(2)+'元':"报价失败"}}</span></p><!-- {{item.Source}}{{item.QuoteStatus}} -->
                    <p style="color:red">{{SubmitResult[item.Source]}}</p>
               </div>
           </li>
       </ul>
       <bj-tabel :tableData="tableData" :tableData1="tableData1"></bj-tabel>
        <el-dialog
            :visible.sync="dialogVisible"
            >
            <div class="calculator">
                  <h2>计算器</h2>
                  <p><span>车牌号：</span><span>{{baojia.UserInfo.LicenseNo}}</span></p>
                  <el-row><span>保险公司</span><el-select v-model="companytype" @change="getprice">
                      <el-col><el-option v-for="(item,index) in Items" :key="index"  :value="item.Source" :label="change_text.suboffer[item.Source]"></el-option></el-col>
                  </el-select></el-row>
                  <div><span>交强险优惠</span><el-select v-model="BizNoRate" placeholder="选择或输入费率"  @change="getprice">
                      <el-option v-for="(item,index) in jqItems" :key="index"  :value="item"></el-option>
                  </el-select></div>
                  <div><span>商业险优惠</span><el-select  v-model="ForceNoRate"  @change="getprice">
                      <el-option v-for="(item,index) in syItems" :key="index"  :value="item"></el-option>
                  </el-select>
                  <el-checkbox v-model="vatRate"  @change="getprice">去增值税税点</el-checkbox></div>
                  <div class="textarea"><el-input type="textarea" v-model="textarea" :rows="6"></el-input></div>
                  <el-row>
                      <el-col :span="12"><span>客户电话:</span><el-input v-model="baojia.UserInfo.HolderMobile"></el-input></el-col>
                      <el-col :span="12"><el-button @click="sendmsg">发送短信</el-button></el-col>
                  </el-row>
              </div>
        </el-dialog>
       <div class="foot"> 
            <button v-if="true" @click="reheibao">核保结果刷新</button>
            <button  @click="reoffer">重新报价</button>
            <button  @click="calculator">车险计算器</button>
            <button  @click="orderoffer">预约出单</button>
        </div>
    </div>
</template>

<script>
    import{change_text,instype} from "../../service/data"
    import {exit,layer,analyzeTabel,slectNum,inputCheck} from '../../components/common/common'
    import {mapState, mapMutations} from 'vuex'
    import bjTabel from '../../components/common/baojiaTabel'
    import {getHebao,sendMsg} from "../../service/getData"
    export default {
        data(){
            return {
                activeName:'first',
                change_text:change_text,
                baojia:{
                    UserInfo:""
                },
                Items:[],
                tableData:[],
                tableData1:[],
                jqItems:[],
                syItems:[],
                ischecked:0,
                calresult:'',
                companytype:"",
                BizNoRate:20,
                ForceNoRate:20,
                dialogVisible:false,
                vatRate:false,
                alltype:{
                    BizTotal:"商业险保费合计",
                    ForceTotal:"交强险保费合计",
                    TaxTotal:"车船税合计",
                },
                SubmitResult:{
                    1:"核保中",
                    2:"核保中",
                    4:"核保中",
                },
                textarea:"",
                
            }
        },
        created(){
                  
        },
        mounted(){
            exit(this);
            this.init()
        },
        components: {
            bjTabel,
        },
        computed: {
            
        },
        methods: {
            init(){
                if(sessionStorage.getItem("baojia")){
                    this.baojia = JSON.parse(sessionStorage.getItem("baojia"));
                    this.baojia.Items.map((item)=>{
                        item.SubmitResult = "核保中"
                    });
                    this.Items = this.baojia.Items;
                }else{
                    layer("warning","请先报价",this)
                    this.$router.go(-1)
                    return;
                }
                this.fliterBaoe(0);
                this.tableData1 = analyzeTabel(this.alltype,this.Items[0],["chinese","allfei"]);
                this.syItems = this.jqItems = slectNum(40);
                this.reheibao();
            },
            handleClick(){

            },
            check(index){
                this.ischecked = index;
                this.fliterBaoe(index);
                this.tableData1 = analyzeTabel(this.alltype,this.Items[index],["chinese","allfei"]);
            },
            reoffer(){
                this.$router.push("newoffer")
            },
            orderoffer(){

                let check = inputCheck([
                    [!this.baojia.order,"该单未分配，请先分配"],
                    [this.Items[this.ischecked].QuoteStatus==0,"该单报价失败，不能预约出单"]
                ],this)
                if(check == -1)  return;
                sessionStorage.tableData = JSON.stringify(this.tableData);
                sessionStorage.tableData1 = JSON.stringify(this.tableData1);
                sessionStorage.Source = this.Items[this.ischecked].Source;
                this.$router.push("orderoffer")
            },
            calculator(){
               this.dialogVisible = true;
               this.companytype = "";
               this.textarea = "";
            },
            getfilter(item){
                return item["BaoE"]>0
            },
            fliterBaoe(index){
                let arr = analyzeTabel(instype,this.Items[index],["chinese","BaoE","BaoFei"],this.getfilter);
                arr.map((item,index)=>{
                    if(item.chinese == instype.BoLi||item.chinese == instype.HcXiuLiChang){
                        item.BaoE = change_text.BoLi[item.BaoE]
                    }else if(item.BaoE == 1){
                        item.BaoE = "投保"
                    }
                })
                this.tableData = arr;
            },
            async reheibao(refresh=false){                
                this.Items.map((item,index)=>{
                    let obj = {
                        recordId:this.baojia.recordId,
                        SubmitGroup:item.Source
                    }
                    getHebao(obj).then((data)=>{
                        if(data.code == 0){
                            this.SubmitResult[item.Source] = data.res.SubmitResult;                   
                        }else{
                            this.SubmitResult[item.Source] = data.ch;
                        }
                    })             
                })
                if(refresh) layer("info","已刷新",this)   
            },
            getprice(){
                let Source = this.companytype;
                let item = this.Items.filter((row)=>{
                   return  row.Source == Source
                })
                if(item.length>0) item = item[0];
                let sumPrice = item.BizTotal+item.ForceTotal+item.TaxTotal-(item.BizTotal*this.BizNoRate/100+item.ForceTotal*this.ForceNoRate/100)/(this.vatRate?1:1.06);
                let str = "尊敬的京"+this.baojia.UserInfo.HolderName+"车主,"+this.change_text.suboffer[Source].slice(2)+"保险车险报价:总额"+(item.BizTotal+item.ForceTotal+item.TaxTotal).toFixed(2)+"元,商业险"+item.BizTotal.toFixed(2)+"元,交强险"+item.ForceTotal.toFixed(2)+"元,车船税"+item.TaxTotal.toFixed(2)+"元。"
                this.tableData.map((row)=>{
                    str += row.chinese+row.BaoFei+"元，保额"+row.BaoE+"元。"
                })
                str += "优惠后的价格:"+sumPrice.toFixed(2)+"元,共优惠:"+(item.BizTotal+item.ForceTotal+item.TaxTotal-sumPrice).toFixed(2)+"元"
                this.textarea = str;
            },
            async sendmsg(){
                let check = inputCheck([
                    [!this.baojia.UserInfo.HolderMobile,"手机号码不能为空"],
                    [!this.textarea,"短信内容不能为空"]
                ],this)
                if(check == -1) return;
                let data = await sendMsg(this.baojia.UserInfo.HolderMobile,this.textarea)
                if(data.code == 0){
                    layer("success","发送成功",this);
                }else{
                    layer("success","",this);
                }
            }
        }
    }

</script>

<style lang="scss" scoped  rel="stylesheet/scss" type="text/css">
    @import '../../style/mixin';
    .incontent{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: scroll;
        padding-top: .3rem;
        background: #fff;
        font-size: 14px;
        padding-bottom: 1rem;
        >ul{
            width: 80%;
            margin-left: 10%;
            height: .8rem;
            ::after{
                content:"";
                width:100%;
                clear: both;
                visibility: hidden;
            }
            li{
                width: 28.3%;
                margin-right: 3%;
                float: left;
                height: .8rem;
                border: 1px solid #EEEEEE;
                border-radius: 4px 4px 0 0;
                text-align: center;
                div{
                    padding-left: .6rem;
                    padding-top: .25rem;
                    width: 100%;
                    height: .8rem;
                }         
                p{

                }
            }
            li.tpy div{
                background: url("../../images/tpy.png") no-repeat .4rem center;
                background-size: .5rem;
                }
            li.rb div{
                background: url("../../images/rb.png") no-repeat .4rem center;
                background-size: .5rem;
            }
            li.pa div{
                background: url("../../images/pa.png") no-repeat .4rem center;
                background-size: .5rem;
            }     
            .active{
                background: #EEEEEE;
            }
        }
        div.tabcontent{
            padding-top: .4rem;
            width: 80%;
            background: #EEEEEE;
            padding-bottom: .3rem;
        }
        >div{
            margin-left: 10%;
        }
        .el-dialog__wrapper{
            margin-left: 10%;

            .el-dialog{
                
                .calculator{
                    h2{
                        margin-top: -.35rem;
                        margin-bottom: .2rem;
                    }
                    >p{
                        height: .6rem;
                        line-height: .6rem;
                        >span{
                            width: 1.1rem;
                            display: inline-block;
                        }
                    }
                    >div{
                        margin-top: .05rem;
                        >span{
                            width: 1.1rem;  
                            display: inline-block;
                        }
                        height: .46rem;
                        line-height: .46rem;
                        .el-checkbox{
                            margin-left: .3rem;
                        }
                    }
                    .textarea{
                        height: auto;
                        margin-top: .1rem;
                        margin-bottom: .2rem;
                    }
                    .el-row{
                        .el-col{
                            .el-input{
                                 width:2rem;
                                 margin-left:.2rem;
                            }
                            .el-button{
                                padding: .12rem .3rem; 
                                display: inline-block;
                            }
                        }
                        .el-col:nth-child(2){
                            text-align: center;
                        }
                    }
                }
            }            
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
            button{
                display: block;
                margin-right: 10%;
                float: left;
                padding: .1rem 0;
                width: 1.4rem;
                border-radius: 5px;
                background: white;
                border: 1px solid #ccc;
                color: white;         
            }      
            button:nth-child(1){
                background: #FCA06F;
            }
            button:nth-child(2){
                background: #D9534F;
            } 
            button:nth-child(3){
                background: #428BCA;
            } 
            button:nth-child(4){
                background: #5BC0DE;
            }      
        }
    }
</style>
