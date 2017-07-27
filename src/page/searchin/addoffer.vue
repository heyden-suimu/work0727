<template>
    <div @click="fds">
        {{adsafa}}
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
                adsafa:123
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
            fds(){

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
        .tip{
            color: #B6B4C7;
            font-size: 18px;
            background: #fff;
            width: 15.6%;
            text-align:center;
            height: 70px;
            line-height: 70px;
            float: left;
            min-width: 100px;    
        }
        >ul{
            max-width:70%;
            overflow: scroll;
            height: 60px;
            li{
                float: left;
                height: 60px;
                line-height: 60px;
                box-sizing:border-box; 
                -moz-box-sizing:border-box;
                -webkit-box-sizing:border-box;
                padding: 0 .5rem;
                color: #B6B4C7;
            }
            li:hover{
                border-bottom: 1px solid #FC6C26;
                color:#FC6C26;
            } 
        }
        .user{
            position: absolute;
            width: 10%;
            min-width: 130px;
            right: 6%;
            top: 0;
            bottom: 0;
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
            }
        }
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 0.8rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
