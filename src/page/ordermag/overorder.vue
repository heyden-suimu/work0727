<template>
    <div class="incontent">
         <div class="search">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="LicenseNo" @change="search"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>投保公司：</span><el-input class="serinput" v-model="Source" @change="search"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="salesmanName" @change="search"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>出单日期：</span>
                <el-date-picker
                  v-model="create_time  "
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width:1.8rem"
                  format="yyyy-MM-dd"
                  @change="search">
                </el-date-picker>
              </div></el-col>
            </el-row>
            <div class="serfoot">
                <el-button @click="search">搜索</el-button> 
            </div>
        </div>
        <el-table
          :data="tableData"
          v-loading="loading"
          style="width: 92%;margin-left:2%;"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="order.time"
            label="出单日期">
          </el-table-column>
          </el-table-column>
          <el-table-column
            prop="order.LicenseNo"
            label="车牌号"
            >
          </el-table-column>          
          <el-table-column
            prop="order.salesmanName"
            label="业务员">
          </el-table-column>
          <el-table-column
            label="投保公司">
            <template scope="scope">
                {{scope.row.order.Source&&change_text.suboffer[scope.row.order.Source]}}
            </template>
          </el-table-column>    
          </el-table-column>
          <el-table-column
            width="80"
            label="详情"
            ><template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
    import {inputCheck,exit,fliterBaoe,analyzeTabel,serachInput} from '../../components/common/common'
    import{change_text} from "../../service/data"
    import {mapState, mapActions} from 'vuex' 

    export default {
        data(){
            return {
                currentPage4: 4,
                tableData:[],
                currentPage:1,
                listsizes:[8,12,16,20],
                listsize:8,
                totalList:0,
                start:0,
                orderList:[],
                surelist:[],
                change_text:change_text,
                loading:false,
                LicenseNo:"",
                Source:"",
                salesmanName:"",
                create_time:""
            }
        },
        created(){
            exit()
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
                // if(!this.$store.state.orderlist){
                  this.loading = true;
                  await  this.$store.dispatch("getOrderList");
                  this.loading =false;
                // }
                // if(!this.$store.state.userinfo.userId){
                //   await  this.$store.dispatch("getUserInfo");
                // }
                this.surelist = this.$store.state.orderlist.filter((item)=>{
                    return item.order&&item.order.approvalStatus == 3
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
            handleClick(row){
                row.priceSession.recordId = row._id;
                row.priceSession.order = row.order;
               // row.priceSession.UserInfo = Object.assign(row.priceSession.UserInfo,row.reinfo)
                row.priceSession.UserInfo.ModleName = row.reinfo.ModleName;
                row.priceSession.UserInfo.LicenseOwner = row.reinfo.LicenseOwner;
                row.priceSession.UserInfo.LicenseNo = row.reinfo.LicenseNo;
                
                sessionStorage.setItem("baojia",JSON.stringify(row.priceSession));
                var tableItem = row.priceSession.Items.filter((item)=>{
                    return item.Source == row.order.Source
                })
                if(!tableItem[0]) return;
                tableItem = tableItem[0] 
                let tableData1 = analyzeTabel(change_text.alltype,tableItem,["chinese","allfei"]);
                let tableData = fliterBaoe(tableItem);
                sessionStorage.setItem("Source",row.order.Source);
                sessionStorage.setItem("tableData1",JSON.stringify(tableData1));
                sessionStorage.setItem("tableData",JSON.stringify(tableData));
                this.$router.push("orderoffer?type=read");
            },
            search(){
                this.searchorder = this.surelist;
                this.tableData = serachInput({
                    LicenseNo:this.LicenseNo,
                    salesmanName:{name:"order",value:this.salesmanName,type:"text"},
                    time:{name:"order",value:this.create_time,type:"datetimerange"},
                    Source:{name:"order",value:this.Source,type:"changetext"},
                },this.searchorder)
                this.orderList = this.tableData;
                this.totalList = this.tableData.length;
            },
            
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
                margin-top: -.5rem;
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
