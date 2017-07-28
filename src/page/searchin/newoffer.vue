<template>
    <div class="in_content">
        <div>
            <h3>车辆信息</h3>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </div>        
        <div>
            <h3>车主信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        <div>
            <h3>被保人信息</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        <div>
            <div><h3>投保人信息</h3><el-checkbox v-model="checked" style="color:rgb(234, 65, 60);">投保人与被保险人一致</el-checkbox></div>
            <el-row v-if="!checked">
              <el-col :span="8"><div class="grid-content bg-purple">qew</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row v-if="!checked">
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        <div>
            <h3>报价/核保公司</h3>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        <div>
            <h3>起保时间</h3>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
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
                city:["上海","北京","天津"],
                checked:true,
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
        font-size: 14px;
       
    }

    
</style>
