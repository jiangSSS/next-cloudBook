<template>
    <div>
        <el-row>
            <el-col :span="3" style="height:100vh">
                <SideBar></SideBar>
            </el-col>
            <el-col :span="21" style="height:100vh;overflowY:scroll" >
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