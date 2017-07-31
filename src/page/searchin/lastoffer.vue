<template>
    <div class="incontent">
       <div>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>车牌号：</span><span>{{search_Res.LicenseNo}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>品牌型号：</span><span>{{search_Res.ModleName}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>注册日期：</span><span>{{search_Res.RegisterDate}}</span>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>上一年投保公司：</span><span>{{search_Res.ModleName}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>商业险到期时间：</span><span>{{search_Res.BusinessExpireDate}} </span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>交强险到期时间：</span><span>{{search_Res.ForceExpireDate}} </span>
              </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex' 
    import{search_res} from "../../service/data"
    export default {
        data(){
            return {
                userAccount: null, //用户名
                passWord: null, //密码
                user_name:"tuyou", //正确用户
                password:"tuyou123",//正确密码
                code:"",
                search_Res:search_res,
            }
        },
        created(){
            
        },
        components: {
            
        },
        computed: {
            
        },
        methods: {

            //发送登陆信息
             mobileLogin(){
                inputCheck([
                    [!this.userAccount,"请输入用户名"],
                    [!this.passWord,"密码不能为空"],
                    [!(this.userAccount==this.user_name&&this.passWord==this.password),"账号或密码不存在"],
                    [(this.userAccount==this.user_name&&this.passWord==this.password),"",this.loginSuc],           
                ],this)
            },
            loginSuc(){
                this.$router.push("/home");
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
        padding-bottom: .6rem;
         >div{
            width: 80%;
            margin-left: 10%;
            margin-bottom: .16rem;
            padding: .16rem 0;
            background: #F8F8F8;
            .el-row{
                
                padding: .2rem .1rem;
                color:#393939;
            }        
        }
    }

    
</style>
