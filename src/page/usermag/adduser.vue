<template>
    <div class="incontent">
         <div>
            <h3>{{showPart?"注册信息":"编辑用户"}}</h3>
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
                  <span>{{showPart?"创建登录账号：":"账号"}}</span><el-input class="serinput" v-model="username"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purplee-light">
                  <span>登录密码：</span><el-input class="serinput" v-model="password" :placeholder="passholder"></el-input>
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
                    <el-select v-model="item.precisePrice">
                      <el-option v-for="(item_i,index_i) in sclect" :label="item_i.name" :value="item_i.value"></el-option>
                    </el-select>
              </div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-select v-model="item.submitInfo">
                      <el-option v-for="(item_i,index_i) in sclect" :label="item_i.name" :value="item_i.value"></el-option>
                    </el-select>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <el-input class="serinput" v-model="item.BizDiscount" placeholder="请输入0~40的数字"></el-input>
              </div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple-light">
                  <el-input class="serinput" v-model="item.ForceDiscount" placeholder="请输入0~40的数字"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div class="foot" v-if="showPart">
            <div>
                <button v-if="true" @click="register">注册</button>
                <button class="sub" @click="reset">重置</button>
            </div>
        </div>
        <div v-if="!showPart" class="foot eidt">
            <el-button v-if="true" @click="register">保存</el-button>
        </div>    
    </div>
</template>

<script>
    import {inputCheck,exit,layer,initData} from '../../components/common/common'
    import md5 from 'js-md5'
    import {mapState, mapActions} from 'vuex' 
    import {register,updateuser} from "../../service/getData"
    export default {
        data(){
            return {
               name:'',
               phoneNumber:'',
               username:'',
               password:'',
               passholder:"",
               list:[
               {source:4,company:"中国人保",imgsrc:require("../../images/rb.png"),precisePrice :true,submitInfo:true,BizDiscount:"",ForceDiscount:""},
               {source:2,company:"中国平安",imgsrc:require("../../images/pa.png"),precisePrice :true,submitInfo:true,BizDiscount:"",ForceDiscount:""},
               {source:1,company:"中国太平洋",imgsrc:require("../../images/tpy.png"),precisePrice :true,submitInfo:true,BizDiscount:"",ForceDiscount:""},
               ],
               count:[5,10,15,20,25,30,35,40],
               orderCount:20,
               offer_prority:[0,0,0],
               sclect:[{name:"未开通",value:false},{name:"已开通",value:true}]
            }
        },
        created(){           
            
        },
        props:{"showPart":{default:true},"user":{default:null}},
        mounted(){
            exit(this)
            this.init()         
        },
        components: {
            
        },
        computed: {
            ...mapState([
                'userinfo',
            ]),
        },
        methods: {
            ...mapActions([
                "getUserInfo",
            ]),
            async init(){
                if(!sessionStorage.userInfo){
                    this.$store.dispatch('getUserInfo').then(() => {

                    })
                }
                this.init_user();
                this.$watch("user",function(){
                   this.init_user()
                })
                this.$store.state.userinfo = JSON.parse(sessionStorage.userInfo);
                    
            },
            reset(){
                Object.assign(this.$data, this.$options.data())
            },
            async register(){
                let check =  inputCheck([
                        [this.$store.state.userinfo.level>2,"权限不足，无法注册用户"],
                        [!this.name,"请输入用户名"],
                        [!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNumber)),"请输入正确的手机号码"],
                        [!this.username,"请输入账号"],
                        [!this.password&&this.showPart,"请输入密码"],
                    ],this)
                if(check == -1){
                    return
                }
                for(var i=0;i<this.list.length;i++){
                    this.list[i].BizDiscount = Number(this.list[i].BizDiscount);
                    this.list[i].ForceDiscount = Number(this.list[i].ForceDiscount);
                    if(isNaN(this.list[i].BizDiscount)||isNaN(this.list[i].ForceDiscount)){
                        layer("error","优惠上限输入格式错误",this)
                        return
                    }
                    if((this.list[i].BizDiscount&&(this.list[i].BizDiscount<0||this.list[i].BizDiscount>40))||(this.list[i].ForceDiscount&&(this.list[i].ForceDiscount<0||this.list[i].ForceDiscount>40))){
                        layer("error","优惠上限在0~40之间",this)
                        return;
                    }
                }
                var prams = {
                    name:this.name,
                    username:this.username,
                    password:(this.showPart||this.password)?md5(this.password):this.user.password,
                    phoneNumber:this.phoneNumber,
                    source:[
                        {code:this.list[0].source,submitInfo:this.list[0].submitInfo,precisePrice:this.list[0].precisePrice,BizDiscount:this.list[0].BizDiscount||0,ForceDiscount:this.list[0].ForceDiscount||0},
                        {code:this.list[1].source,submitInfo:this.list[1].submitInfo,precisePrice:this.list[1].precisePrice,BizDiscount:this.list[1].BizDiscount||0,ForceDiscount:this.list[1].ForceDiscount||0},
                        {code:this.list[2].source,submitInfo:this.list[2].submitInfo,precisePrice:this.list[2].precisePrice,BizDiscount:this.list[2].BizDiscount||0,ForceDiscount:this.list[2].ForceDiscount||0}
                    ],
                    orderCount:this.orderCount,
                    parentId:this.$store.state.userinfo.userId
                }
                if(this.user){
                    this.user.name  = this.name;
                    this.user.username  = this.username;
                    this.user.phoneNumber  = this.phoneNumber;
                    this.user.orderCount = this.orderCount;
                    this.user.source = prams.source;
                }
                if(this.showPart){
                    let data = await register(prams)
                    if(data.code == 0){
                        if(this.$store.state.userlist){
                            data.res.parentName = this.$store.state.userinfo.name;
                            this.$store.state.userlist.push(data.res);
                        }
                        layer("success","注册成功",this)
                        this.$router.push("userlist")
                    }else{
                        layer("error",data.ch,this)
                    }
                }else{
                    prams.userId = this.user.userId;
                    let data = await updateuser(prams)
                    if(data.code == 0){
                        await layer("success","修改成功",this);
                        this.$parent.$parent.tableData.splice(this.$parent.$parent.index,1,this.user);
                        this.$parent.$parent.dialogVisible = false;
                    }else{
                        layer("error",data.ch,this)
                    }
                }   
            },
            init_user(){
                 if(!this.showPart&&this.user){
                    initData(this,this.user,["name","phoneNumber","username","orderCount"]);
                    this.password = "";
                    this.passholder = "默认为原始密码";
                    this.user.source.map((item)=>{
                        let index;
                        for(let i=0;i<3;i++){
                            if(item.code == this.list[i].source){
                                index = i;
                                break;
                            }
                        }
                        for(var key in item){
                            this.list[index][key] = item[key]
                        }
                    })
                }
            }                   
        },
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
        .eidt{
            left: 0;
            bottom: 0;
            height: auto;
            background: none;
            border: none;
            .el-button{
                width: 1.2rem;
                background: #D43F3A;
                color: white;
            }
        }
    }
    
</style>
