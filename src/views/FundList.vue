<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="450"
                border
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="收支类型"
                    align='center'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="收支描述"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="收入"
                    align='center'
                    width="170"> 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="支出"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cash"
                    label="账户现金"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column label="操作" prop="operation" fixed="right" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      type="warning"
                      size="small"
                      icon="edit"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      icon="delete"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default {
  name: "fundlist",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(row,index) {
      // 编辑
      console.log(row,index);
    },
    handleDelete(row, index) {
      // 删除
      console.log(row,index);
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>