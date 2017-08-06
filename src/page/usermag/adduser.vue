<template>
    <div class="incontent">
         <div>
            <h3>注册信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>业务员：</span><el-input class="serinput" v-model="name"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>手机号：</span><el-input class="serinput" v-model="phoneNumber"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>接单上限：</span>
                  <el-input-number v-model="orderCount" :min="1"></el-input-number>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>创建登录账号：</span><el-input class="serinput" v-model="username"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purplee-light">
                  <span>登录密码：</span><el-input class="serinput" v-model="password"></el-input>
              </div></el-col>             
            </el-row>
        </div>
        <div class="prority">
            <h3>报价渠道配置</h3>
            <el-row>
              <el-col :span="5"><div class="grid-content bg-purple">
                  <span>报价公司</span>
              </div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">
                  <span>报价权限</span>
              </div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">
                  <span>核保权限</span>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <span>商业险优惠上限</span>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <span>交强险优惠上限</span>
              </div></el-col>
            </el-row>
            <el-row v-for="(item,index) in list" class="adduser">
              <el-col :span="5"><div class="grid-content bg-purple">
                 <div class="nameid">
                     <img :src="item.imgsrc">
                     <span>{{item.company}}</span>
                 </div>
              </div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-select v-model="item.submitInfo ">
                      <el-option v-for="(item_i,index_i) in sclect" :label="item_i.name" :value="item_i.value"></el-option>
                    </el-select>
              </div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-select v-model="item.offer_prority">
                      <el-option v-for="(item_i,index_i) in sclect" :label="item_i.name" :value="item_i.value"></el-option>
                    </el-select>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <el-input class="serinput" v-model="item.BizDiscount" placeholder="请输入0~0.4的数字"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <el-input class="serinput" v-model="item.ForceDiscount" placeholder="请输入0~0.4的数字"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div class="foot">
            <div>
                <button v-if="true" @click="register">注册</button>
                <button class="sub" @click="reset">重置</button>
            </div>
        </div>    
    </div>
</template>

<script>
    import {inputCheck,exit,layer} from '../../components/common/common'
    import md5 from 'js-md5'
    import {mapState, mapActions} from 'vuex' 
    import {register} from "../../service/getData"
    export default {
        data(){
            return {
               name:'',
               phoneNumber:'',
               username:'',
               password:'',
               list:[
               {source:0,company:"中国人保",imgsrc:require("../../images/rb.png"),submitInfo :false,offer_prority:false,BizDiscount:null,ForceDiscount:null},
               {source:1,company:"中国平安",imgsrc:require("../../images/pa.png"),submitInfo :false,offer_prority:false,BizDiscount:null,ForceDiscount:null},
               {source:2,company:"中国太平洋",imgsrc:require("../../images/tpy.png"),submitInfo :false,offer_prority:false,BizDiscount:null,ForceDiscount:null},
               ],
               count:[5,10,15,20,25,30,35,40],
               orderCount:20,
               offer_prority:[0,0,0],
               sclect:[{name:"未开通",value:false},{name:"已开通",value:true}]
            }
        },
        created(){
            
        },
        mounted(){
            exit(this)
            if(!this.$store.state.userinfo.userId){
                this.getUserInfo();
            }
            console.log(this.$store.state)
            console.log(this.$store.state.userinfo)
            console.log(this.$store.state.gi)
        },
        components: {
            
        },
        computed: {
            ...mapState([
                'userinfo',
            ])
        },
        methods: {
            ...mapActions([
                "getUserInfo"
            ]),
            reset(){
                Object.assign(this.$data, this.$options.data())
            },
            async register(){
                let check =  inputCheck([
                        [!this.name,"请输入用户名"],
                        [!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNumber)),"请输入正确的手机号码"],
                        [!this.username,"请输入账号"],
                        [!this.password,"请输入密码"],
                    ],this)
                var prams = {
                    name:this.name,
                    username:this.username,
                    password:md5(this.password),
                    phoneNumber:this.phoneNumber,
                    source:[
                        {code:this.list[0].source,submitInfo:this.list[0].submitInfo,precisePrice:this.list[0].precisePrice,BizDiscount:this.list[0].BizDiscount,ForceDiscount:this.list[0].ForceDiscount},
                        {code:this.list[1].source,submitInfo:this.list[1].submitInfo,precisePrice:this.list[1].precisePrice,BizDiscount:this.list[1].BizDiscount,ForceDiscount:this.list[1].ForceDiscount},
                        {code:this.list[2].source,submitInfo:this.list[2].submitInfo,precisePrice:this.list[2].precisePrice,BizDiscount:this.list[2].BizDiscount,ForceDiscount:this.list[2].ForceDiscount}
                    ],
                    orderCount:this.orderCount,
                    parentId:this.$store.state.userinfo.userId
                }
                if(check == -1){
                    return
                }
                try{
                    let data = await register(prams)
                    if(data.code == 0){
                        layer("success","注册成功",this)
                    }else if(data.code == -102){
                        layer("error",data.ch,this)
                    }
                }catch(err){
                     layer("error","请求数据错误",this)
                }
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
        padding-bottom: .6rem;
        background: #fff;
        font-size: 14px;
        >div{
            width: 86%; 
            margin-left: 2%;
            margin-bottom: .26rem;
            h3{
                padding: 4px 0;
                margin-bottom: .1rem;
            } 
            .el-row{
                background: #F8F8F8;
                padding: .08rem .1rem;
                color:#393939;
                text-align: right;
                .serinput{
                    max-width: 2rem;
                    margin-left: .1rem;
                }
            }
        }
        .prority{
            .el-row:nth-child(2){
                .el-col div{
                    text-align: center;                   
                }
            }
            .adduser{
                padding-bottom: .2rem;
                .el-col>div{
                    width: 100%;
                    height: .6rem;
                    line-height: .6rem;
                    >div.nameid{
                        width: 90%;
                        padding-left: 10%;
                        background: white;
                        margin-left: 2%;
                        img{
                              width: .53rem;
                              margin-top: .035rem;
                              display: block;
                              float: left;  
                        }
                        span{
                            padding-left: .2rem;
                        }
                    }
                }
                .el-col div{
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                    .el-select{
                        width: 1.3rem;
                    }
                }
            }
        }
        .foot{
            position: fixed;
            margin: 0;
            bottom: 0;
            height: .6rem;
            left:15.6%;
            width: 84.4%;
            text-align: center;
            background: #F8F8F8;
            z-index: 100;
            justify-content: center; /*子元素水平居中*/
            align-items: center; /*子元素垂直居中*/
            display: -webkit-flex;
            border-top:1px solid #E5E5E5;  
            div{
                float: left;
                overflow: hidden;
                button{
                    width: 1rem;
                    padding: .1rem 0;
                    display: block;
                    float: left;
                    border-radius: 5px;
                    background: #D9534F;
                    border: 1px solid #ccc;
                    color: white;         
                }
                button.sub{
                    margin-left: 2rem;
                    background: white;
                    color: black;        
                }
            }
            
        }
    }
    
</style>
