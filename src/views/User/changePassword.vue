<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>更改密码</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="title">更改密码</h3>
        <el-form label-width="80px" :model="formData" class="form">
            <el-form-item label="原密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="formData.new_password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formData.new_password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" @click="handleEditPassword" :loading="isLoading">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            const validatePassword = (rule, value, callback) => {
                if(value === ""){
                    callback(new Error("请输入密码"))
                }else{               
                    callback()
                }
            }
            return {
                formData: {
                    password: "",
                    new_password: "",
                },
                isLoading: false,
                rules: {
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    new_password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleEditPassword() {
                this.isLoading = true
                this.$axios.put("/user/password", this.formData).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$store.commit("CHANGE_USERINFO", res.data)
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.isLoading = false

                }).catch(err => {
                    this.isLoading = false
                })
            }
        }
    }
</script>

<style scoped>
    .form {
        width: 400px;
        position: absolute;
        /* left: 50%;
        transform: translate(-50%) */
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