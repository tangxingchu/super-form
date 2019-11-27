<template>
    <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick">
    </el-tree>
</template>

<script>
  export default {
    props: {
        fieldId: null
    },
    data() {
      return {
        data: [{
          label: '文本',
          children: [{
            label: '普通文本',
            type: 'input',
            subType: 'text',
          },{
            label: '密码',
            type: 'input',
            subType: 'password',
          },{
            label: '文本域',
            type: 'input',
            subType: 'textarea',
          }]
        }, {
          label: '数字',
          type: 'number',
        }, {
          label: '开关',
          type: 'switch',
        }, {
          label: '单选框',
          type: 'radio',
        }, {
          label: '多选框',
          type: 'checkbox',
        }, {
          label: '下拉框',
          type: 'select',
        }, {
          label: '日期框',
          type: 'date',
        }, {
          label: '级联选择',
          type: 'cascader',
        }, {
          label: '富文本',
          type: 'richtext',
        }, {
          label: '按钮',
          type: 'button',
        }, {
          label: '弹窗',
          type: 'dialogSelect',
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          type: 'input',
          subType: 'subType',
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.label, this.fieldId);
        this.$emit('sendFormItem', data, this.fieldId);
      }
    }
  };
</script>