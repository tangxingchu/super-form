<style>
.block {
  display: block !important;
  display: flex !important;
}
</style>

<template>
  <el-col :span="item.span">
    <div
      v-if="item.type==='label'"
      :type="'text'"
      :disabled="true"
      :style="[{'color': item.fontColor },{'font-size': item.fontSize + 'px'}, {'text-align': item.align}]">
      <span >{{item.label}}</span>
    </div>
    
    <el-form-item v-else :rules="Rules" :label="item.label" :prop="item.name" :class="{'block':item.block}">
      <el-input v-if="item.type==='input'" v-bind="$attrs" :type="item.subtype" v-on="$listeners"></el-input>

      <el-button v-else-if="item.type==='button'" :disabled="item.disabled">{{ item.value }}</el-button>

      <el-input v-else-if="item.type==='number'" v-bind="$attrs" v-on="$listeners" type="number"></el-input>

      <el-checkbox
        v-else-if="item.type==='switch' && item.appearance==='checkbox'"
        v-bind="$attrs"
        v-on="$listeners"
      ></el-checkbox>
      <el-switch v-else-if="item.type==='switch'" v-bind="$attrs" v-on="$listeners"></el-switch>

      <el-rate
        v-else-if="item.type==='rate'"
        v-bind="$attrs"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        text-color="#ff9900"
        v-on="$listeners"
      ></el-rate>

      <el-color-picker
        v-else-if="item.type==='color'"
        v-bind="$attrs"
        :color-format="item.format"
        v-on="$listeners"
      ></el-color-picker>

      <el-slider
        v-else-if="item.type==='slider'"
        v-bind="$attrs"
        :range="item.isRange"
        v-on="$listeners"
      ></el-slider>

      <el-radio-group v-else-if="item.type==='radio'" v-bind="$attrs" v-on="$listeners">
        <component
          v-for="(o,index) in item.options||ajaxOptions"
          :is="item.button?'el-radio-button':'el-radio'"
          :key="index"
          :label="o.value"
          :disabled="o.disabled"
          :border="item.border"
        >{{ o.label }}</component>
      </el-radio-group>

      <el-checkbox-group v-else-if="item.type==='checkbox'" v-bind="$attrs" v-on="$listeners">
        <component
          v-for="(o,index) in item.options||ajaxOptions"
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          :key="index"
          :disabled="o.disabled"
          :label="o.value"
          :border="item.border"
        >{{ o.label }}</component>
      </el-checkbox-group>

      <el-select v-else-if="item.type==='select'" v-bind="$attrs" v-on="$listeners">
        <el-option
          v-for="(o,index) in item.options || ajaxOptions"
          :key="index"
          :label="o.label"
          :value="o.value"
          :disabled="o.disabled"
        ></el-option>
      </el-select>

      <el-cascader
        v-else-if="item.type==='cascader'"
        v-bind="$attrs"
        :options="item.options||require('element-china-area-data')[item.areaShortcut]||ajaxOptions"
        :clearable="true"
        v-on="$listeners"
      ></el-cascader>

      <el-time-picker
        v-else-if="item.type==='time'"
        :format="item.valueFormat"
        v-bind="$attrs"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        v-on="$listeners"
      ></el-time-picker>

      <el-date-picker
        v-else-if="item.type==='date'"
        :type="item.subtype"
        :format="item.viewFormat||item.valueFormat"
        v-bind="$attrs"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        v-on="$listeners"
      ></el-date-picker>

      <richtext v-else-if="item.type==='richtext'" v-bind="$attrs" v-on="$listeners"></richtext>

      <div
        v-else-if="item.type==='dialogSelect'"
        :type="item.subtype"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-input
          :disabled="item.disabled"
          :type="'input'"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.value"
        >
          <template slot="append">
            <el-button :disabled="item.disabled" @click="dialogFormVisible=true">...</el-button>
          </template>
        </el-input>
        <el-dialog :visible.sync="dialogFormVisible" :title="item.label">
          <div v-for="(i,index) of item.options" :key="index" @click="select(i.value)">{{ i.label }}</div>
        </el-dialog>
      </div>
      <!-- 全宗选择 -->
      <div v-else-if="item.type==='dialogSelect2'" :type="item.subtype">
        <el-input
          :disabled="item.disabled"
          :readonly="true"
          :type="'input'"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.displayName"
        >
          <template slot="append">
            <el-button :disabled="item.disabled" @click="dialogFormVisible=true">...</el-button>
          </template>
        </el-input>
        <el-input
          v-show="false"
          :disabled="item.disabled"
          :type="'input'"
          v-bind="$attrs"
          v-on="$listeners"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.value"
        ></el-input>
        <el-dialog :visible.sync="dialogFormVisible" :title="item.label">
          <div
            v-for="(i,index) of fondsList"
            :key="index"
            @click="selectFonds(i.fondsName,i.fondsNo)"
          >
            <span>{{ i.fondsNo }}</span>
            <span>{{ i.fondsName }}</span>
          </div>
        </el-dialog>
      </div>
      <!-- 机构选择 -->
      <div v-else-if="item.type==='dialogSelect3'" :type="item.subtype">
        <el-input
          :disabled="item.disabled"
          :readonly="true"
          :type="'input'"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.displayName"
        >
          <template slot="append">
            <el-button :disabled="item.disabled" @click="selectSysOrganizationList(item.fondsCode)">...</el-button>
          </template>
        </el-input>
        <el-input
          v-show="false"
          :disabled="item.disabled"
          :type="'input'"
          v-bind="$attrs"
          v-on="$listeners"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.value"
        ></el-input>
        
        <el-dialog :visible.sync="dialogFormVisible1" :title="item.label" width="50%">
          <div style="max-height:300px; overflow:auto;">
            <el-tree
              :data="item.groupList || groupList"
              highlight-current
              :props="defaultProps"
              ref="tree"
              node-key="id"
              @node-click="orgCheckChange"
            ></el-tree>
          </div>
        </el-dialog>
      </div>
      <span v-else>未知控件类型</span>
    </el-form-item>
  </el-col>
