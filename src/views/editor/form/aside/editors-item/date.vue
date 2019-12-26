<template lang="pug">
  div
    el-form(v-on="$listeners" v-bind="$attrs")
      el-form-item(label="标签名")
        el-input(v-model="formItem.label")
      el-form-item(label="字段名")
        el-input(v-model="formItem.name")
      el-form-item(label="占位文本")
        el-input(v-model="formItem.placeholder")
      //-el-form-item(label="格式")
        el-input(v-model="formItem.valueFormat")
      el-form-item(label="默认值")
        el-date-picker(
          :type="formItem.subtype"
          :value-format="formItem.valueFormat"
          :format="formItem.viewFormat||formItem.valueFormat"
          placeholder="选择默认值"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          v-model="formItem.value")
      el-form-item(label="禁用")
        el-checkbox(v-model="formItem.disabled")
      el-form-item(label="日期格式")
        el-radio-group(v-model="formItem.valueFormat")
          el-radio-button(label="yyyy" value="yyyy")
          el-radio-button(label="yyyy-MM" value="yyyy-MM")
          el-radio-button(label="yyyy-MM-dd" value="yyyy-MM-dd")
          el-radio-button(label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss")
        </el-radio-group>
      el-form-item(label="栅格列数")
        el-input-number(v-model="formItem.span" controls-position="right" :min="1" :max="24")

    editor-rules(:item-rules="formItem.rules" @update:item-rules="n => formItem.rules = n" :item-type="formItem.type" types="required")

    pre {{formItem}}
</template>

<script>
import EditorRules from '../editor-rules';

export default {
  components: { EditorRules },
  props: {
    formItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
