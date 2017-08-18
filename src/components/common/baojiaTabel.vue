 <template>
    <div class="tabcontent">
        <template id="baojia">
         <el-table
          :data="tableData"
          style="width: 90%;background:white;margin-left:5%"
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
          <el-table-column
            prop="BaoFei"
            label="保险费"
            align='center'>
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData1"
          style="width: 90%;background:white;margin-left:5%"
          show-summary
          sum-text="保费总金额"
          :show-header ="false">
          <el-table-column
            prop="chinese"
            label="承险险种"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="allfei"
            label="承险险种/责任限额"
            align='center'>
          </el-table-column>
        </el-table>
        </template>
    </div>
</template>

<script>

    export default {
        data(){
            return{
            }
        },
        mounted(){

        },
        props: ["tableData","tableData1"],
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
</style>


