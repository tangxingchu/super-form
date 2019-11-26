<template>
  <el-table
    v-loading="cateLoading"
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width:100%;"
  >
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column property="cateName" label="门类名称" width="200"></el-table-column>
    <el-table-column property="tableName" label="表名" width="140"></el-table-column>
    <el-table-column property="cateType" label="分类"></el-table-column>
  </el-table>
</template>
<script>
import requestApi from '../../utils/request';
import { apiHost } from '../../utils/config';

export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      cateLoading: true,
    };
  },
  getSysCategoryList() {
      this.cateLoading = true;
      this.tableData = [];
      return requestApi(
        `${apiHost}/dossierWeb/sysCategory/getSysCategoryList`,
        'POST',
        {},
      )
        .then(result => {
          this.cateLoading = false;
          this.tableData = result.data.filter(item => item.tableName);
        })
        .catch(e => {
          this.$message({
            message: e.message,
            type: 'error',
          });
          this.cateLoading = false;
        });
    },
  mounted() {
    this.getSysCategoryList().then(() => {});
  },
};
</script>