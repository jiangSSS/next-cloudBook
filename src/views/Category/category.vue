<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">分类列表</h3>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="分类名称" width="170"></el-table-column>
                <el-table-column property="books.length" label="书籍数量" width="150"></el-table-column>
                <el-table-column property="index" label="排序" width="150"></el-table-column>
                <el-table-column label="图标" width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="_id" label="编号"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleDetail(scope.row._id)" size="mini">详情</el-button>
                        <el-button type="primary" @click="handleEdit(scope.row._id)" size="mini">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row._id)" size="mini">删除</el-button>
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
        data(){
            return{
                tableData:[],
                page:1,
                count:0             
            }
        },
        methods:{
            pageChange(page){
                this.page = page
                this.getData()
            },
            getData(){
                this.$axios.get("/category",{pn:this.page,size:10}).then(res=>{
                    this.count = res.count
                    this.tableData = res.data
                })
            },
            // 查看分类详情
            handleDetail(){

            },
            // 修改分类
            handleEdit(){

            },
            // 删除分类
            handleDelete(){
                
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
    .img{
        width: 80px;
        height: 100px;
    }
    .page{
        text-align: center;
        margin-top: 30px;
    }
</style>