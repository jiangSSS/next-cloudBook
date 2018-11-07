<template>
    <div class="container">
        <h1 class="title">欢迎来到XXX后台管理系统</h1>
        <el-form :model="formData" class="form">
            <el-form-item label="用户名">
                <el-input type="password" placeholder="请输入用户名" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" placeholder="请输入密码" v-model="formData.password" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin" class="login" :loading="isLoading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            // const validateUsername = (rule, value, callback) => {
            //     if (!value) {
            //         callback(new Error("必须输入合法用户名"))
            //     } else {
            //         callback()
            //     }
            // }
            // const validatePassword = (rule, value, callback) => {
            //     if (value && value.length >= 5) {
            //         callback()
            //     } else {
            //         callback(new Error("请输入合法的密码"))
            //     }
            // }
            // rules: {
                //     username: [{ validator: validateUsername, trigger: 'blur' }],
                //     password: [{ validator: validatePassword, trigger: 'blur' }]
                // },
            return {
                formData: {
                    username: "",
                    password: ""
                },
                isLoading: false,
            }
        },
        methods: {
            handleLogin() {
                this.isLoading = true
                this.$axios.post("/login", this.formData).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$store.commit("CHANGE_USERINFO", res.data)
                        this.$message.success("登录成功")
                        setTimeout(() => {
                            this.$router.push("/home")
                        }, 1000)
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.isLoading = false
                }).catch(err => {
                    this.isLoading = false
                })
            },
            // validateLogin() {
            //     this.$refs["form"].validate((valid) => {
            //         if (valid) {
            //             this.handleLogin()
            //         } else {
            //             return false;
            //         }
            //     });
            // }
        }
    };
</script>

<style scoped lang="scss">
    .container {
        background: #304165;
        min-height: 100vh;
        overflow: hidden;

        .title {
            color: #ccc;
            text-align: center;
            font-size: 22px;
            margin-top: 100px;
        }

        .form {
            width: 400px;
            height: 300px;
            border-radius: 10px;
            background: #fff;
            margin: 0 auto;
            text-align: center;
            margin: 20px auto;
            padding: 40px;

            .login {
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
</style>