<template>
    <div class="incontent">
       <div>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>车牌号：</span><span>{{search_Res.LicenseNo}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>品牌型号：</span><span>{{search_Res.ModleName}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>注册日期：</span><span>{{search_Res.RegisterDate}}</span>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>上一年投保公司：</span><span>{{search_Res.ModleName}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>商业险到期时间：</span><span>{{search_Res.BusinessExpireDate}} </span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>交强险到期时间：</span><span>{{search_Res.ForceExpireDate}} </span>
              </div></el-col>
            </el-row>
        </div>
        <el-table
          :data="tableData"
          style="width: 80%;background:white"
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
        </el-table>
        <div class="foot">
                <button  @click="lastsub">按去年险种报价</button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {exit,layer,analyzeTabel} from '../../components/common/common' 
    import{search_res,instype,get_suboffer} from "../../service/data"
    export default {
        data(){
            return {
                search_Res:search_res,
                tableData:[                   
                ],
            }
        },
        created(){
            exit();  
            this.init()
                  
        },
        components: {

        },
        computed: {
            
        },
        methods: {
            init(){
              this.fliterBaoe();
            },
            lastsub(){
                this.$router.push("newoffer");
                this.$message({
                    message:"已按勾选去年险种"
                })
            },
            getfilter(item){
                return item["BaoE"]>0
            },
            fliterBaoe(){
                let arr = analyzeTabel(instype,get_suboffer.res.Items[0],["chinese","BaoE","BaoFei"],this.getfilter);
                arr.map((item,index)=>{
                    if(item.chinese == instype.BoLi){
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
        padding-bottom: .6rem;
         >div{
            width: 80%;
            margin-left: 10%;
            margin-bottom: .16rem;
            padding: .16rem 0;
            background: #F8F8F8;
            .el-row{
                
                padding: .2rem .1rem;
                color:#393939;
            }        
        }
        .el-table{
            padding: 0;
            .el-table-column{
                background: white;        
            }
        }
        .foot{
            background: white;
            justify-content: center; /*子元素水平居中*/
            align-items: center; /*子元素垂直居中*/
            display: -webkit-flex;
            margin-top: .6rem;
            button{
                display: block;
                float: left;
                padding: .13rem .5rem;
                border-radius: 5px;
                background: #ea413c;
                color: white;
                border: 1px solid #ccc;         
            }
        }
    }

    
</style>
