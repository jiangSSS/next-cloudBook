<template>
    <div class="header-warp">
        <h1 class="logo">logo</h1>
        <h2 class="fll">云书后台管理系统</h2>
        <div class="userInfo flr">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img :src="userInfo.avatar" class="user-img">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
                    <el-dropdown-item command="2">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        data(){
            return{

            }
        },
        methods:{
            handleCommand(command){
                if(command == 1){
                    this.$router.push("/layout/editUserInfo")
                }
                if(command == 2){
                    this.$axios.get("/logout").then(res=>{
                        if(res.code == 200){
                            this.$message.success("退出登录成功")
                            // this.$store.commit("CHANHE_USERINFO",null)
                            setTimeout(()=>{
                                this.$router.push("/")  
                            },1000)
                        }else{
                            this.$message.error(res.msg)
                        }            
                    })
                }
            }
        },
        computed:{
            ...mapState(["userInfo"])
        }
    }
</script>

<style scoped lang="scss">
    .header-warp{
        border-bottom: 2px solid #f1f3f5;
        display: flex;
        justify-content: space-between;
        .logo{
            color: transparent;
        }
        h2 {
            font-size: 20px;
            font-weight: bold;
            color: #555;
            text-align: center;
        }
        .userInfo{
            padding: 20px 30px 0 0;
            .user-img{
                width: 30px;
                height: 30px;
            }
        }      
    }
   
    
</style>