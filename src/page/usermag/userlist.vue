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
              <el-col :span="10"><div class="grid-content bg-purple">
                  <span>注册时间：</span><el-input class="serinput" v-model="phone"></el-input><span> 至 </span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>上级业务员姓名：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>是否可用：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">
                  <span>上级业务员ID：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
            </el-row>
            <div class="serfoot">
                <el-button>搜索</el-button> 
                <el-button>批量审核</el-button> 
            </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
    import {inputCheck} from '../../components/common/common'
    import {mapState, mapMutations} from 'vuex' 

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
            
        },
        components: {
            
        },
        computed: {
            
        },
        methods: {
            handleSelectionChange(val) {
            this.multipleSelection = val;
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
            width: 94%;
            margin-left: 0%;
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
                .el-button{
                    background:#d43f3a;
                    color: white;
                    width: 1rem;
                }
                .el-button:nth-child(1):hover{
                    border-color: #d43f3a;
                }
                .el-button:nth-child(2){
                    background:#3071a9;
                    color: white;
                    margin-left: .2rem;
                    margin-right: .3rem;
                }
            }
        }
        .el-pagination{
            text-align: center;
            margin-top: .5rem;
        }  
    }
    
</style>
