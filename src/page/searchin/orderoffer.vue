<template>
    <div class="incontent orderoffer">
       <div>
            <h3>业务员信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>业务员姓名：</span><span>{{salesmanName}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>业务员账号：</span><span>{{salesmanUsername}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>业务员联系方式：</span><span>{{salesmanPhoneNumber}}</span>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>被保人信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>被保人姓名：</span><el-input v-model="search_Res.UserInfo.InsuredName" class="offerinput" disabled></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.UserInfo.InsuredIdType" placeholder="" disabled>
                    <el-option
                      v-for="(item,index) in idType"
                      :key="index"
                      :label="item.value"
                      :value="item.code">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件号码：</span><el-input v-model="search_Res.UserInfo.InsuredIdCard" class="offerinputid" disabled></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>投保信息</h3>
            <div class="tbinfo">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>车牌号：</span><span>{{search_Res.UserInfo.LicenseNo}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>品牌型号：</span><span>{{search_Res.UserInfo.ModleName}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>车主姓名：</span><span>{{search_Res.UserInfo.LicenseOwner}}</span>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>商业险起保日期：</span><span>{{search_Res.UserInfo.BusinessStartDate||"无"}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>交强险起保日期：</span><span>{{search_Res.UserInfo.ForceStartDate||"无"}} </span>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>投保公司：</span><span>{{change_text.suboffer[Source]}}</span>
                  </div></el-col>
                </el-row>
            </div>
            <bj-tabel :tableData="tableData" :tableData1="tableData1"></bj-tabel>
        </div>
        <div>
            <h3>支付信息</h3>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>支付方式：</span>
                  <el-select v-model="payment" placeholder="">
                    <el-option
                      v-for="(item,value) in idType1"
                      :key="value"
                      :label="item"
                      :value="value">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>支付状态：</span>
                  <el-select v-model="payStatus" placeholder="">
                    <el-option
                      v-for="(item,value) in idType2"
                      :key="value"
                      :label="item"
                      :value="value">
                    </el-option>
                  </el-select>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>配送信息</h3>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>配送方式：</span>
                  <el-select v-model="distribution" placeholder="">
                    <el-option
                      v-for="(item,value) in idType3"
                      :key="value"
                      :label="item"
                      :value="value">
                    </el-option>
                  </el-select>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="10"><div class="grid-content bg-purple">
                  <span>收单人姓名：</span><el-input v-model="recipientsName" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">
                  <span>收单人电话：</span><el-input v-model="recipientsPhone" class="offerinput"></el-input>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="10"><div class="grid-content bg-purple">
                  <span>配送地址：</span><el-input v-model="address" class="address"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div v-if="eidtype">
            <h3>上传影像</h3>
            <div class="upload">
                <el-upload
                  action="http://up-z2.qiniu.com/"
                  list-type="picture-card"
                  :data="uploddata"
                  :before-upload="setToken"
                  :on-success="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div v-if="!eidtype">
            <h3>影像信息</h3>
            <div class="dowmload">
                <ul>
                    <li v-for="(item,index) in photos"><img :src="item" @click="viewimg(item)"></li>
                </ul>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="foot">
            <div>
                <button  @click="submit()" v-if="eidtype">提交</button>
                <button  @click="$router.go(-1)" v-if="!eidtype">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import{get_suboffer,change_text,qnUrl} from "../../service/data"
    import {exit,layer,initData,inputCheck,getPrams} from '../../components/common/common'
    import {mapState, mapMutations} from 'vuex' 
    import bjTabel from '../../components/common/baojiaTabel'
    import {getOrder,patchOrder,getToken} from "../../service/getData"
    export default {
         data(){
            return {
                search_Res:"",
                idType:[
                    {code:1,value:"身份证"},
                    {code:2,value:"组织机构代码证"},
                    {code:9,value:"营业执照（社会统一信用代码）"},
                ],
                idType1:{0:"微信支付",1:"银联支付"},
                idType2:{0:"未支付",1:"已支付"},
                idType3:{0:"快递配送",1:"自领"},
                dialogImageUrl: '',
                dialogVisible: false,
                tableData:[],
                tableData1:[],
                payment:"0",
                payStatus:'0',
                distribution:'0',
                address:"",
                recipientsPhone:"",
                recipientsName:"",
                change_text:change_text,
                Source:null,
                salesmanUsername:"",
                salesmanPhoneNumber:"",
                salesmanName:"",
                uploddata:"",
                photos:[],
                eidtype:true,
            }
        },
        created(){
            exit(this);
          this.init(); 
        },
        components: {
            bjTabel
        },
        computed: {
            
        },
        methods: {
            async init(){
                if(!JSON.parse(sessionStorage.getItem("baojia"))){
                    layer("warning","请先报价",this)
                    this.$router.go(-1);
                    return;
                }
                if(!sessionStorage.tableData||!sessionStorage.tableData1||!sessionStorage.Source){
                    layer("warning","请预约出单",this)
                    this.$router.push("suboffer");
                    return;
                }
                let param = getPrams(location.href);
                if(param&&param.type == "read"){
                    this.eidtype = false;
                }
    
                this.search_Res = JSON.parse(sessionStorage.getItem("baojia"));
                let data = await getOrder({orderId:this.search_Res.order.orderId});
                if(data.code == 0){
                    let res = data.res;
                    let arr = ["payment","payStatus","distribution","recipientsName","recipientsPhone","salesmanUsername","salesmanPhoneNumber","salesmanName","address"]
                    initData(this,res,arr);
                    if(param&&param.type == "read"){
                        this.photos = res.photos;
                    }
                }
                this.tableData = JSON.parse(sessionStorage.tableData);
                this.tableData1 = JSON.parse(sessionStorage.tableData1);
                console.log(this.payment)
                if(!JSON.parse(sessionStorage.Source)){
                    layer("error","请预约出单",this)
                    return
                }
                this.Source = sessionStorage.Source;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(res,file) {
                this.dialogImageUrl = qnUrl+res.hash;
                this.photos.push(this.dialogImageUrl);
            },
            async submit(index=2){
                let check = inputCheck([
                    [!this.recipientsName,"请填写收件人姓名"],
                    [!this.recipientsPhone,"请填写收件人电话"],
                    [!this.address,"请填写收件人地址"],
                    ],this)
                if(check == -1){
                    return;
                }
                let arr = ["payment","payStatus","distribution","recipientsName","recipientsPhone","address"];
                let objadd = initData([],this,arr)
                let obj = {
                    orderId:this.search_Res.order.orderId,
                    approvalStatus:String(index),
                    photos:this.photos,
                    Source:Number(this.Source),
                }
                obj = Object.assign(obj,objadd);
                let  data = await patchOrder(obj);
                if(data.code == 0){
                    layer("success","提交成功",this);

                    this.$router.push("sureorder");
                }else{
                    layer("error",data.res.ch,this);
                }
            },
            async setToken(){
                let data = await getToken();
                this.uploddata = {
                    token:data.res
                }
            },
            viewimg(src){
                this.dialogImageUrl = src;
                this.dialogVisible = true;
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
        .offerinput{
            max-width: 1.6rem;
        }
        .address{
            max-width: 3rem;
        }
        .offerinputid{
            max-width: 2.6rem;
        }
        .botline{
            padding: .1rem 0;
            border-bottom:1px solid #ccc;
        }
        >div{
            width: 80%; 
            margin-left: 10%;
            margin-bottom: .16rem;
            h3{
                padding: 4px 0;
            } 
            .el-row{
                background: #F8F8F8;
                padding: .08rem .1rem;
                color:#393939;
            }
            .upload{
                padding: .2rem 0 .2rem .4rem;
                border: 1px solid #CCC;
            }
            .tbinfo{
                .el-row{
                    padding: .1rem .1rem;
                }
                padding-bottom: .15rem;
                background: #F8F8F8;
            }
            .dowmload{
                padding-left: .1rem;
                border: 1px solid #CCC;
                ul{
                    overflow: hidden;
                }
                li{
                    width: 25%;
                    float: left;
                    padding: .1rem .1rem;
                    img{
                        width: 100%;
                        border:1px solid #ccc;
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
                    display: block;
                    float: left;
                    padding: .1rem .4rem;
                    border-radius: 5px;
                    background: #D9534F;
                    color: white;
                    border: 1px solid #ccc;         
                }
            }
            
        }
    }
    
</style>
