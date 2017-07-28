<template>
    <section id='left'>
        <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark">
          <el-submenu v-for="(list,index) in List" :index="String(index)">
            <template slot="title" class="git"><i :class="List[index][3]"></i>{{List[index][0]}}</template>
             <el-menu-item v-for="(seclist,secindex) in List[index][1]" :index="index+'-'+secindex" @click="gorouter(List[index][1][secindex][1])">{{List[index][1][secindex][0]}}</el-menu-item>
          </el-submenu>
        </el-menu>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import {leftView} from "../../service/data"
    export default {
    	data(){
            return{
                List:leftView
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            
        },
        methods: {
            // 二级路由跳转，并且设置监听（版本列表）
            gorouter(path){
                if(!path){
                    return
                }
                this.$router.push(path);
                // if(path!="verlist"){
                //     this.$parent.$emit("addVer");
                // }                  
            },
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #left{
        background-color: #FFF;
        font-size: 16px;
        width: 15.6%;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 60px;
        bottom: 0;
        min-width: 100px;       
    }
    
   
</style>
