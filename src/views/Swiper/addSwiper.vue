<template>
    <div class="content-warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isShow">添加轮播图</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改轮播图</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title" v-if="!isShow">添加轮播图</h3>
            <h3 class="title" v-else>修改轮播图</h3>
            <el-form :label-position="left" label-width="100px" :model="formData" class="form">
                <el-form-item label="轮播图标题">
                    <el-input v-model="formData.title" class="input"></el-input>
                </el-form-item>
                <el-form-item label="轮播图类别">
                    <el-select v-model="formData.category" class="input" @change="categoryChange">
                        <el-option v-for="(item,index) in categoryData" :key="index" :label="item.title" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="book-item clearfix" v-if="getBookItem[0]">
                    <div class="img-warp fll">
                        <img :src="getBookItem[0].img">
                    </div>
                    <div class="book-desc fll">
                        <div class="title">
                            标题：{{getBookItem[0].title}}
                        </div>
                        <div class="author">
                            作者：{{getBookItem[0].author}}
                        </div>
                    </div>
                </div>
                <el-form-item label="排序">
                    <el-input-number v-model="formData.index" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="头图" class="input">
                    <el-switch v-model="isUpload" active-text="网址上传" inactive-text="手动上传">
                    </el-switch>
                    <el-input v-model="formData.img" v-if="isUpload" class="input"></el-input>
                    <Upload v-model="formData.img" v-else></Upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddSwrper" v-if="!isShow">确认添加</el-button>
                    <el-button type="primary" @click="handleSave" v-else>保存修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="书籍列表" :visible.sync="isShowDialog">
            <el-table :data="bookData" width="auto">
                <el-table-column property="title" label="书名"></el-table-column>
                <el-table-column label="头图">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img">
                    </template>
                </el-table-column>
                <el-table-column property="author" label="作者"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" small @click="handleAddBook(scope.row._id)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import Upload from "@/components/imgUpload/imgUpload.vue"
    export default {
        components: {
            Upload
        },
        data() {
            return {
                formData: {
                    title: "",
                    img: "",
                    category: "",
                    book: "",
                    index: ""
                },
                isUpload: false,
                left: "left",
                categoryData: [],
                bookData:[],
                isShowDialog:false, // 图书列表弹框
                isShow:false      // 判断 添加/修改页面
            }
        },
        methods: { 
            getCategory() {   // 获取分类
                this.$axios.get("/category").then(res => {
                    this.categoryData = res.data
                })
            },
            async getBookData(){  // 根据图书分类获取相应的图书数据
                const res = await this.$axios.get(`category/${this.formData.category}/books`).then(res=>{
                    this.bookData = res.data.books
                })
            },
            categoryChange(){    // 选择一个分类弹出相应的图书列表
                this.isShowDialog = true        // 图书列表弹框出现
                this.getBookData()
            },
            handleAddBook(id){   // 从分类中选择一本书添加到轮播图
                this.formData.book = id
                this.isShowDialog = false       // 选择完成后图书列表弹框关闭
            },      
            handleAddSwrper() {    // 提交添加轮播图
                this.$axios.post("/swiper", this.formData).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message.success("添加成功")
                        setTimeout(() => {
                            this.$router.push("/layout/swiperList")
                        }, 1000)
                    }
                })
            },
            handleSave(){    // 获取到修改的数据
                this.$axios.put(`/swiper/${this.$route.query.id}`,this.formData).then(res=>{
                    this.formData = res.data
                })
            },
        },
        computed:{
            getBookItem(){
                if(this.formData.book){   //判断有值则用户选择了一本书
                    return this.bookData.filter(item => item._id == this.formData.book)
                } else{
                    return []
                }
            }
        },
        created() {
            this.getCategory()
            if(this.$route.name == "editSwiper"){
                    this.isShow = true
                } else {
                    this.isShow = false
            }
            if(this.isShow){
                this.handleSave()
            }
        },     
        watch:{
            $route(to,from){  // 监听路由
                if(to.name == "editSwiper"){
                    this.isShow = true
                } else {
                    this.isShow = false   // 如果为添加路由 则清空数据
                    this.formData = {
                        title: "",
                        img: "",
                        category: "",
                        book: "",
                        index: ""
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .form {
        margin-left: 420px;
    }

    .input {
        width: 400px;
        box-sizing: border-box
    }
    .book-item{
        margin:20px 0;
        width: 467px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        .img-warp img{
            width: 80px;
            height: 100px;
        }
        .book-desc{
            margin-left: 30px;
            .title{
                color: #333;
                font-weight: 700;
                margin-bottom: 20px;
            }
            .author{
                color: #555;
            }
        }       
    }     
    .img{
        width: 60px;
        height: 80px;
    }
</style>