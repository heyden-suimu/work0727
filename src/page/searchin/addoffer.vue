<template>
    <div class="in_content">
        <div class="addoffer">
            <el-tabs v-model="activeName" @tab-click="handleClick" >               
                <el-tab-pane label="车牌号" name="first">
                    <div class="tab-left"><span>车牌号</span></div>                
                    <div style="" >                      
                      <el-input placeholder="" v-model="input5">                       
                        <el-select v-model="select" slot="prepend" placeholder="京" style="width:.8rem;" class="ded">
                          <el-option v-for='(list,index) in List' :label="list" :value="index" class="left"></el-option>
                        </el-select>
                      </el-input>
                    </div>
                </el-tab-pane>
                <div class="el-tab-pane city"> 
                    <div class="tab-left"><span>投保地区</span></div>  
                    <el-select v-model="select1"  placeholder="北京">
                      <el-option v-for="(item,index) in city" :label="item" value="index"></el-option>
                    </el-select>
                </div>               
            </el-tabs>
            <p class="tips">同一辆车每小时最多报价5次哦~</p>
            <div class='next'><button @click="add_offer">下一步</button></div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
                activeName:"first",
                input5:"",
                select:"",
                select1:"",
                List:['京','津','冀','鲁','豫','黑','辽','吉','晋','浙','皖','沪','闽','渝','赣','鄂','新','湘','宁','粤','藏','琼','桂','川','贵','云','陕','甘','青','苏','港','澳','台'],
                city:["上海","北京","天津"]
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            add_offer(){
                this.$router.push("newoffer")
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .in_content{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: scroll;
        background: #fff;
        .el-tabs{
            width: 40%;
            margin-left: 30%;
            .el-option{
                float: left;
            }
            .city{
                width: 100%;
                position: relative;
                z-index: 100;
                font-size: 14px;
                padding-bottom: .2rem;               
                .el-select{
                    width: 57%;
                    float: right;
                }
                .tab-left{
                    position: absolute;
                    left: .8rem;
                    background: url("../../images/xb_city.png") no-repeat left center;
                    background-size: .4rem .4rem;
                }
            }
            
        }
        .el-tab-pane{
            width: 100%;
            padding-top: .4rem;
            margin-left: -.4rem;
            overflow: hidden;
            div:nth-child(1){
                width: 57%;
                float: right;              
            }   
            .tab-left{
                background: url("../../images/xb_cph.png") no-repeat left center;
                background-size: .4rem .4rem;
                font-size: 14px;
                width: 30%;           
                height: .5rem;
                line-height: .5rem;
                position: absolute;
                left: .4rem;
                top:.4rem;
                span{
                    margin-left: .5rem;
                    color: #333333;
                }
            }        
        }
        p.tips{
            font-size: 12px;
            width: 40%;
            margin-left: 30%;
            padding-left: 1.82rem;
            color: #ccc;
        }
        .next{
            width: 40%;
            margin-left: 30%;
            button{
                margin-top: .24rem;
                width: 57%;
                display: block;
                padding: .16rem 0;
                margin-left: 1.82rem;
                 border: 1px solid #ea413c;
                border-radius: 4px;
                color: #fff;
                background-color: #ea413c;

            }
        }       
    }

    
</style>
