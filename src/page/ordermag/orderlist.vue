<template>
    <div class="incontent orderlist">
         <div class="search">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="LicenseNo"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>录入时间：</span>
                  <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>交强险到期时间：</span>
                  <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>商业险到期时间：</span>
                  <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div></el-col>
            </el-row>
            <el-dialog
            :visible.sync="dialogVisible"
            title="选择业务员"
            >
                <div class="userlist">
                    <el-row>
                        <el-col :span="6"><el-input placeholder="输入业务员姓名"></el-input></el-col>
                        <el-col :span="6"><el-button>搜索</el-button></el-col>
                    </el-row>
                  <el-table
                  :data="tableData_user"
                  style="width: 100%;"
                  border
                  >
                      <el-table-column
                      type="selection"
                      width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="业务员姓名"
                        >
                      </el-table-column>
                        <el-table-column
                        prop="username"
                        label="业务员账号"
                        >
                        </el-table-column>
                  </el-table>
                  <el-pagination
                      @size-change="handleSizeChange_user"
                      @current-change="handleCurrentChange_user"
                      :current-page="currentPage_user"
                      :page-sizes="listsizes_user"
                      :page-size="listsize_user"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalList_user">
                    </el-pagination>
                </div>
            </el-dialog>
            <div class="serfoot" >
                <el-button @click="search">搜索</el-button> 
                <el-button @click="distribute">分配</el-button>
                <el-button>撤销</el-button>  
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
            width="150"
            prop="reinfo.ForceExpireDate"
            label="交强险到期时间">
          </el-table-column>
          <el-table-column
            width="150"
            prop="reinfo.BusinessExpireDate"
            label="商业险到期时间">
          </el-table-column>
          <el-table-column
            prop="reinfo.create_time"
            width="200"
            show-overflow-tooltip
            label="录入时间">
          </el-table-column>
          <el-table-column
            label="分配状态">
            <template scope="scope">
                <!-- <el-button @click="handleStatus(scope.$index,scope.row.reinfo.IdType)" type="text" size="small">{{scope.row.reinfo.IdType}}</el-button> -->
                {{scope.row.status==0?"未提交":(scope.row.status==1?"已提交,待审核":"已出单")}}
            </template>
          </el-table-column>
          <el-table-column
            prop="reinfo.username"
            label="业务员">
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
    import {inputCheck,exit,layer} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex' 
    import {orderlist,disOrder,getsuperior} from "../../service/getData"
    export default {
        data(){
            return {
               phone:"",
               tableData: [],
               tableData_user:[],
               totalList:0,
               totalList_user:0,
               listsizes:[8,12,16,20],
               listsizes_user:[4,8,12,16],
               listsize:8,
               listsize_user:4,
               currentPage:1,
               currentPage_user:1,
               start:0,
               start_user:0,
               obj:{},
               orderList:[],
               value1:'',
               LicenseNo:"",
               dialogVisible:false,
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
                "userinfo",
                "orderlist"
            ])
        },
        methods: {
            ...mapActions([
                "getOrderList",
                "getUserInfo"
            ]),
            async init(){
                if(!this.$store.state.orderlist){
                  await  this.$store.dispatch("getOrderList");
                }
                this.tableData = this.$store.state.orderlist.slice(this.start,this.start+this.listsize);
                this.totalList = this.$store.state.orderlist.length;
                this.orderList = this.$store.state.orderlist;
                // let obj = {
                //     username:JSON.parse(Cookie.getCookie("login")).username,
                //     start:0,
                //     count:8,
                // }
                // let data = await orderlist(obj);
                // this.tableData = data.res;
                // this.totalList = data.res.length;             
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(size){
                this.start = this.listsize*(this.currentPage-1);
                this.listsize = size;               
                this.tableData= this.orderlist.slice(this.start,this.start+size);
            },
            handleCurrentChange(page){
                this.start = this.listsize*(page-1);  
                this.currentPage = page; 
                this.tableData= this.orderlist.slice(this.start,this.start+this.listsize);
            },
            handleSizeChange_user(size){
                this.start_user = this.listsize_user*(this.currentPage_user-1);
                this.listsize_user = size;               
                this.tableData_user= this.tableData_user.slice(this.start_user,this.start_user+size);
            },
            handleCurrentChange_user(page){
                this.start_user = this.listsize_user*(page-1);  
                this.currentPage_user = page; 
                this.tableData_user= this.tableData_user.slice(this.start_user,this.start_user+this.listsize_user);
            },
            handleClick(){
                this.$router.push("orderoffer")
            },
            handleStatus(index,text){
                this.$msgbox({
                    title:"改变状态",
                    message:"确定将改变"+text+"状态?"
                })
            },
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            search(){

            },
            async distribute(){
                this.dialogVisible = true;
                let userinfo = this.$store.state.userinfo;
                if(!userinfo.userId){
                    await this.$store.dispatch("getUserInfo")
                }
                if(userinfo.level == 2){
                  this.tableData_user = [
                    {name:userinfo.name,username:userinfo.username}
                  ]
                }else{
                    let obj = {
                        userId:userinfo.userId,
                    }
                     let data = await getsuperior(obj)
                     this.tableData_user = data.res;
                }
                this.totalList_user = this.tableData_user.length;  
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
                position:relative;
                top: -.4rem;
                padding-right: .5rem;
                border-bottom: 1px solid #ccc;
                // margin-bottom: .5rem;
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
                .el-button:nth-child(2){
                    background:#5CB85C;
                }
                .el-button:nth-child(3){
                    background:#428BCA;
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
            margin-top: .22rem;
            margin-bottom: .2rem;
        }
        .userlist{
            .el-row{
                margin-top: -.2rem;
            }
            .el-table{

            }
        }  
    }
    
</style>
