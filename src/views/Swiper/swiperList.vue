<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">轮播图列表</h3>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="轮播图标题"></el-table-column>
                <el-table-column label="头图">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="index" label="排序" width="140"></el-table-column>
                <el-table-column property="sort" label="类名" width="140"></el-table-column>
                <el-table-column property="book.title" label="图书"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :page-size="10"
            @current-change="pageChange"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                page:1,
                count:0
            }
        },
        methods: {
            pageChange(page){   // 分页
                this.page = page
                this.getData()
            }, 
            getData() {  // 获取轮播图列表数据
                this.$axios.get("/swiper",{pn:this.page,size:10}).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },      
            handleEdit(id){  // 跳转到修改页面
                this.$router.push({path:"/layout/editSwiper",query:{id}})
            },
            handleDelete(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/swiper/delete",{ids:id}).then(res=>{
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
    }
</script>

<style scoped>
    
    .img{
        width: 70px;
        height: 90px;
    }
    .page{
        text-align: center;
        margin-top: 30px;
    }
</style>