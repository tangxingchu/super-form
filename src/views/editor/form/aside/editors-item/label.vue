<template lang="pug">
  div
    el-form(v-on="$listeners" v-bind="$attrs")
      el-form-item(label="标签名")
        el-input(v-model="formItem.label")
      el-form-item(label="字体大小")
        el-input-number(v-model="formItem.fontSize" controls-position="right" :min="1" :max="240")
      el-form-item(label="字体颜色")
        el-color-picker(v-model="formItem.fontColor")
      el-form-item(label="对齐方式")
        el-radio-group(v-model="formItem.align")
          el-radio-button(label="left") 左对齐
          el-radio-button(label="center") 居中对齐
          el-radio-button(label="right") 右对齐
      el-form-item(label="栅格列数")
        el-input-number(v-model="formItem.span" controls-position="right" :min="1" :max="24")
    pre {{formItem}}
</template>

<script>
export default {
  props: {
    formItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
