<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3 class="title">添加分类</h3>
            <el-form label-width="100px" :model="formData" class="form">   
                <el-form-item label="分类名称">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="formData.sort"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-switch v-model="isUpload" active-text="手动上传" inactive-text="网址上传">
                    </el-switch>
                    <el-input v-model="formData.icon" v-if="!isUpload"></el-input>
                    <Upload v-model="formData.icon" v-else></Upload>
                </el-form-item>             
                <el-form-item>
                    <el-button class="input" type="primary" @click="handleAddCategory">确认添加</el-button>
                </el-form-item>
            </el-form>
            </div>
    </div>
</template>

<script>
    import Upload from "@/components/imgUpload/imgUpload.vue"
    export default {
        components:{
            Upload
        },
        data(){
            return{
                formData:{
                    title:"",
                    icon:"",
                    sort:""
                },
                isUpload:false
            }
        },
        methods:{
            handleAddCategory(){     // 添加分类
                this.$axios.post("/category",this.formData).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push("/layout/category")
                        },1000)
                    }
                }).catch(err=>{
                    this.$message.error("添加失败~")
                })
            }
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .container{
        position: relative;
    }
    .form{
        width: 400px;
        position: absolute;
        transform: translate(100%)
    }
    .input{
        width: 100%;
        box-sizing: border-box
    }
</style>