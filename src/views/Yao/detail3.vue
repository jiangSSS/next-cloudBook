<template>
    <div>
        <el-form :label-position="right" label-width="80px" :model="formData" class="form">
                <el-form-item label="用户名" required>
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="姓名" required>
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话" required>
                    <el-input v-model="formData.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="formData.qq"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-switch v-model="isUpload" active-text="手动上传" inactive-text="网址上传">
                    </el-switch>
                    <el-input v-model="formData.img" v-if="!isUpload"></el-input>
                    <Upload v-model="formData.img" v-else></Upload>
                </el-form-item>
                <el-form-item label="籍贯">
                    <el-input v-model="formData.old_address"></el-input>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input v-model="formData.address"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formData.sex">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">注册</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
    import Upload from "@/components/imgUpload/imgUpload"
    export default {
        components:{
            Upload
        },
        data(){
            return{
                formData:{

                },
                isUpload:false
            }
        }
    }
</script>

<style scoped>
    .form{
        width: 400px;
    }
</style>