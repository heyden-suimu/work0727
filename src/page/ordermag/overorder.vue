<template>
    <div class="incontent">
         <div class="search">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>车牌号：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>录入时间：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span>交强险到期时间：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple-light">
                  <span>商业险到期时间：</span><el-input class="serinput" v-model="phone"></el-input>
              </div></el-col>
            </el-row>
            <div class="serfoot">
                <el-button>搜索</el-button> 
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
            prop="name"
            label="车主"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="车牌号"
            >
          </el-table-column>
          <el-table-column
            prop="date"
            label="交强险到期时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="商业险到期时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="录入时间">
          </el-table-column>
          <el-table-column
            prop="name"
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
                    address: '京QY1111'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '京QY1111'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '京QY1111'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '京QY1111'
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
            handleSizeChange(){
            
            },
            handleCurrentChange(){

            },
            handleClick(){
                this.$router.push("orderoffer")
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
                margin-top: -.5rem;
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
