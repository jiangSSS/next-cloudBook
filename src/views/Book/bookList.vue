<template>
    <div class="content-warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图书列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">图书列表</h3>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="书名"></el-table-column>
                <el-table-column label="书籍头图" width="160">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="index" label="书籍排序" width="140"></el-table-column>
                <el-table-column property="author" label="作者" width="140"></el-table-column>
                <el-table-column property="updateTime" label="时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class="page"
            background 
            layout="prev, pager, next"
            @current-change="currentPage"
            :page-size="10"        
            :total="200">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                count:0,
                page:1,
                
            }
        },
        methods: {
            getData() {
                this.$axios.get("/book", {pn:this.page,size:10}).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },  
            currentPage(page){
                this.page = page
                this.getData()
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