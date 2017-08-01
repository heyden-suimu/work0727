<template>
    <div class="incontent">
       <div>
            <h3>业务员信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>业务员姓名：</span><span>{{search_Res.LicenseNo}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>业务员账号：</span><span>{{search_Res.RegisterDate}}</span>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>业务员联系方式：</span><span>{{search_Res.RegisterDate}}</span>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>被保人信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple">
                  <span>车主姓名：</span><el-input v-model="search_Res.LicenseOwner" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件号码：</span><el-input v-model="search_Res.CredentislasNum" class="offerinputid"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>投保信息</h3>
            
        </div>
        <div>
            <h3>支付信息</h3>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType1"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                  <span>证件类型：</span>
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType2"
                      :key="index"
                      :label="item"
                      :value="index+1">
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
                  <el-select v-model="search_Res.InsuredIdType" placeholder="">
                    <el-option
                      v-for="(item,index) in idType3"
                      :key="index"
                      :label="item"
                      :value="index+1">
                    </el-option>
                  </el-select>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="10"><div class="grid-content bg-purple">
                  <span>业务员姓名：</span><el-input v-model="search_Res.InsuredMobile" class="offerinput"></el-input>
              </div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">
                  <span>业务员账号：</span><el-input v-model="search_Res.InsuredMobile" class="offerinput"></el-input>
              </div></el-col>
            </el-row>
        </div>
        <div>
            <h3>上传影像</h3>
            <div class="upload">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="foot">
            <div>
                <button  @click="submit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import{get_suboffer,search_res,idType} from "../../service/data"
    import {mapState, mapMutations} from 'vuex' 
    export default {
        data(){
            return {
                search_Res:search_res,
                idType:idType,
                idType1:["微信支付","银联支付"],
                idType2:["未支付","已支付"],
                idType3:["快递配送","自领"],
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created(){
            
        },
        components: {

        },
        computed: {
            
        },
        methods: {
              handleRemove(file, fileList) {
                console.log(file, fileList);
              },
              handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
              },
              submit(){

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
