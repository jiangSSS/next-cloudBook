<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑图书</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">编辑图书</h3>
            <el-form label-width="80px" :model="formData" class="form">
                <el-form-item label="作者">
                    <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                    <el-switch v-model="isUpload" active-text="手动上传" inactive-text="网址上传">
                    </el-switch>
                    <el-input v-model="formData.img" v-if="!isUpload"></el-input>
                    <Upload v-model="formData.img" v-else></Upload>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="formData.index"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <!-- <el-input v-model="formData.desc"></el-input> -->
                    <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formData.type" class="submit">
                        <el-option 
                            v-for="(item,index) in categoryData" 
                            :key="index" 
                            :label="item.title" 
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary" @click="handleEditBook">提交修改</el-button>
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
                formData: {},
                page: 1,
                categoryData: [],
                isUpload: true
            }
        },
        methods: {
            getCategory() {
                this.$axios.get(`/category`, { pn: this.page }).then(res => {
                    this.categoryData = [...this.categoryData, ...res.data]
                    if (res.data.length == 10) {
                        this.page = this.page + 1
                        // this.getCategory()
                    }
                })
            },
            getData() {
                this.$axios.get(`/book/${this.$route.query.id}`).then(res => {
                    console.log("编辑图书", res)
                    this.formData = res.data
                })
            },
            handleEditBook() {
                let params = {
                    ...this.formData,
                    book_id:this.$route.query.id
                }
                this.$axios.put(`/book`,params).then(res => {
                    console.log("111",res)
                    if (res.code == 200) {
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push(`/layout/bookList`)
                        },1000)           
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message.error('添加失败！');
                })
            }
        },
        created() {
            this.getCategory()
            this.getData()
        }
    }
</script>

<style scoped>
    .container {
        position: relative;
    }

    .form {
        width: 400px;
        position: absolute;
        /* left: 50%;
        transform: translate(-50%) */
        transform: translate(100%)
    }

    .submit {
        width: 100%;
        box-sizing: border-box
    }
</style>