<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="选择门类"></el-step>
      <el-step title="选择门类字段"></el-step>
      <el-step title="配置表单项"></el-step>
	  <el-step title="编辑表单"></el-step>
    </el-steps>
    <div v-show="active===0">
      <el-table
        v-loading="cateLoading"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width:100%;"
		row-key="id"
      >
        <el-table-column type="index" width="50">
			
		</el-table-column>
        <el-table-column property="cateName" label="门类名称" width="200">
		</el-table-column>
        <el-table-column property="tableName" label="表名" width="140">
		</el-table-column>
        <el-table-column property="cateType" label="分类">
		</el-table-column>
      </el-table>
    </div>
    <div v-show="active===1">
      <el-table
	  	row-key="id"
	  	v-loading="fieldLoading"
        ref="multipleTable"
        :data="fieldTableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55">
		</el-table-column>
        <el-table-column prop="fieldName" label="字段英文名" width="160">
        </el-table-column>
        <el-table-column prop="fieldCaption" label="字段中文名" width="160">
		</el-table-column>
        <el-table-column prop="fieldType" label="字段类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="inputMethod" label="录入方式" show-overflow-tooltip>
		</el-table-column>
      </el-table>
    </div>
	<div v-show="active===2">
      <el-table
	  	row-key="id"
        :data="multipleSelection"
        tooltip-effect="dark"
        style="width: 100%;"
      >
        <el-table-column prop="fieldName" label="字段英文名" width="160">
        </el-table-column>
        <el-table-column prop="fieldCaption" label="字段中文名" width="160">
		</el-table-column>
        <el-table-column prop="fieldType" label="字段类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="inputMethod" label="录入方式" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="itemLabel" label="已选表单项" show-overflow-tooltip>
		</el-table-column>
		<el-table-column label="选择表单项" show-overflow-tooltip>
			<template slot-scope="scope">
				<div class="bowen-aside">
				　　<FormItem @sendFormItem="getFormItem" :fieldId=scope.row.id></FormItem>
				</div>
			</template>
		</el-table-column>
      </el-table>
    </div>
	<div v-show="active===3">
		<FormDesign></FormDesign>
	</div>
    <el-button style="margin-top: 12px;" @click="prev" v-if="active==1 || active == 2 || active == 3">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" v-if="active==0 || active == 1 || active == 2">下一步</el-button>
  </div>
</template>

<script>
import requestApi from '../../utils/request';
import { apiHost } from '../../utils/config';
import FormItem from './form-item';
import FormDesign from '../editor/form//aside';

export default {
  components: {
	  FormItem,
  },
  data() {
    return {
      active: 0,
      tableData: [],
	  fieldTableData: [],
	  multipleSelection: [],
      currentRow: null,
	  cateLoading: true,
	  fieldLoading: false,
    };
  },

  methods: {
    next() {
      if (!this.currentRow || this.currentRow.id == undefined) {
        this.$message({
          message: '请先选择一条数据',
          type: 'warning',
        });
        return;
      }
      if (this.active++ > 3) {
        this.active = 0;
      }
      if (this.active == 1) {
        this.selectFieldByList();
      }
    },
    prev() {
      if (this.active-- < 0) {
        this.active = 0;
      }
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getSysCategoryList() {
      this.cateLoading = true;
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
    selectFieldByList() {
      this.fieldLoading = true;
      return requestApi(
        `${apiHost}/dossierWeb/sysCategoryField/selectByList`,
        'POST',
        { data: { tableName: this.currentRow.tableName } },
      )
        .then(result => {
		  this.fieldLoading = false;
		  this.$nextTick(()=>{
			  this.fieldTableData = result.data;
		  })
        })
        .catch(e => {
          this.$message({
            message: e.message,
            type: 'error',
          });
          this.fieldLoading = false;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
		});
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
	},
	getFormItem(data, fieldId) {
		let multipleSelection = this.multipleSelection.map(item => {
			if(item.id === fieldId) {
				item.itemLabel = data.label;
				item.itemType = data.type;
			}
			return item;
		})
		this.multipleSelection = multipleSelection;
	}
  },
  mounted() {
    this.getSysCategoryList().then(() => {});
  },
  created() {},
};


</script>
<style lang="less">
.bowen-aside {
  background-color: rgb(238, 241, 246);
  .el-tag.item {
    cursor: pointer;
    font-size: 14px;
    height: 60px;
    line-height: 1.2;
    padding: 10px;
    text-align: center;
    margin: 5px;
    .icon-svg,
    [class^='el-icon'] {
      width: 1.3em;
      height: 1.3em;
    }
    span {
      display: block;
    }
  }
  .el-input-number--mini {
    width: 100px;
  }
}
</style>