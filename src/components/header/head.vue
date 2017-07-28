<template>
    <header id='head_top'>
      <div class="tip"><img src="../../images/logo1.png"></div> 
      <div class="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            我的工作台<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="exit" >
            <el-dropdown-item @click="exit" >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
            //获取用户信息

        },
        mounted(){
            
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
            exit(){
                this.$router.push("/login")
            },
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
