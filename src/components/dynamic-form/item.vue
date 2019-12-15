<style>
.block {
  display: block !important;
  display: flex !important;
}
</style>

<template>
  <el-col :span="item.span">
    <el-form-item :rules="Rules" :label="item.label" :prop="item.key" :class="{'block':item.block}">
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
          v-for="o in item.options||ajaxOptions"
          :is="item.button?'el-radio-button':'el-radio'"
          :key="o.value"
          :label="o.value"
          :disabled="o.disabled"
          :border="item.border"
        >{{ o.label }}</component>
      </el-radio-group>

      <el-checkbox-group v-else-if="item.type==='checkbox'" v-bind="$attrs" v-on="$listeners">
        <component
          v-for="o in item.options||ajaxOptions"
          :is="item.button?'el-checkbox-button':'el-checkbox'"
          :key="o.value"
          :disabled="o.disabled"
          :label="o.value"
          :border="item.border"
        >{{ o.label }}</component>
      </el-checkbox-group>

    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-option
        v-for="(o,index) in item.options || ajaxOptions"
        :key="index"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled"
      >
      </el-option>
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
        ></el-input>
        <el-button :disabled="item.disabled" @click="dialogFormVisible=true">...</el-button>
        <el-dialog :visible.sync="dialogFormVisible" :title="item.label">
          <div v-for="(i,index) of item.options" :key="index" @click="select(i.value)">{{ i.label }}</div>
        </el-dialog>
      </div>

      <div
        v-else-if="item.type==='dialogSelect2'"
        :type="item.subtype"
      >
        <el-input
          :disabled="item.disabled"
          :readonly="true"
          :type="'input'"
          :placeholder="item.placeholder"
          :autosize="item.autosize"
          :value="item.name"
        ></el-input>
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
        <el-button :disabled="item.disabled" @click="dialogFormVisible=true">...</el-button>
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
      <span v-else>未知控件类型</span>
    </el-form-item>
  </el-col>
</template>

<script>
import request from '@/utils/request';
import {getSysDictList, listFonds, queryDictGroupName} from '@/utils/requestDict';
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
      fondsList: [],
      formList: [],
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
    if (this.item.type == 'dialogSelect2') {
      listFonds().then(res => {
        this.fondsList = res.data;
        // console.log(res.data);
      });
    }
  },
  mounted() {
    EventBus.$on('fondsNoChange', (fondsNo) => {
      if(this.item.dictKey) {
        getSysDictList(this.item.dictKey, fondsNo)
          .then(res => {
            let dictList = [];
            res.data.forEach(item => {
              dictList.push({ value: item.dictKey, label: item.dictValue });
            });
            console.log(`结果：${JSON.stringify(dictList)}`);
            // this.$state.
            this.ajaxOptions = dictList;
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
      
    });
  },
  mounted(){

    // queryDictGroupName().then(res => {
    //   console.log("机构："+JSON.stringify(res));
    // })
    EventBus.$on('fondsNoChange', (fondsNo) => {
      //console.log(`item:${JSON.stringify(this.item)}`);
      if (this.item.dictKey) {
        getSysDictList(this.item.dictKey, fondsNo)
          .then(res => {
            let dictList = [];
            res.data.forEach(item => {
              dictList.push({ value: item.dictKey, label: item.dictValue });
            });
            //console.log(`结果：${JSON.stringify(dictList)}`);
            // this.$state.
            this.ajaxOptions = dictList;
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }

    });
  },
  methods: {
    select(iVal) {
      this.$set(this.item, 'value', iVal);
      this.dialogFormVisible = false;
    },
    selectFonds(iVal, fondsNo) {
      // this.formList = this.$store.state.form.formItemList;
      this.$set(this.item, 'name', iVal);
      this.$set(this.item, 'value', fondsNo);
      this.$emit('input', fondsNo);
      this.dialogFormVisible = false;
      // this.getDropDown(fondsNo);
      EventBus.$emit('fondsNoChange', fondsNo)
    },
    // getDropDown(fondsNo) {
    //   // const { optionsUrl, key, type, dictKey } = this.item;
    //   // console.log(this.item);
    //   // if (optionsUrl) {
    //   for (let item of this.formList) {
    //     console.log(`字段：${item}`);
    //     const url =
    //       item.type === 'cascader'
    //         ? '/api/cascader/options'
    //         : '/api/some/options';
    //     if (item.type === 'cascader' || item.type === 'select') {
    //       console.log(
    //         `本页面为模拟预览，已自动重定向到URL:${url}，查看Network以获取格式`,
    //       );
    //       request(`${url}?key=${item.key}`, 'GET')
    //         .then(res => {
    //           console.log(res);
    //           // this.item.options = res
    //           // this.$set(this.item, 'options', res)
    //           this.ajaxOptions = res;
    //           console.log(this.ajaxOptions);
    //         })
    //         .catch(err => {
    //           this.$message.error(err.message);
    //         });
    //       // }
    //       //字典
    //       console.log(`dictKey:${JSON.stringify(item)}`);
    //       if (item.key) {
    //         getSysDictList(item.key, fondsNo)
    //           .then(res => {
    //             console.log(res);
    //             let dictList = [];
    //             res.data.forEach(item => {
    //               dictList.push({ value: item.dictKey, label: item.dictValue });
    //             });
    //             console.log(`结果：${JSON.stringify(dictList)}`);
    //             // this.$state.
    //             this.ajaxOptions = dictList;
    //           })
    //           .catch(err => {
    //             this.$message.error(err.message);
    //           });
    //       }
    //     }
    //     this.$set(this.item, 'options', this.ajaxOptions);
    //   }
    // },
  },
};
</script>
