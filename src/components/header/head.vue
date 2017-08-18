<template>
    <header id='head_top'>
      <div class="tip"><img src="../../images/logo1.png"></div>
      <breade-crumb :bread_list="bread_list" v-if="bread_list"></breade-crumb> 
      <div class="user">
        <el-dropdown trigger="click" @command="exit">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="exit">
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {Cookie} from '../../components/common/common'
    import breadeCrumb from "../../components/common/breade"
    import {breadcrum} from "../../service/data"
    export default {
    	data(){
            let username = JSON.parse(sessionStorage.getItem("userInfo")).username;
            return{
                bread_list:"",
                username,
            }
        },
        created(){
            //获取用户信息
            this.$parent.$on("getbread",this.getbread)
        },
        mounted(){
            this.getbread();
        },
        components:{
            breadeCrumb
        },
        props: [],
        computed: {
            // ...mapState([
            //     'userInfo'
            // ]),
        },
        methods: {
            // ...mapActions([
            //     'getUserInfo'
            // ]),
            // 退出登录
            exit(a){
                Cookie.clearCookie("login")
                sessionStorage.clear();
                this.$router.push("/login");
                this.$store.state.userlist = null;
            },
            // 获取面包屑信息
            getbread(){
                
                let bread = breadcrum.filter((item)=>{
                    return item.hasOwnProperty(this.$route.name)
                })
                this.bread_list =bread[0];
                // debugger
               // console.log(this.bread_list)
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        height: 60px;
        font-size: 16px;
        background: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        right: 0;
        color: #B6B4C7;
        border-bottom: 2px solid #EEEEEE;
        box-sizing:border-box;
        -moz-box-sizing:border-box; 
        -webkit-box-sizing:border-box; 
        .tip{
            font-size: 18px;
            width: 15.6%;
            text-align:center;
            height: 60px;
            line-height: 60px;
            float: left;
            min-width: 100px;
            position: relative;
            img{
                width: 80%;
                display: block;
                @include center
            }    
        }
        .breadCrum{
            background: none;
            position: absolute;
            width: 82%;
            background: white;
            padding: .2rem 0 .1rem 0;
            left: 18%;
            top:20px;
            margin-bottom: .2rem;
        }
        .user{
            position: absolute;
            width: 10%;
            min-width: 130px;
            right: 6%;
            bottom: .05rem;
            .name{
                overflow: hidden;
                text-align: right;
                p{
                    float: left;
                    color: #B6B4C7;
                    font-size: 14px;
                    text-align: center;
                    span{
                        color: #B6B4C7;
                        padding:0 3px;
                    } 
                }
                .el-dropdown-item{
                    background: red;
                }
            }
        }
    }
</style>
