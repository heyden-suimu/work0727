<template>
    <div class="incontent">
       <ul class="tab">
           <li v-for="(item,index) in Items" :class="{'active':index==ischecked}" @click="check(index)">
               <div>
                   <p><span>{{change_text.suboffer[item.Source]}}</span><span style="color:red;margin-left:.13rem;">{{item.QuoteStatus>0?item.BizTotal+item.ForceTotal+item.TaxTotal+'元':"报价失败"}}</span></p><!-- {{item.Source}}{{item.QuoteStatus}} -->
                    <p style="color:red">{{hebao}}</p>
               </div>
           </li>
       </ul>
       <div class="tabcontent">
             <el-table
              :data="tableData"
              style="width: 90%;background:white;margin-left:5%"
              border>
              <el-table-column
                prop="chinese"
                label="承险险种"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="BaoE"
                label="承险险种/责任限额"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="BaoFei"
                label="保险费"
                align='center'>
              </el-table-column>
            </el-table>
            <el-table
              :data="tableData1"
              style="width: 90%;background:white;margin-left:5%"
              show-summary
              :show-header ="false">
              <el-table-column
                prop="chinese"
                label="承险险种"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="allfei"
                label="承险险种/责任限额"
                align='center'>
              </el-table-column>
            </el-table>
       </div>
        <el-dialog
            :visible.sync="dialogVisible"
            >
            <div class="calculator">
                  <h2>计算器</h2>
                  <p><span>车牌号：</span><span>{{baojia.UserInfo.LicenseNo}}</span></p>
                  <el-row><span>保险公司</span><el-select v-model="companytype" >
                      <el-col><el-option v-for="(item,index) in Items" :key="index"  :value="item.Source"></el-option></el-col>
                  </el-select></el-row>
                  <div><span>交强险优惠</span><el-select v-model="jqvalue" placeholder="选择或输入费率">
                      <el-option v-for="(item,index) in jqItems" :key="index"  :value="item"></el-option>
                  </el-select></div>
                  <div><span>商业险优惠</span><el-select  v-model="syvalue">
                      <el-option v-for="(item,index) in syItems" :key="index"  :value="item"></el-option>
                  </el-select>
                  <el-checkbox>去增值税税点</el-checkbox></div>
                  <div class="textarea"><el-input type="textarea" v-model="calresult" :rows="6"></el-input></div>
                  <el-row>
                      <el-col :span="12"><span>客户电话:</span><el-input v-model="baojia.UserInfo.HolderMobile"></el-input></el-col>
                      <el-col :span="12"><el-button>发送短信</el-button></el-col>
                  </el-row>
              </div>
        </el-dialog>
       <div class="foot"> 
            <button v-if="true" @click="">核保结果刷新</button>
            <button  @click="reoffer">重新报价</button>
            <button  @click="dialogVisible = true">车险计算器</button>
            <button  @click="orderoffer">预约出单</button>
        </div>
    </div>
</template>

<script>
    import{change_text,instype} from "../../service/data"
    import {exit,layer,analyzeTabel,slectNum} from '../../components/common/common'
    import {mapState, mapMutations} from 'vuex' 
    export default {
        data(){
            return {
                activeName:'first',
                change_text:change_text,
                baojia:"",
                Items:[],
                tableData:[],
                tableData1:[],
                jqItems:[],
                syItems:[],
                ischecked:0,
                calresult:'',
                companytype:"",
                syvalue:20,
                jqvalue:20,
                dialogVisible:false,
                hebao:"核保中",
                alltype:{
                    BizTotal:"商业险保费合计",
                    ForceTotal:"交强险保费合计",
                    TaxTotal:"车船税合计",
                },
                
            }
        },
        created(){
            this.init()
            exit();
            
        },
        components: {

        },
        computed: {
            
        },
        methods: {
            init(){
                if(localStorage.getItem("baojia")){
                    this.baojia = JSON.parse(localStorage.getItem("baojia")).res;
                    this.Items = this.baojia.Items;
                }else{
                    this.$router.go(-1)
                }
                this.fliterBaoe(0);
                this.tableData1 = analyzeTabel(this.alltype,this.Items[0],["chinese","allfei"]);
                this.syItems = this.jqItems = slectNum(40);
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
                this.$router.push("orderoffer")
            },
            calculator(){
               
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
            li:nth-child(1) div{
                background: url("../../images/tpy.png") no-repeat .4rem center;
                background-size: .5rem;
                }
            li:nth-child(2) div{
                background: url("../../images/rb.png") no-repeat .4rem center;
                background-size: .5rem;
            }
            li:nth-child(3) div{
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
                        height: .5rem;
                        line-height: .5rem;
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
