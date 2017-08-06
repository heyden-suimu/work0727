<template>
    <div class="incontent">
         <div class="search">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>手机号：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>业务员姓名：</span><el-input class="serinput" v-model="phone"></el-input>
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
          width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务员"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="上级单位">
          </el-table-column>
          <el-table-column
            prop="address"
            label="注册日期">
          </el-table-column>
          <el-table-column
            label="操作">
              <template scope="scope">
                <div>
                    <el-button type="text" size="small">禁用</el-button>
                </div>
            </template>
          </el-table-column>
        </el-table>
        <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {inputCheck,layer,exit} from '../../components/common/common'
    import {mapState, mapActions} from 'vuex' 
    import {next_userlist} from "../../service/getData"
    export default {
        data(){
            return {
               phone:"",
               currentPage4: 4,
               tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                  }]
            }
        },
        created(){
            exit();
            this.init()
        },
        components: {
            
        },
        computed: {
            ...mapState([
                'userinfo',
            ])
        },
        methods: {
             ...mapActions([
                "getUserInfo"
            ]),
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async init(){       
                try{
                    let data = await next_userlist(this.$store.state.userinfo.userId);
                    console.log(data)
                }catch(err){
                    console.log(err)
                    layer("error","请求参数错误",this)
                }                      
            },
            handleSizeChange(){

            },
            handleCurrentChange(){

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
