<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="title">修改个人信息</h3>
        <el-form :model="formData" label-width="80px" class="form">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
             <el-form-item label="昵称">
                <el-input v-model="formData.nickname"></el-input>
            </el-form-item>
             <el-form-item label="邮箱">
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
             <el-form-item label="签名">
                <el-input v-model="formData.desc"></el-input>
            </el-form-item>
             <el-form-item label="头像">
                <Upload v-model="formData.avatar"></Upload>
            </el-form-item>
            <el-form-item>
                <el-button class="input" type="primary" @click="handleEditUser">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Upload from "@/components/imgUpload/imgUpload.vue"
    export default {
        components:{
            Upload
        },
        data() {
            return {
                formData:{
                    username:"",                  
                    nickname:"",
                    desc:"",
                    avatar:"",
                    email:""
                }
            }
        },
        methods: {
            getData() {
                this.formData = {
                    ...this.$store.state.userInfo
                }
            },
            handleEditUser() {
                this.$axios.put(`/user/userInfo`,this.formData).then(res => {
                    console.log("修改", res)
                    if (res.code == 200) {      
                        let newInfo = res.data
                        this.$store.commit("CHANGE_USERINFO", newInfo)
                        this.getData()
                        this.$message.success(res.msg)
                    }
                })
            },
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped>
    .form{
        width: 400px;
        position: absolute;
        /* left: 50%;
        transform: translate(-50%) */
        transform: translate(100%)
    }
    .container{
        position: relative;
    }
    .input{
        width: 100%;
        box-sizing: border-box
    }
</style>