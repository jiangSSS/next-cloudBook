<template>
    <div class="header-warp">
        <h1 class="logo">logo</h1>
        <h2 class="fll">云书后台管理系统</h2>
        <div class="userInfo flr">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="../../assets/logo.png" class="user-img">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {

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
                width: 20px;
                height: 20px;
            }
        }      
    }
   
    
</style>