<template lang="pug">
  div
    el-form(v-on="$listeners" v-bind="$attrs")
      el-form-item(label="标签名")
        el-input(v-model="formItem.label")
      el-form-item(label="占位文本")
        el-input(v-model="formItem.placeholder")
      el-form-item(label="字段名")
        el-input(v-model="formItem.name")
      el-form-item(label="默认值")
        el-input(v-model="formItem.value" :type="formItem.subtype")
      el-form-item(label="禁用")
        el-switch(v-model="formItem.disabled")
      el-form-item(label="栅格列数")
        el-input-number(v-model="formItem.span" controls-position="right" :min="1" :max="24")

    //- wtf?
    //- editor-rules(:item-rules.sync="formItem.rules" :item-type="formItem.type")
    <!-- editor-rules(:item-rules="formItem.rules" @update:item-rules="n => formItem.rules = n" :item-type="formItem.type" types="required,length,regexp,sql") -->

    pre {{formItem}}
</template>

<script>
// todo maxlength?
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
