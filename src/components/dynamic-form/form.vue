<template>
  <el-form
    :model="value"
    v-bind="formConfig"
    class="dynamic-form"
  >
    <el-row>
      <dynamic-form-item
        v-for="item in formConfig.formItemList"
        :key="item.key"
        :item="item"
        v-bind="item"
        :value="value[item.name]"
        :style="{'min-width':columnMinWidth}"
        @input="handleInput($event, item.name)"
      ></dynamic-form-item>
    </el-row>
    <slot></slot>

  </el-form>
</template>

<script>
export default {
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    columnMinWidth: {
      type: String,
    },
  },
  mounted() {
    this.setDefaultValue();
  },
  methods: {
    handleInput(val, name) {
      // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', { ...this.value, [name]: val });
    },
    setDefaultValue() {
      const formData = { ...this.value };
      // 设置默认值
      this.formConfig.formItemList.forEach(item => {
        const { name, value } = item;
        if (formData[name] === undefined || formData[name] === null) {
          formData[name] = value;
        }
      });
      console.log(formData)
      this.$emit('input', { ...formData });
    },
  },
};
</script>

<style lang="less">
// .dynamic-form.el-form--inline {

//   // .block {
//   //   padding-right: 10%;
//   // }

//   .el-form-item {
//     display: inline-flex;
//     // margin-right: 0;
//     // padding-left: 10px;

//     .el-form-item__content {
//       flex: 1;
//       display: inline-flex;
//       align-items: center;

//       .el-slider {
//         width: 100%
//       }
//     }

//     .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select, .el-cascader {
//       width: 100%;
//     }
//   }
// }
</style>
