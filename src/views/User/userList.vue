<template>
    <div class="content-warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="username" label="用户名" width="140"></el-table-column>
                <el-table-column label="用户头像" width="140">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="nickname" label="昵称" width="160"></el-table-column>
                <el-table-column property="desc" label="签名"></el-table-column>
                <el-table-column property="updatedTime" label="日期"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleDetail(scope.row._id)">查看详情</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="page" background layout="prev, pager, next" @current-change="pageChange" :page-size="10"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                page: 1,
                count: 0,
            }
        },
        methods: {
            pageChange(page) {
                this.page = page
                this.getData()
            },
              getData() {
                this.$axios.get("user", { pn: this.page, size: 10 }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },
            handleDetail(id){
                this.$router.push({path:"/layout/editUser",query:{id}})
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/user/delete",{userIds:id}).then(res=>{
                         this.$message.success(res.msg)
                         this.getData()
                    })                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        },
        created() {
            this.getData()
        }
    };
</script>

<style scoped lang="scss">
    .img {
        width: 80px;
        height: 100px;
    }

    .page {
        text-align: center;
        margin-top: 30px;
    }
</style>