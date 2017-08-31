<template>
    <div class="incontent">
         <div class="search">
            <el-row>
              <el-col :span="5"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="LicenseNo" @change="search"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <span>投保公司：</span><el-input class="serinput" v-model="Source" @change="search"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="salesmanName" @change="search"></el-input>
              </div></el-col>
            </el-row>
            <div class="serfoot">
                <el-button @click="search">搜索</el-button>  
            </div>
        </div>
        <div class="handle"><span><i class="el-icon-delete"></i>批量删除</span><span><i class="el-icon-upload2"></i>导出Excel</span></div>
        <el-table
          :data="tableData"
          v-loading="loading"
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
            show-overflow-tooltip
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
            prop="order.salesmanName"
            label="业务员">
          </el-table-column>
          <el-table-column
            label="确认出单">
            <template scope="scope">
                <el-button @click="handleSure(scope.row,scope.$index)" type="text" size="small">确认</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="80"
            label="详情"
            ><template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="dialogVisible"
            title="是否通过审核"
            @close="initorder"
            size="tiny"
            top="25%"
            >
                <div class="surelist">
                    <el-row>
                        <el-col :span="7"><span>车牌号：</span></el-col>
                        <el-col :span="17"><span>{{order.order&&order.order.LicenseNo}}</span></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"><span>投保公司：</span></el-col>
                        <el-col :span="17"><span>{{order.order&&change_text.suboffer[order.order.Source]}}</span></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"><span>日期：</span></el-col>
                        <el-col :span="17"><span>{{time}}</span></el-col>
                    </el-row>
                    <div class="foot">
                        <el-button @click = "isaccess('3')">通过</el-button>
                        <el-button @click = "isaccess('4')">未通过</el-button>
                    </div>
                </div>
        </el-dialog>
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
    import {inputCheck,exit,layer,analyzeTabel,fliterBaoe,serachInput} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex'
    import {patchOrder} from "../../service/getData"
    import {change_text} from "../../service/data" 

    export default {
        data(){
            let time = new Date().toLocaleDateString();
            return {
               LicenseNo:"",
               Source:"",
               currentPage4: 4,
               tableData:[],
               currentPage:1,
               listsizes:[8,12,16,20],
               listsize:8,
               totalList:0,
               start:0,
               orderList:[],
               surelist:[],
               order:'',
               loading:"",
               dialogVisible:false,
               change_text:change_text,
               salesmanName:"",
               time
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
                // if(!this.$store.state.orderlist){
                this.loading = true
                await  this.$store.dispatch("getOrderList");
                this.loading = false;
                // }
                // if(!this.$store.state.userinfo.userId){
                //   await  this.$store.dispatch("getUserInfo");
                // }
                this.surelist = this.$store.state.orderlist.filter((item)=>{
                    return item.order&&item.order.approvalStatus == 2
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
            handleSure(row,orderindex){
                this.dialogVisible = true;
                this.order = row;
                this.orderindex = orderindex;
            },
            async isaccess(index){ 
                let obj = {
                    orderId:this.order.order.orderId,
                    approvalStatus:index,
                    time:this.time,
                }
                if(!sessionStorage.userInfo){location.relode();return;}
                let userinfo = JSON.parse(sessionStorage.userInfo);
                if(userinfo.level >2){layer("error","没有权限",this);return;}
                let  data = await patchOrder(obj);
                if(data.code==0){
                    if(index =="3")layer("success","出单成功",this);
                    if(index == "4") layer("info","操作成功",this);
                    this.dialogVisible =false;
                    this.tableData.splice(this.orderindex,1)
                }else{
                    layer("success",data.ch,this);
                }
            },
            search(){
                this.searchorder = this.surelist;
                this.tableData = serachInput({
                    LicenseNo:this.LicenseNo,
                    salesmanName:{name:"order",value:this.salesmanName,type:"text"},
                    Source:{name:"order",value:this.Source,type:"changetext"},
                },this.searchorder)
                this.orderList = this.tableData;
                this.totalList = this.tableData.length;
            },
            initorder(){
                this.order = "";
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
        .surelist{
            margin-top: -.2rem;
            .el-row{
                height: .4rem;
                line-height: .4rem;
            }
            .foot{
                margin-top:.1rem;
                text-align: center;
                .el-button{
                    width: .9rem;
                    margin-left: .2rem;
                    color: white;
                    background: #ccc;
                }
                .el-button:nth-child(1){
                    margin: 0;
                    background: #5BC0DE;
                }
            }
        }  
    }
    
</style>
