<template>
    <div class="content-warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="date" label="用户名"></el-table-column>
                <el-table-column property="name" label="昵称"></el-table-column>
                <el-table-column property="address" label="签名"></el-table-column>
                <el-table-column property="address" label="日期"></el-table-column>
                <el-table-column property="address" label="用户头像"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">查看详情</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    
</style>