</template>

<script>
import request from '@/utils/request';
import {
  getSysDictList,
  listFonds,
  getSysOrganizationList,
  getValueByDictKey,
} from '@/utils/requestDict';
import Richtext from '@/components/tinymce';
import { mapState } from 'vuex';
import EventBus from '@/utils/eventBus';

export default {
  components: {
    Richtext,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ajaxOptions: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      fondsList: [],
      formList: [],
      groupList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      selectOrg: {
        orgsid: [],
      },
    };
  },
  computed: {
    // ...mapState(['form']),
    Rules() {
      const {
        item: { rules },
      } = this;
      if (rules === undefined) return undefined;

      const R = [];

      rules.forEach(rule => {
        if (rule.sql) {
          const validator = (rule2, value, callback) => {
            // eslint-disable-next-line
            request('/api/validate', 'POST', {
              key: rule2.field,
              value,
              sql: rule.sql.replace(/{key}/gi, rule2.field),
            })
              .then(res => {
                // eslint-disable-next-line
                callback(!res || undefined);
              })
              .catch(err => {
                this.$message.error(err.message);
                // eslint-disable-next-line
                callback(false);
              });
          };

          R.push({ validator, message: rule.message, trigger: 'blur' });
        } else {
          R.push(rule);
        }
      });

      return R;
    },
  },
  created() {
    //全宗
    console.log(`类型：${this.item}-${this.item.type}`);
    if (this.item.type == 'dialogSelect2') {
      listFonds().then(res => {
        this.fondsList = res.data;
        // console.log(res.data);
      });
    }
    // if(this.item.type == 'dialogSelect3'){

    // }
  },
  mounted() {
    EventBus.$on('fondsNoChange', fondsNo => {
      if (this.item.dictKey) {
        let params = {
          dictKey: this.item.dictKey,
          fondsCode: fondsNo,
        };
        getValueByDictKey(params)
          .then(res => {
            // console.log("res:"+JSON.stringify(res));
            this.ajaxOptions = [];
            let dictList = [];
            res.data.forEach(item => {
              dictList.push({ value: item.dictKey, label: item.dictValue });
            });
            // console.log(`结果：${JSON.stringify(dictList)}`);
            // this.$state.
            this.ajaxOptions = dictList;
            // console.log("选项："+this.ajaxOptions);
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
      if (this.item.name === 'department') {
        this.currFondsNo = fondsNo;
      }
    });
  },

  methods: {
    orgCheckChange(data, checked, indeterminate) {
      this.$set(this.item, 'displayName', data.label);
      this.$set(this.item, 'value', data.orgCode);
      this.$emit('input', data.orgCode);
      this.dialogFormVisible1 = false;
    },
    select(iVal) {
      this.$set(this.item, 'value', iVal);
      this.dialogFormVisible = false;
    },
    selectFonds(iVal, fondsNo) {
      // this.formList = this.$store.state.form.formItemList;
      this.$set(this.item, 'displayName', iVal);
      this.$set(this.item, 'value', fondsNo);
      this.$emit('input', fondsNo);
      this.dialogFormVisible = false;
      EventBus.$emit('fondsNoChange', fondsNo);
    },
    selectGroup(fondsNo) {},
    selectSysOrganizationList(fondsCode) {
      if (!this.currFondsNo && !fondsCode) {
        this.$message.info('请先选择全宗');
        return;
      }
      this.dialogFormVisible1 = true;
      getSysOrganizationList({ fondsCode: this.currFondsNo || fondsCode})
        .then(res => {
          this.groupList = res.data;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>
