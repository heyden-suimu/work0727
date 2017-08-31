1<template>
    <div class="in_content">
        <div class="addoffer">
            <el-tabs v-model="activeName" @tab-click="handleClick" >               
                <el-tab-pane label="车牌号" name="first">
                    <div class="tab-left"><span>车牌号</span></div>                
                    <div style="" >                      
                      <el-input placeholder="" v-model="LicenseNo" @change="setString" :maxlength='7'>               
                        <el-select v-model="CityCode" slot="prepend" placeholder="京" style="width:.8rem;" class="ded">
                          <el-option v-for='(list,index) in List' :label="list.provinceShort" :value="list.code" class="left"></el-option>
                        </el-select>
                      </el-input>
                    </div>
                </el-tab-pane>
                <div class="el-tab-pane city"> 
                    <div class="tab-left"><span>投保地区</span></div>  
                    <el-select v-model="insCIty"  placeholder="北京">
                      <el-option v-for="(item,index) in city" :label="item.name" :value="item.code"></el-option>
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
    import {exit,layer} from '../../components/common/common'
    import {getxbInfo} from "../../service/getData"
    export default {
    	data(){
            return{
                activeName:"first",
                LicenseNo:"",
                CityCode:1,
                insCIty:1,
                List:[{provinceShort:"京",code:1}],
                city:null,
            }
        },
        created(){

        },
        mounted(){
            exit(this);
            this.init();
        },
        components:{
   
        },
        props: [],
        computed: {
            ...mapState([
                'cityInfo',
                "userinfo"
            ]),
        },
        methods: {
            ...mapActions([
                'getCityInfo',
                "getUserInfo"
            ]),
            init(){
                if(!sessionStorage.cityInfo){
                    this.$store.dispatch('getCityInfo').then(()=>{
                        this.List = this.$store.state.cityInfo;
                        this.city = this.List;
                    })
                }else{
                    this.List = JSON.parse(sessionStorage.cityInfo);
                    this.city = this.List;
                }
                if(!this.$store.state.getUserInfo){
                    this.getUserInfo()
                }
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            setString(){
                // [...this.LicenseNo].map((itme,index,arr)=>{
                //     if(0<=arr[0]<=9&&a<arr[0]<z){

                //     }
                // })
                this.LicenseNo = this.LicenseNo.toUpperCase()
            },
            async add_offer(){
                exit(this);
                if(!this.LicenseNo){
                    layer('error',"请输入车牌号",this);
                    return
                }
                let list = this.List.filter((list)=>{
                    // debugger
                    return list.code == this.CityCode
                })
                let pram ={
                    LicenseNo:list[0].provinceShort+this.LicenseNo,
                    CityCode:this.CityCode,
                    username:JSON.parse(sessionStorage.getItem("userInfo")).username,
                }
                let load = this.$loading({body:true,text:"加载中...",customClass:"loading"})
                let data = await getxbInfo(pram);
                load.close();
                if(data.code == 0){
                    sessionStorage.setItem("xbpram",JSON.stringify(data.res));
                    sessionStorage.setItem("CityCode",this.insCIty);
                    this.$router.push("newoffer");          
                }else{
                    layer("error","未获取到续保信息",this)
                }
            },
            git(){
                alert(this.CityCode)
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .loading{
        background: red;
    }
    .in_content{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: scroll;
        background: #fff;
        .breadCrum{
            position: relative;
            left: 5%;
            top:.3rem;
            margin-bottom: .2rem;
        }
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
