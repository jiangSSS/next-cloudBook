<template>
    <div>
        <el-row>
            <el-col :span="4" style="height:100vh">
                <SideBar></SideBar>
            </el-col>
            <el-col :span="20" style="height:100vh;overflow:scroll" >
                <div>   
                    <Header></Header>
                    <Main></Main>
                </div>        
            </el-col>
        </el-row>
        

    </div>
</template>

<script>
    import SideBar from "@/components/Side-bar/side-bar.vue"
    import Header from "@/components/Header/header.vue"
    import Main from "@/components/Main/main.vue"
    export default {
        components:{
            SideBar,
            Header,
            Main
        }
    }
</script>

<style scoped>

</style>