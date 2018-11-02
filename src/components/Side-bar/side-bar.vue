<template>
    <div>
        <el-menu class="el-menu" :router="true" background-color="#304156" text-color="#fff">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/userList">用户列表</el-menu-item>
                    <el-menu-item index="/layout/addUser">添加管理</el-menu-item>
                    <el-menu-item index="/layout/changePassword">修改密码</el-menu-item>
                    <el-menu-item index="/layout/editUserInfo">修改个人信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>分类管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">分类管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/bookList">图书列表</el-menu-item>
                    <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/swiperList">轮播图列表</el-menu-item>
                    <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    .el-menu {
        height: 100vh;
    }
</style>