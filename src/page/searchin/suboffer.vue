<template>
    <div class="incontent">
       <ul class="tab">
           <li v-for="(item,index) in get_suboffer.res.Items" :class="{'active':index==ischecked}" @click="check(index)">
               <div>
                   <p><span>中国人保</span><span>(报价成功)</span></p><!-- {{item.Source}}{{item.QuoteStatus}} -->
                    <p>{{item.BizTotal}}元</p>
               </div>
           </li>
       </ul>
       <div class="tabcontent">
             <el-table
              :data="tableData"
              style="width: 90%;background:white;margin-left:5%"
              border>
              <el-table-column
                prop="date"
                label="承险险种"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="name"
                label="承险险种/责任限额"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="name"
                :label="'('+name+')保险费(元)'"
                align='center'>
              </el-table-column>
            </el-table>
       </div>
        <el-dialog
            :visible.sync="dialogVisible"
            size="small"
            >
            <div class="calculator">
                  <h2>计算器</h2>
                  <p><span>车牌号：</span><span></span></p>
                  <div><span>保险公司</span><el-select value="1">
                      <el-option value="1"></el-option>
                  </el-select></div>
                  <div><span>交强险优惠</span><el-select value="1" placeholder="选择或输入费率">
                      <el-option value="1"></el-option>
                  </el-select></div>
                  <div><span>商业险优惠</span><el-select value="1">
                      <el-option value="1"></el-option>
                  </el-select>
                  <el-checkbox>去增值税税点</el-checkbox></div>
                  <div><el-input type="textarea" v-model="calresult" :rows="6"></el-input></div>
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
    import{get_suboffer,} from "../../service/data"
    import {mapState, mapMutations} from 'vuex' 
    export default {
        data(){
            return {
                activeName:'first',
                resut:"bao",
                mony:1,
                tableData:[],
                get_suboffer:get_suboffer,
                name:"qwe",
                ischecked:0,
                calresult:'',
                data1:123,
                dialogVisible:false,
            }
        },
        created(){
            
        },
        components: {

        },
        computed: {
            
        },
        methods: {
            handleClick(){

            },
            check(index){
                this.ischecked = index;
            },
            reoffer(){
                this.$router.push("newoffer")
            },
            orderoffer(){
                this.$router.push("orderoffer")
            },
            calculator(){
               
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
        padding-bottom: .6rem;
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
                background: url("../../images/rb.png") no-repeat .4rem center;
                background-size: .5rem;
                }
            li:nth-child(2) div{
                background: url("../../images/pa.png") no-repeat .4rem center;
                background-size: .5rem;
            }
            li:nth-child(3) div{
                background: url("../../images/tpy.png") no-repeat .4rem center;
                background-size: .5rem;
            }     
            .active{
                background: #EEEEEE;
            }
        }
        div.tabcontent{
            padding-top: 1rem;
            width: 80%;
            background: #EEEEEE;
        }
        >div{
            margin-left: 10%;
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
