<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加图书</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">添加图书</h3>
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
                    <el-button class="category" type="primary" @click="handleAddBook">确认添加</el-button>
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
                page:1,
                isUpload: false,   // 手动上传图片  默认为false
                right: "right",    // form 表单右对齐
                categoryData: [],  // 分类数据
            }
        },
        methods: {
            getCategory() {   // 获取分类的数据
                this.$axios.get("/category", { pn: this.page }).then(res => {
                    this.categoryData = [...this.categoryData,...res.data]
                    if (res.data.length == 10) {
                        this.page = this.page + 1
                        this.getCategory()
                    }
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

        },
        created() {
            this.getCategory()
        },
    }
</script>

<style scoped lang="scss">
    .form {
        width: 400px;
        position: absolute;
        /* left: 50%;
        transform: translate(-50%)      */
        transform: translate(100%)
    }

    .container {
        position: relative;
    }

    .category {
        width: 100%;
        box-sizing: border-box;
    }
</style>