<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isShow">添加管理</el-breadcrumb-item>
            <el-breadcrumb-item v-else>编辑管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="formData" label-width="80px" class="form">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>                 
            <el-form-item label="密码" >
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formData.new_password"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <Upload v-model="formData.avatar"></Upload>
            </el-form-item>   
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="formData.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" @click="handleAddUser" v-if="!isShow">立即创建</el-button>
                <el-button type="primary" @click="handleEditUser" v-else>确认修改</el-button>
                <el-button type="primary" @click="handleBack" v-if="isShow">返回</el-button>
            </el-form-item>
        </el-form>
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
                    username: "",
                    password: "",
                    new_password: "",
                    nickname: "",
                    desc: "",
                    avatar: "",
                    email: "",
                },
                isShow:false
            }
        },
        methods: {
            handleAddUser() {
                this.$axios.post("/user",this.formData).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push("/layout/userList")
                        },1000)
                    }
                })
            },
            
            handleBack(){
                this.$router.push("/layout/userList")
            }
        },
        created(){
            this.initData()
            if(this.$route.name == "editUser"){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        watch:{
            $route(to,from){
                if(to.name == "editUser"){
                    this.isShow = true
                }else{
                    this.isShow = false
                    this.formData = {
                        username: "",
                        password: "",
                        new_password: "",
                        nickname: "",
                        desc: "",
                        avatar: "",
                        email: "",
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .form{
        width: 400px;
        margin-top: 30px;
        /* position: fixed;
        left: 45%; */
        
    }
    .submit{
        width: 100%;
        box-sizing: border-box;
    }
</style>