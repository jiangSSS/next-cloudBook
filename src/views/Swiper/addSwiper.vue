<template>
    <div class="content-warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加图书</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">添加图书</h3>
            <el-form :label-position="right" label-width="80px" :model="formData" class="form">
                <el-form-item label="轮播图标题" class="input">
                    <el-input v-model="formData.url" ></el-input>
                </el-form-item>
                <el-form-item label="轮播图类别" class="input">
                    <el-input v-model="formData.author" ></el-input>
                </el-form-item>
                <el-form-item label="头图" class="input">
                    <el-switch v-model="isUpload" active-text="网址上传" inactive-text="手动上传">
                    </el-switch>
                    <el-input v-model="formData.img" v-if="isUpload" ></el-input>
                    <Upload v-model="formData.img" v-else></Upload>
                </el-form-item>
                
                <el-form-item label="分类">
                    <el-select v-model="formData.typeId">
                        <el-option 
                            v-for="(item,index) in categoryData" 
                            :key="index" 
                            :label="item.title" 
                            :value="item._id">         
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddBook">确认添加</el-button>
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
                isUpload: false,
                right: "right",
                categoryData:[]
            }
        },
        methods: {
            getCategory(){
                this.$axios.get("/category").then(res=>{
                    this.categoryData = res.data
                })
            },
            handleAddBook() {
                this.$axios.post("/book",this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        this.$message.success("添加成功")
                        setTimeout(()=>{
                            this.$router.push("/bookList")
                        },1000)
                    }
                })
            }
        },
        created() {
            this.getCategory()
        }
    }
</script>

<style scoped lang="scss">
    // .form{
    //     text-align: center;
    // }
    .input {
        width: 400px;
    }
</style>