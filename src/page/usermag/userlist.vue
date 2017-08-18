<template>
    <div class="incontent userlist">
         <div class="search">
            <el-row>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>业务员：</span><el-input class="serinput" v-model="name"></el-input>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>手机号：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>             
            </el-row>
            <div class="serfoot">
                <el-button>搜索</el-button> 
            </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 96%;margin-left:2%;"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="45">
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务员"
            width="160">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="parentName"
            show-overflow-tooltip
            label="上级单位">
          </el-table-column>
          <el-table-column
            label="注册日期">
            <template scope="scope">
                {{new Date(scope.row.create_time).toLocaleDateString()}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
              <template scope="scope">
                <div>
                    <el-button type="text" size="small" @click="available(scope.row)">{{scope.row.available?"禁用":"启用"}}</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </div>
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
        <el-dialog
            :visible.sync="dialogVisible"
            title="业务员管理"
            top="9%"
            >
            <div class="eidtuser">
                <eidt-user :showPart="false" :user="user"></eidt-user>
            </div>          
        </el-dialog>
    </div>
</template>

<script>
    import {inputCheck,layer,exit} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex' 
    import {next_userlist,getsuperior,updateuser} from "../../service/getData"
    import eidtUser from "./adduser"
    export default {
        data(){
            return {
                name:"",
                phone:"",
                currentPage4: 4,
                tableData:[],
                currentPage:1,
                listsizes:[8,12,16,20],
                listsize:8,
                totalList:0,
                start:0,
                orderList:[],
                surelist:[],
                dialogVisible:false,
                user:null,
            }
        },
        created(){
            exit(this);
            this.init()
        },
        mounted(){
            exit(this)
            this.init()
        },
        components: {
            eidtUser
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
                if(!sessionStorage.userInfo){
                  await  this.$store.dispatch("getUserInfo");
                  sessionStorage.userInfo = JSON.stringify(this.$store.state.userinfo);
                }
                if(!this.$store.state.userlist){
                    let obj = {
                        userId:JSON.parse(sessionStorage.userInfo).userId
                    };
                    let data = await getsuperior(obj);
                    if(data.code ==0 ){
                        this.$store.state.userlist = data.res
                    }
                }                               
                this.surelist = this.$store.state.userlist;
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
            available(row){
                let message = row.available?"禁用":"启用";
                this.$msgbox({
                    title:"提示",
                    message:"是否"+message+"改账号？",
                    showCancelButton:true,
                }).then(()=>{ 
                    updateuser({userId:row.userId,available:!row.available}).then((data)=>{
                        if(data.code == 0 ){
                            row.available = !row.available
                            layer("success","已"+message,this);
                        }else{
                            layer("success",data.ch,this);
                        }
                    })
                    
                }).catch(()=>{
                        
                })
            },
            edit(row){
                this.user = row;
                this.dialogVisible=true;       
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
            margin-left: 0%;
            padding-bottom: .25rem;
            border-bottom: 1px solid #ccc;
            margin-bottom: .4rem;
            .serinput{
                width: 1.6rem;                
            }
            .el-col{
                text-align: right;
                margin-bottom: .16rem;
            }
            .serfoot{
                ::before{
                    content: "";
                    clear: both;
                    width: 100%;
                    overflow: hidden;
                    visibility: hidden;
                }
                float: right;
                margin-top: -0.5rem;
                .el-button{
                    background:#d43f3a;
                    color: white;
                    width: 1rem;
                    margin-right: .8rem;;
                }
                .el-button:nth-child(1):hover{
                    border-color: #d43f3a;
                }
            }
        }
        .el-pagination{
            text-align: center;
            margin-top: .5rem;
        }
        
    }
    
</style>
