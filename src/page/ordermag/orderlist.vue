<template>
    <div class="incontent orderlist">
         <div class="search">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="LicenseNo" @change="search"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>录入时间：</span>
                  <el-date-picker
                  v-model="create_time"
                  type="daterange"
                  placeholder="选择时间范围"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                  @change="search">
                </el-date-picker>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="name" @change="search"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>交强险到期时间：</span>
                  <el-date-picker
                  v-model="ForceExpireDate"
                  type="daterange"
                  placeholder="选择日期范围"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                  @change="search">
                </el-date-picker>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>商业险到期时间：</span>
                  <el-date-picker
                  v-model="BusinessExpireDate"
                  type="daterange"
                  placeholder="选择日期范围"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                  @change="search">
                </el-date-picker>
              </div></el-col>
            </el-row>
            <el-dialog
            :visible.sync="dialogVisible"
            title="选择业务员"
            >
                <div class="userlist">
                    <el-row>
                        <el-col :span="7"><el-input placeholder="输入业务员姓名" v-model="userlist_name"  @change="searchuser"></el-input></el-col>
                        <el-col :span="8"><el-button @click="searchuser">搜索</el-button></el-col>
                    </el-row>
                  <el-table
                  :data="tableData_user"
                  ref="userOrder"
                  @select = "disUser"
                  @select-all="handleSelectAllUser"
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
                <!-- <el-button @click="del_order">回收</el-button>   -->
            </div>
        </div>
        <div class="handle"><span><i class="el-icon-delete"></i>批量删除</span><span><i class="el-icon-upload2"></i>导出Excel</span></div>
        <el-table
          :data="tableData"
          @select="handleSelect"
          @select-all="handleSelectAll"
          ref="orderlist"
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
            show-overflow-tooltip
            label="车主"
            >
          </el-table-column>
          <el-table-column
            prop="reinfo.LicenseNo"
            width="115"
            label="车牌号"
            >
          </el-table-column>
          <el-table-column
            width="135"
            prop="reinfo.ForceExpireDate"
            label="交强险到期时间">
          </el-table-column>
          <el-table-column
            width="135"
            prop="reinfo.BusinessExpireDate"
            label="商业险到期时间">
          </el-table-column>
          <el-table-column
            width="120"
            show-overflow-tooltip
            label="录入时间">
            <template scope="scope">
                {{scope.row&&new Date(scope.row.create_time).toLocaleDateString()}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template scope="scope">
                {{getapprovalStatus(scope.row)}}         
            </template>
          </el-table-column>
          <el-table-column
            label="报价状态"
            width="145">
            <template scope="scope">
                <div v-html="priceStatus(scope.row.priceSession.Items)"></div>
            </template>
          </el-table-column>
          <el-table-column
            width="85"
            show-overflow-tooltip
            label="业务员">
            <template scope="scope">
                {{scope.row.order?scope.row.order.salesmanName:"N/A"}}
            </template>
          </el-table-column>
           <el-table-column
            width="76"
            label="操作"
            ><template scope="scope">
                <el-button @click="handdis(scope.row,scope.$index)" type="text" size="small">分配</el-button><br/>
                <el-button @click="delorder(scope.row,scope.$index)" type="text" size="small">回收</el-button>
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
    import {inputCheck,exit,layer,serachInput,analyzeTabel,fliterBaoe} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex' 
    import {orderlist,disOrder,getsuperior,delOrder} from "../../service/getData"
    import {change_text,instype} from "../../service/data"
    export default {
        data(){
            return {
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
               LicenseNo:"",
               dialogVisible:false,
               userlist:'',
               order:null,
               index:null,
               BusinessExpireDate:null,
               create_time:"",
               ForceExpireDate:null,
               name:null,
               loading:"",
               change_text:change_text,
               userlist_name:""
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
                // if(!this.$store.state.orderlist){
                this.loading = true;
                await  this.$store.dispatch("getOrderList");
                // }
                if(!JSON.parse(sessionStorage.userInfo)){
                  await  this.$store.dispatch("getUserInfo");
                }
                this.tableData = this.$store.state.orderlist.slice(this.start,this.start+this.listsize);
                this.loading = false;
                this.totalList = this.$store.state.orderlist.length;
                this.orderList = this.$store.state.orderlist;          
            },
            handleSelect(selection,row){
                if(selection.length>1){
                    layer("warning","只能分配一单",this);
                    this.$refs.orderlist.toggleRowSelection(selection[1]);
                    return
                }
                this.order = selection[0];
            },
            handleSelectAll(selection,row){
                 this.$refs.orderlist.clearSelection();
            },
            handleSelectAllUser(selection,row){
                 this.$refs.userOrder.clearSelection();
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
            handleSizeChange_user(size){
                this.start_user = this.listsize_user*(this.currentPage_user-1);
                this.listsize_user = size;               
                this.tableData_user= this.userlist.slice(this.start_user,this.start_user+size);
            },
            handleCurrentChange_user(page){
                this.start_user = this.listsize_user*(page-1);  
                this.currentPage_user = page; 
                this.tableData_user= this.userlist.slice(this.start_user,this.start_user+this.listsize_user);
            },
            handleClick(row){
                row.priceSession.recordId = row._id;
                row.priceSession.order = row.order;
                row.priceSession.SubmitGroup = row.SubmitGroup;
                // row.priceSession.UserInfo = Object.assign(row.priceSession.UserInfo,row.reinfo)
                row.priceSession.UserInfo.ModleName = row.reinfo.ModleName;
                row.priceSession.UserInfo.LicenseOwner = row.reinfo.LicenseOwner;
                row.priceSession.UserInfo.LicenseNo = row.reinfo.LicenseNo;

                sessionStorage.setItem("baojia",JSON.stringify(row.priceSession)); 
                sessionStorage.setItem("SubmitGroup",row.SubmitGroup);
                if(row.order&&row.order.Source){
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
                    if(row.order.approvalStatus == '3'||row.order.approvalStatus == '2')
                    {
                        this.$router.push("orderoffer?type=read");
                        return;
                    }
                    if(row.order.approvalStatus == '4')
                    {
                        this.$router.push("orderoffer?type=edit");
                        return;
                    }
                }
                this.$router.push("suboffer?type=order");
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
                this.searchorder = this.$store.state.orderlist;
                this.tableData = serachInput({
                    LicenseNo:this.LicenseNo,
                    salesmanName:{name:"order",value:this.name,type:"text"},
                    create_time:{value:this.create_time,type:"datetimerange"},
                    ForceExpireDate:{name:"reinfo",value:this.ForceExpireDate,type:"datetimerange"},
                    BusinessExpireDate:{name:"reinfo",value:this.BusinessExpireDate,type:"datetimerange"},
                },this.searchorder)
                this.orderList = this.tableData;
                this.totalList = this.tableData.length;
            },
            searchuser(){
                this.tableData_user = serachInput({
                    name:this.userlist_name,
                },this.olduserlist)
                this.userlist = this.tableData_user;
                this.totalList_user = this.tableData_user.length;
            },
            handdis(row,index){
                this.$refs.orderlist.clearSelection()
                this.$refs.orderlist.toggleRowSelection(row);
                this.order = row;
                if(row.order){
                    layer("error","该单已分配",this);
                    return;
                }       
                this.index = index;
                this.distribute();
            },
            async distribute(Row){   
                let check = inputCheck([
                    [!this.order,"请先选一单"],
                    [this.order&&this.order.order,"该单已分配"],
                ],this)

                if(check == -1) return;
                this.dialogVisible = true;
                if(!sessionStorage.userInfo) location.reload();
                let userinfo = JSON.parse(sessionStorage.userInfo);
                let own = {name:userinfo.name,username:userinfo.username,parentId:userinfo.parentId,userId:userinfo.userId}
                if(userinfo.level == 3){
                  this.tableData_user = [own];
                  this.totalList_user = 1;         
                }else{
                    let obj = {
                        userId:userinfo.userId,
                    }
                     let data = await getsuperior(obj)
                     this.userlist = data.res;
                     this.userlist.unshift(own);
                     this.olduserlist = this.userlist;
                     this.totalList_user = this.userlist.length;
                     this.tableData_user= this.userlist.slice(0,4); 
                }
                 
            },
            async disUser(selection,row){
                let hasOrder = this.$store.state.orderlist;
                // let d = new Date();
                // let datearr = [d,d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000))]
                // let passuser = serachInput({
                //     salesmanName:{name:"order",value:row.name,type:"text"},
                //     create_time:{value:datearr,type:"datetimerange"},
                // },hasOrder)
                let passuser = hasOrder.filter((item)=>{
                    if(!item.order) return;
                    return item.order.salesmanName == row.name&&(item.order.approvalStatus!=3)
                })
                await this.$store.dispatch("getUserInfo");
                sessionStorage.userInfo = JSON.stringify(this.$store.state.userinfo);
                if(passuser.length>=JSON.parse(sessionStorage.userInfo).orderCount){
                    layer("error","该业务员单数达到上限",this);
                    this.$refs.userOrder.clearSelection();
                    return
                }
                let obj = {
                    salesmanId:row.userId,
                    salesmanName:row.name,
                    from:JSON.parse(sessionStorage.userInfo).userId,
                    LicenseNo:this.order.LicenseNo,
                    recordId:this.order._id,
                }
                let load= this.$loading({body:true,text:"加载中...",customClass:"loading"});
                let data = await disOrder(obj)
                load.close();
                if(data.code == 0){
                    this.$confirm("分配成功","提示",{
                        showCancelButton:false,
                    }).then(()=>{
                        // location.reload();
                        // this.dialogVisible
                        this.tableData[this.index].order = data.res;             
                        this.tableData[this.index].order.salesmanName = data.res.salesmanName;
                        this.dialogVisible = false;                 
                        // this.order = null;
                    }).catch(()=>{
                        this.tableData[this.index].order = data.res;             
                        this.tableData[this.index].order.salesmanName = data.res.salesmanName;
                        this.dialogVisible = false;
                    })
                }else{
                    layer("error",data.ch||"分配失败",this)
                    this.$refs.userOrder.clearSelection()
                }                                    
            },
            async delorder(row,index){
                let check = inputCheck([
                    [!row.order,"该单未分配"],
                    [row.order&&row.order.approvalStatus==2,"该单正在审核"],
                    [row.order&&row.order.approvalStatus==3,"该单已出单"],
                ],this)
                if(check == -1){
                    return;
                }
                this.$confirm("是否需要释放订单","提示",{
                    }).then(()=>{ 
                        debugger
                        delOrder(row.order.orderId,JSON.parse(sessionStorage.userInfo).userId).then((data)=>{
                            if(data.code==0){
                                layer("success","回收成功",this);
                                this.tableData[index].order= null;
                                this.order = null;
                            }else{
                                layer("error",data.ch||"回收失败",this)
                            }                          
                        })                       
                    }).catch(()=>{
                        this.$refs.orderlist.clearSelection(); 
                        this.order = null;
                    })
            },
            del_order(){
                layer("info","该功能尚未开发",this)
            },
            priceStatus(row){
                let str = "";
                row.map((item)=>{
                    str +="<span style='color:"
                    item.QuoteStatus>0 ? str+="#5CB85C'>报价成功(":str += "#D43F3A'>报价失败(";
                        str += change_text.suboffer[item.Source].slice(2)+")</span><br/>"
                })
                return str;
            },
            getapprovalStatus(row){
                if(row.order){
                    var statu;
                    switch(row.order.approvalStatus)
                    {
                        case '1': statu = "未提交"; break;
                        case '2': statu = "待审核"; break;
                        case '3': statu = "已出单"; break;
                        case '4': statu = "未通过"; break;
                    }
                    return statu;
                }else{
                    return "未分配";
                }
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
                top: -.3rem;
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
