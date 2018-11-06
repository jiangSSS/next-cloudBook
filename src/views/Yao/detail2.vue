<template>
    <div>
        <el-table :data="tableData" style="width:800px">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column property="news" label="站内新闻">11</el-table-column>
                <el-table-column property="lookNum" label="点击量">11</el-table-column>
                <el-table-column property="date" label="时间">11</el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData: [{
                    news: '苍井空校区开课啦',
                    lookNum: '88',
                    date: '两天前'
                }, {
                     news: '苍井空校区开课啦',
                    lookNum: '88',
                    date: '两天前'
                }, {
                     news: '苍井空校区开课啦',
                    lookNum: '88',
                    date: '两天前'
                }, {
                     news: '苍井空校区开课啦',
                    lookNum: '88',
                    date: '两天前'
                }]
            }
        }
    }
</script>

<style scoped>

</style>