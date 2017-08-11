 <template>
    <div class="breadCrum">
	    <el-breadcrumb separator="/" >
          <el-breadcrumb-item v-for="(value,key) in bread_list" :to="{ path:key }" :class='{"active":Active(value,key)}'>{{value}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>

    export default {
    	data(){
            return{
                active:false,
                name:"",
            }
        },
        mounted(){
           
        },
        props: ["bread_list"],
        methods: {
            Active(list,index){
                let str = index
                return  str == this.$route.name
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	.breadCrum{
        
    }
    
</style>
