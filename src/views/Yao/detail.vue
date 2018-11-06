<template>
    <div class="container">
        <div class="header">
            <i class="iconfont icon-neirong"></i>
            <span>内容详细</span>
        </div>
        <div class="table">
            <div class="desc">所有相片信息列表</div>
            <el-form :inline="true" class="form">
                <el-form-item label="编号">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width:800px">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column property="name" label="名称">11</el-table-column>
                <el-table-column property="photo" label="相册">11</el-table-column>
                <el-table-column property="author" label="添加人">11</el-table-column>
                <el-table-column property="rank" label="点击排行">11</el-table-column>
                <el-table-column property="photoItem" label="相片">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img">
                    </template>
                </el-table-column>
                <el-table-column label="查看详情">
                    <el-button type="primary">查看详情</el-button>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="100">
            </el-pagination>
            <div class="footer">
                以上数据共一条，打印本页
            </div>
        </div>

        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background: #22bb99;
        padding: 10px;
    } 
    .table{
        margin: 20px;
    }

        .desc {
            // background: #f1f9f5;
            line-height: 2;
            border: 2px solid #f1e7e7
        }
    .form{
        margin: 10px;
    }
    .footer{
        color: #888;
        font-size: 14px;
        margin-top: 10px;
    }
</style>