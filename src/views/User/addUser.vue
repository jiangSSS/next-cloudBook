<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isShow">添加管理</el-breadcrumb-item>
            <el-breadcrumb-item v-else>个人详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="title" v-if="!isShow">添加管理</h3>
        <h3 class="title" v-else>个人详情</h3>
        <el-form :model="formData" label-width="80px" class="form">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" v-if="!isShow"></el-input>
                <el-input v-model="formData.password" v-else disabled></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formData.new_password" v-if="!isShow"></el-input>
                <el-input v-model="formData.new_password" v-else disabled></el-input>
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
                <el-button class="submit" type="primary" @click="handleAddUser" v-if="!isShow" :loading="isLoading">立即创建</el-button>
                <el-button class="submit" type="primary" @click="handleBack" v-else>返回</el-button>
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
                isShow: false,
                isLoading:false
            }
        },
        methods: {
            handleAddUser() {
                this.isLoading = true
                if (!(this.formData.username && this.formData.password)) {
                    this.$message.error("请输入用户名或密码")
                } else if (this.formData.password.length < 5) {
                    this.$message.error("密码长度不够")
                } else if (this.formData.password != this.formData.new_password) {
                    this.$message.error("两次输入的密码不一样")
                } else {
                    this.$axios.post("/user", this.formData).then(res => {
                        if (res.code == 200) {
                            this.$message.success("添加成功")
                            setTimeout(() => {
                                this.$router.push("/layout/userList")
                            }, 1000)
                        } else {
                            this.$message.error(res.msg)
                        }
                        this.isLoading = false
                    }).catch(err=>{
                        this.isLoading = false
                    })
                }
            },
            handleBack() {
                this.$router.push("/layout/userList")
            },
            getUserDetail() {        // 查看用户详细信息页面
                this.$axios.get(`/user/${this.$route.query.id}`).then(res => {
                    this.formData = res.data
                })
            }
        },
        created() {         
            if (this.$route.name == "UserDetail") {
                this.isShow = true
            } else {
                this.isShow = false
            }
            if(this.isShow){
                this.getUserDetail()
            }
        },
        watch: {
            $route(to, from) {
                if (to.name == "UserDetail") {
                    this.isShow = true
                } else {
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

    .submit {
        width: 100%;
        box-sizing: border-box;
    }
</style>