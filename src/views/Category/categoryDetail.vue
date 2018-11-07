<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/category' }">分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>分类详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">分类列表  -  <span>{{categoryTitle}}</span></h3>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="书籍名称" width="180"></el-table-column>
                <el-table-column label="图标" width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="author" label="作者" width="150"></el-table-column>   
                <el-table-column property="index" label="排序" width="120">
                    <template slot-scope="scope">
                        <el-tag size="small">{{scope.row.index}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column property="createTime" label="创建日期" width="220"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="" @click="handleDetail(scope.row)" size="mini">生成轮播图</el-button>
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
                categoryTitle:"",
                page:1,
                count:0  ,           
            }
        },
        methods:{
            pageChange(page){
                this.page = page
                this.getData()
            },
            getData(){
                this.$axios.get(`/category/${this.$route.query.id}/books`,{pn:this.page,size:10}).then(res=>{
                    console.log(res);          
                    this.count = res.count
                    this.tableData = res.data.books,
                    this.categoryTitle = res.data.title
                })
            },
            // 生成轮播图
            handleDetail(data){
                console.log(data)
                let params = {
                    title:data.title,
                    img:data.img,
                    book:data._id,
                    index:data.index
                }
                this.$axios.post("/swiper",params).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push("/layout/swiperList")
                        })
                    }
                })
            },
            // 修改
            handleEdit(id){
                this.$router.push({ path: "/layout/editBook", query: { id } })
            },
            // 删除
            handleDelete(id){
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/book/${id}`).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            this.getData()
                        }            
                    })                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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