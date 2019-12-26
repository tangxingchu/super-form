<template lang="pug">
  div
    el-form(v-on="$listeners" v-bind="$attrs")
      el-form-item(label="标签名")
        el-input(v-model="formItem.label")
      el-form-item(label="字段名")
        el-input(v-model="formItem.name")
      //- el-form-item(label="默认值" v-if="formItem.optionsUrl===undefined")
        el-select(v-model="formItem.value" clearable :multiple="formItem.multiple")
          el-option(v-for="(o,index) in formItem.options" :key="index" :label="o.label" :value="o.value")
      //- el-form-item(v-else label="数据URL")
        el-input(v-model="formItem.optionsUrl")
      el-form-item(label="配置字典")
        el-select(v-model="formItem.dictKey" placeholder="请选择")
          el-option(v-for="(item,index) in dictGroupData"
            :key="index"
            :label="item.label"
            :value="item.value")
      el-form-item(label="是否多选")
        el-checkbox(v-model="formItem.multiple")
      el-form-item(label="禁用")
        el-checkbox(v-model="formItem.disabled")
      el-form-item(label="栅格列数")
        el-input-number(v-model="formItem.span" controls-position="right" :min="1" :max="24")

    //-editor-options(v-if="formItem.optionsUrl===undefined" :itemOptions="formItem.options")

    //- wtf?
    //- editor-rules(:item-rules.sync="formItem.rules" :item-type="formItem.type")
    editor-rules(:item-rules="formItem.rules" @update:item-rules="n => formItem.rules = n" :item-type="formItem.type" :types="formItem.multiple?'required,length':'required'")

    pre {{formItem}}
</template>

<script>
import EditorRules from '../editor-rules';
import EditorOptions from '../editor-options';
import { listDictGroupName } from '../../../../../utils/requestDict';

export default {
  components: { EditorRules, EditorOptions },
  props: {
    formItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dictGroupData:[],
    }
  },
  mounted: function(){
    listDictGroupName().then(res => {
        let dictGroupData = [];
        res.data.forEach(item => {
            dictGroupData.push({value: item.dictKey, label: item.dictValue});
        })
        this.dictGroupData = dictGroupData;
      }) 
      .catch(err => {
        this.$message.error(err.message);
      });
  }
};
</script>
