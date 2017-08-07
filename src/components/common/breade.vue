 <template>
    <div class="breadCrum">
	    <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(list,index) in bread_list" :to="{ path:list[1] }" :class='{"active":Active(list,index)}'>{{list[0]}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>

    export default {
    	data(){
            return{
                active:false,
            }
        },
        mounted(){
            
        },
        props: ["bread_list"],
        methods: {
            Active(list,index){
                let str = '/home/' + list[1]
                console.log(str)
                console.log(this.$route.path)
                return  str == this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	.breadCrum{
        
    }
    
</style>
