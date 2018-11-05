<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isShow">添加图书</el-breadcrumb-item>
            <el-breadcrumb-item v-else>编辑图书</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title" v-if="!isShow">添加图书</h3>
            <h3 class="title" v-else>编辑图书</h3>
            <el-form :label-position="right" label-width="80px" :model="formData" class="form">
                <el-form-item label="链接">
                    <el-input v-model="formData.url"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                    <el-switch v-model="isUpload" active-text="手动上传" inactive-text="网址上传">
                    </el-switch>
                    <el-input v-model="formData.img" v-if="!isUpload"></el-input>
                    <Upload v-model="formData.img" v-else></Upload>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formData.typeId" class="category">
                        <el-option v-for="(item,index) in categoryData" :key="index" :label="item.title" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="category" type="primary" @click="handleAddBook" v-if="!isShow">确认添加</el-button>
                    <el-button class="category" type="primary" @click="handleEditBook" v-else>确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                    url: "",
                    author: "",
                    img: "",
                    typeId: ""
                },
                
                isUpload: false,   // 手动上传图片  默认为false
                right: "right",    // form 表单右对齐
                categoryData: [],  // 分类数据
                isShow:false       // 判断 添加/修改页面
            }
        },
        methods: {
            getCategory() {   // 获取分类的数据
                this.$axios.get("/category",{pn:this.page,size:10}).then(res => {
                    this.count = res.count
                    this.categoryData = res.data
                })
            },
            handleAddBook() {  // 提交添加按钮
                this.$axios.post("/book", this.formData).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message.success("添加成功")
                        setTimeout(() => {
                            this.$router.push("/layout/bookList")
                        }, 1000)
                    } else {
                        this.$message.error("出错了")
                    }
                })
            },
            handleEditBook(){ // 提交修改按钮
                this.$axios.post(`/book/${this.$route.query.id}`,this.formData).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push("/layout/bookList")
                        },1000)
                    }
                })
            },
            getEditData(){ // 获取修改的数据
                this.$axios.get(`/book/${this.$route.query.id}`).then(res=>{
                    // this.formData = {
                    //     ...this.formData,
                    //     ...res.data,
                    //     // category:res.data.book.title    // 回填分类ID
                    // }
                    this.formData = res.data
                })
            }         
        },
        created() {
            this.getCategory()
            if(this.$route.name == "editBook"){    // 监听路由
                    this.isShow = true
                }else{
                    this.isShow = false
            }
            if(this.isShow){
                this.getEditData()
            }
        },
        watch:{
            $route(to,from){
                if(to.name == "editBook"){    // 监听路由
                    this.isShow = true
                }else{
                    this.isShow = false
                    this.formData = {    // 如果为添加页面 则清空数据
                        url: "",
                        author: "",
                        img: "",
                        typeId: ""
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .form {
        width: 400px;
    }
    .category{
        width: 100%;
        box-sizing: border-box;
    }
</style>