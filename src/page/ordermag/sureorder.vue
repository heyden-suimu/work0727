<template>
    <div class="incontent">
         <div class="search">
            <el-row>
              <el-col :span="5"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="LicenseNo"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <span>投保公司：</span><el-input class="serinput" v-model="Source"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="name"></el-input>
              </div></el-col>
            </el-row>
            <div class="serfoot">
                <el-button>搜索</el-button>  
            </div>
        </div>
        <div class="handle"><span><i class="el-icon-delete"></i>批量删除</span><span><i class="el-icon-upload2"></i>导出Excel</span></div>
        <el-table
          :data="tableData"
          style="width: 96%;margin-left:2%;"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="reinfo.LicenseOwner"
            label="车主"
            >
          </el-table-column>
          <el-table-column
            prop="reinfo.LicenseNo"
            label="车牌号"
            >
          </el-table-column>
          <el-table-column
            prop="reinfo.ForceExpireDate"
            label="商业险起保日期">
          </el-table-column>
          <el-table-column
            prop="reinfo.ForceExpireDate"
            label="交强险起保日期">
          </el-table-column>
          <el-table-column
            prop="reinfo.ForceExpireDate"
            label="业务员">
          </el-table-column>
          <el-table-column
            label="确认出单">
            <template scope="scope">
                <el-button @click="handleSure" type="text" size="small">确认</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="80"
            label="详情"
            ><template scope="scope">
                <el-button @click="handleClick" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="listsizes"
              :page-size="listsize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {inputCheck,exit} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex' 

    export default {
        data(){
            return {
               pLicenseNo:"",
               Source:"",
               name:"",
               currentPage4: 4,
               tableData:[],
               currentPage:1,
               listsizes:[8,12,16,20],
               listsize:8,
               totalList:0,
               start:0,
               orderList:[],
               surelist:[],
            }
        },
        created(){
            
        },
        mounted(){
            exit(this)
            this.init()
        },
        components: {
            
        },
        computed: {
            ...mapState([
                // "userinfo",
                "orderlist"
            ])
        },
        methods: {
            ...mapActions([
                "getOrderList",
                // "getUserInfo"
            ]),
            async init(){
                if(!this.$store.state.orderlist){
                  await  this.$store.dispatch("getOrderList");
                }
                // if(!this.$store.state.userinfo.userId){
                //   await  this.$store.dispatch("getUserInfo");
                // }
                this.surelist = this.$store.state.orderlist.filter((item)=>{
                    return item.status >0
                })
                this.tableData = this.surelist.slice(this.start,this.start+this.listsize);
                // debugger
                this.totalList = this.surelist.length;
                this.orderList = this.surelist;
            },  
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(size){
                this.start = this.listsize*(this.currentPage-1);
                this.listsize = size;               
                this.tableData= this.orderList.slice(this.start,this.start+size);
            },
            handleCurrentChange(page){
                this.start = this.listsize*(page-1);  
                this.currentPage = page; 
                this.tableData= this.orderList.slice(this.start,this.start+this.listsize);
            },
            handleClick(){
                this.$router.push("orderoffer")
            },
            handleSure(){
                const h = this.$createElement
                this.$msgbox({
                    title:"确认保单已出",
                    message:"请确认",
                    showCancelButton:true,
                })
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
        div.search{
            width: 100%;
            .serinput{
                width: 1.6rem;
            }
            .el-col{
                text-align: right;
                margin-bottom: .16rem;
            }
            .serfoot{
                width: 100%;
                text-align: right;
                padding-bottom: .1rem;
                margin-top: -.1rem;
                padding-right: .5rem;
                border-bottom: 1px solid #ccc;
                margin-bottom: .4rem;
                ::before{
                    content: "";
                    clear: both;
                    width: 100%;
                    overflow: hidden;
                    visibility: hidden;
                }
                float: right;
                .el-button{
                    background:#d43f3a;
                    color: white;
                    width: 1rem;
                }
                .el-button:nth-child(1):hover{
                    border-color: #d43f3a;
                }
            }
        }
        .handle{
            height: .5rem;
            line-height: .5rem;
            text-align: right;
            padding-right: .3rem;
            span{
                margin-right: .26rem;
                color: #4897D3;
                cursor :default;
            }
        }
        .el-pagination{
            text-align: center;
            margin-top: .5rem;
        }  
    }
    
</style>
